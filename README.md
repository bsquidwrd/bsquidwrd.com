# bsquidwrd.dev

Source for [bsquidwrd.dev](https://bsquidwrd.dev), a personal portfolio and about site.

Built with [Astro](https://astro.build), no UI framework and no client-side JavaScript. Hosted on GitHub Pages.

## Local development

Node comes from `.tool-versions`, so `asdf install` picks up the right version. Both workflows read the same file, so local and CI cannot drift.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the built output
npm run check    # type-check .astro and .ts files

npm run refresh:projects  # pull the project list from the GitHub API
```

## Layout

| Path | What lives there |
| --- | --- |
| `src/pages/` | One file per route: `index.astro`, `projects.astro`, `404.astro` |
| `src/layouts/BaseLayout.astro` | Document shell, head tags, header, footer |
| `src/components/` | `SquidMark` (logo) and `Icon` (link glyphs) |
| `src/data/projects.ts` | Featured picks and description overrides, merged with the generated data |
| `src/data/repos.generated.json` | Generated. Written by `scripts/refresh-projects.mjs`, do not hand-edit |
| `src/data/links.ts` | The "Elsewhere" links |
| `src/styles/global.css` | Whole stylesheet, custom properties, light and dark themes |
| `public/` | Copied verbatim to the site root, including `CNAME` |
| `scripts/refresh-projects.mjs` | Regenerates the project list from the GitHub API |
| `.tool-versions` | Node version, read by asdf locally and by both workflows in CI |

## Projects

The project list is generated, not hand-maintained. `scripts/refresh-projects.mjs` calls the GitHub API and writes `src/data/repos.generated.json`; `src/data/projects.ts` merges that with the two things a machine should not decide.

A repo earns a spot if it is public, not a fork, not archived, not on the script's `EXCLUDE` list, and has been pushed within the last year. The exclusion list holds repos that exist but are not portfolio projects: this site, the profile README, the user Pages repo, and the LiveBot docs.

Two things stay hand-edited, both in `src/data/projects.ts`:

- **`featuredNames`** picks the three shown on the homepage, in the order listed. Anything named here is also exempt from the age rule, so a featured project cannot quietly age off the site. The script fails if a featured name has no matching repo, rather than silently dropping it.
- **`descriptionOverrides`** replaces a repo's GitHub description for the site. Everything without an entry uses whatever the repo's description says, so the usual way to change a blurb is to change it on GitHub.

`.github/workflows/refresh-projects.yml` runs the script at 09:00 UTC on the first of each month, commits the result if anything changed, and calls the deploy workflow. Run it by hand from the Actions tab, or locally with `npm run refresh:projects`.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds with `withastro/action` and publishes with `actions/deploy-pages`. No manual step.

The repository must be public for GitHub Pages to serve it on a free account, and Pages must be set to build from GitHub Actions rather than a branch.

Both workflows end by running `.github/actions/prune-runs`, which keeps the five most recent runs of each workflow and deletes older completed ones. Runs still in progress count toward the five, so a workflow never deletes itself.

The refresh workflow calls the deploy workflow directly rather than relying on its own push to trigger it. GitHub does not raise workflow events for pushes made with `GITHUB_TOKEN`, so a push from Actions would otherwise commit the change and never deploy it.

## Custom domain

`public/CNAME` holds `bsquidwrd.dev`, so it lands at the root of every build. Both the apex and `www` are ALIAS records pointing at `bsquidwrd.github.io`.

| Record | Name | Value |
| --- | --- | --- |
| ALIAS | `@` | `bsquidwrd.github.io` |
| ALIAS | `www` | `bsquidwrd.github.io` |

If you ever move to a provider without ALIAS support at the apex, the fallback is four A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, with `www` as a plain CNAME.
