import { Redis } from '@upstash/redis';

async function resetViews() {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const keys = await redis.keys('views:*');
  if (keys.length > 0) {
    await redis.del(...keys);
    console.log(`Deleted ${keys.length} view keys:`, keys);
  } else {
    console.log('No view keys found.');
  }
}

resetViews().catch(console.error);
