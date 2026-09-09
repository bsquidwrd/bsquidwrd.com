# bsquidwrd.com

Source for [bsquidwrd.com](https://bsquidwrd.com), a personal portfolio and about site.

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

`public/CNAME` holds `bsquidwrd.com`, so it lands at the root of every build. DNS needs to point at GitHub:

| Record | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `bsquidwrd.github.io` |

Once the records resolve, enable "Enforce HTTPS" in the repository's Pages settings. The certificate takes a few minutes to issue.
