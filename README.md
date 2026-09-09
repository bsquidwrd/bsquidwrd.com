# bsquidwrd.dev

Source for [bsquidwrd.dev](https://bsquidwrd.dev), a personal portfolio and about site.

Built with [Astro](https://astro.build), no UI framework and no client-side JavaScript. Hosted on GitHub Pages.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the built output
npm run check    # type-check .astro and .ts files
```

## Layout

| Path | What lives there |
| --- | --- |
| `src/pages/` | One file per route: `index.astro`, `projects.astro`, `404.astro` |
| `src/layouts/BaseLayout.astro` | Document shell, head tags, header, footer |
| `src/components/` | `SquidMark` (logo) and `Icon` (link glyphs) |
| `src/data/projects.ts` | The project list rendered on both pages |
| `src/data/links.ts` | The "Elsewhere" links |
| `src/styles/global.css` | Whole stylesheet, custom properties, light and dark themes |
| `public/` | Copied verbatim to the site root, including `CNAME` |

To add or edit a project, edit `src/data/projects.ts`. The homepage shows the three named in `featuredNames` at the bottom of that file, in the order listed there.

A project earns a spot if it is public, not archived, and has been pushed within the last year. The featured three are exempt from the age rule, because the homepage picks are editorial rather than a reflection of what happened to be touched most recently.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds with `withastro/action` and publishes with `actions/deploy-pages`. No manual step.

The repository must be public for GitHub Pages to serve it on a free account, and Pages must be set to build from GitHub Actions rather than a branch.

## Custom domain

`public/CNAME` holds `bsquidwrd.dev`, so it lands at the root of every build. Both the apex and `www` are ALIAS records pointing at `bsquidwrd.github.io`.

| Record | Name | Value |
| --- | --- | --- |
| ALIAS | `@` | `bsquidwrd.github.io` |
| ALIAS | `www` | `bsquidwrd.github.io` |

If you ever move to a provider without ALIAS support at the apex, the fallback is four A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, with `www` as a plain CNAME.
