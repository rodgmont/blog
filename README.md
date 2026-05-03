# blog

This is the blog that powers franrodgmont.com, built on [Next.js](https://nextjs.org/) and deployed to the cloud via [Vercel](https://vercel.com).

```
franrodgmont.com
```

### Development
```bash
npm install
npm run dev
```

### Deployment

This project is continuously deployed to production every time a commit is pushed to the `main` branch.

```bash
git push origin main
```

### Pure components
Every stateless pure component is found under `src/components/`. 
Specifically, components that style the markdown and post interfaces are isolated under `src/components/blog/` and `src/components/mdx/`. These make up the style guide of the application.

### Blog posts
Every blog post is a markdown file hosted under `content/posts/`.

Thanks to the **Next.js App Router**, **React Server Components (RSC)**, and **MDX**, each post is compiled and statically generated at build time via `src/app/[locale]/blog/[slug]/page.js`.

This architecture elegantly replicates per-post isolation:
- By default, posts are rendered on the server, sending **zero JavaScript** to the client.
- You can load arbitrary modules or custom interactive components directly inside an `.mdx` file.
- Next.js automatically applies code splitting. This means the bloat of a highly interactive single post doesn't "rub off on" the rest of the site.

An index of all posts is generated dynamically at build time by reading the file system directly, avoiding the need to manually maintain a JSON file.
