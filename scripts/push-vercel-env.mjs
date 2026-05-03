#!/usr/bin/env node
/**
 * Sube variables de entorno a Vercel vía API REST (sin abrir el panel).
 *
 * Requisitos:
 * 1. Crea Redis en Upstash (consola) y copia REST URL + TOKEN.
 * 2. Crea un token en https://vercel.com/account/tokens
 * 3. Copia env.vercel.push.example -> .env.vercel.push y rellena valores.
 * 4. npm run vercel:env-push
 *
 * Opcional: VERCEL_TEAM_ID si el proyecto está bajo un team (Settings del team).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const META = new Set(['VERCEL_TOKEN', 'VERCEL_PROJECT_ID', 'VERCEL_TEAM_ID']);
const DEFAULT_FILE = path.join(ROOT, '.env.vercel.push');
const TARGETS = (process.env.VERCEL_ENV_TARGETS || 'production')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

function parseEnvFile(content) {
  const out = {};
  for (const line of content.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function inferType(key) {
  if (key.startsWith('NEXT_PUBLIC_')) return 'plain';
  if (key.includes('TOKEN') || key.includes('SECRET') || key.includes('PASSWORD')) return 'encrypted';
  return 'encrypted';
}

function teamQs(teamId) {
  return teamId ? `?teamId=${encodeURIComponent(teamId)}` : '';
}

async function vercelFetch(token, pathname, { method = 'GET', body, teamId } = {}) {
  const sep = pathname.includes('?') ? '&' : '?';
  const url =
    teamId && !pathname.includes('teamId=')
      ? `${pathname}${sep}teamId=${encodeURIComponent(teamId)}`
      : pathname;
  const res = await fetch(`https://api.vercel.com${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body != null ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { _raw: text };
  }
  if (!res.ok) {
    const err = new Error(`Vercel API ${res.status}: ${text.slice(0, 500)}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

async function listProjectEnvs(token, projectId, teamId) {
  const path = `/v9/projects/${encodeURIComponent(projectId)}/env${teamQs(teamId)}`;
  const data = await vercelFetch(token, path);
  return Array.isArray(data.envs) ? data.envs : [];
}

function pickEnvEntry(entries, key, targets) {
  const matchExact = entries.find((e) => {
    if (e.key !== key) return false;
    const t = e.target || [];
    return targets.every((x) => t.includes(x));
  });
  if (matchExact) return matchExact;
  if (targets.includes('production')) {
    return entries.find((e) => e.key === key && (e.target || []).includes('production'));
  }
  return entries.find((e) => e.key === key);
}

async function createEnv(token, projectId, teamId, key, value, type, targets) {
  return vercelFetch(token, `/v10/projects/${encodeURIComponent(projectId)}/env`, {
    method: 'POST',
    body: {
      key,
      value,
      type,
      target: targets,
      comment: 'synced by scripts/push-vercel-env.mjs',
    },
    teamId,
  });
}

async function patchEnv(token, projectId, teamId, envId, key, value, type, targets) {
  return vercelFetch(
    token,
    `/v9/projects/${encodeURIComponent(projectId)}/env/${encodeURIComponent(envId)}`,
    {
      method: 'PATCH',
      body: {
        key,
        value,
        type,
        target: targets,
      },
      teamId,
    }
  );
}

async function main() {
  const fileArg = process.argv[2];
  const envPath = fileArg ? path.resolve(process.cwd(), fileArg) : DEFAULT_FILE;

  if (!fs.existsSync(envPath)) {
    console.error(`No existe el archivo: ${envPath}`);
    console.error('Copia env.vercel.push.example a .env.vercel.push y rellénalo.');
    process.exit(1);
  }

  const env = parseEnvFile(fs.readFileSync(envPath, 'utf8'));
  const token = env.VERCEL_TOKEN || process.env.VERCEL_TOKEN;
  const projectId = env.VERCEL_PROJECT_ID || process.env.VERCEL_PROJECT_ID;
  const teamId = env.VERCEL_TEAM_ID || process.env.VERCEL_TEAM_ID || '';

  if (!token || !projectId) {
    console.error('Faltan VERCEL_TOKEN o VERCEL_PROJECT_ID en el archivo o en el entorno.');
    process.exit(1);
  }

  const keysToSync = Object.keys(env).filter((k) => !META.has(k));
  if (keysToSync.length === 0) {
    console.error('No hay variables para subir (solo metadatos). Añade NEXT_PUBLIC_SITE_URL y Upstash.');
    process.exit(1);
  }

  console.log(`Proyecto: ${projectId}${teamId ? ` (team ${teamId})` : ''}`);
  console.log(`Entornos: ${TARGETS.join(', ')}`);
  console.log(`Claves a sincronizar: ${keysToSync.join(', ')}\n`);

  const existing = await listProjectEnvs(token, projectId, teamId || undefined);

  for (const key of keysToSync) {
    const value = env[key];
    const type = inferType(key);
    const entry = pickEnvEntry(existing, key, TARGETS);

    try {
      if (entry) {
        await patchEnv(token, projectId, teamId || undefined, entry.id, key, value, type, TARGETS);
        console.log(`OK (actualizado) ${key}`);
      } else {
        await createEnv(token, projectId, teamId || undefined, key, value, type, TARGETS);
        console.log(`OK (creado)     ${key}`);
      }
    } catch (e) {
      console.error(`ERROR ${key}:`, e.message || e);
      process.exitCode = 1;
    }
  }

  if (!process.exitCode) {
    console.log('\nListo. En Vercel haz un redeploy del último deployment para aplicar cambios.');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
