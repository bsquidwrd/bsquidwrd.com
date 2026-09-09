#!/usr/bin/env node
// Regenerates src/data/repos.generated.json from the GitHub API.
//
// A repo earns a spot if it is public, not a fork, not archived, not on the
// exclusion list below, and has been pushed within the last year. Anything named
// in featuredNames (src/data/projects.ts) is kept regardless of age, since the
// homepage picks are editorial.
//
// Descriptions come from GitHub. To override one, add it to descriptionOverrides
// in src/data/projects.ts; this script never touches that file.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const USER = 'bsquidwrd';
const MAX_AGE_DAYS = 365;

// Repos that are not portfolio projects: this site, the profile README, the
// user Pages repo, and the companion docs for a project already listed.
const EXCLUDE = new Set([
  'bsquidwrd.dev',
  'bsquidwrd',
  'bsquidwrd.github.io',
  'LiveBot-Docs',
]);

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const outputPath = join(root, 'src/data/repos.generated.json');
const projectsPath = join(root, 'src/data/projects.ts');

async function fetchAllRepos() {
  const headers = {
    accept: 'application/vnd.github+json',
    'x-github-api-version': '2022-11-28',
    'user-agent': `${USER}-portfolio-refresh`,
  };
  if (process.env.GITHUB_TOKEN) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const repos = [];
  for (let page = 1; ; page += 1) {
    const url = `https://api.github.com/users/${USER}/repos?per_page=100&type=owner&sort=pushed&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`GitHub API ${response.status} ${response.statusText} for ${url}`);
    }
    const batch = await response.json();
    repos.push(...batch);
    if (batch.length < 100) return repos;
  }
}

// Read the featured names straight out of projects.ts so the two files cannot
// disagree about which repos are exempt from the age rule.
async function readFeaturedNames() {
  const source = await readFile(projectsPath, 'utf8');
  const match = source.match(/const featuredNames = \[([^\]]*)\]/s);
  if (!match) {
    throw new Error(`Could not find featuredNames in ${projectsPath}`);
  }
  return new Set([...match[1].matchAll(/'([^']+)'/g)].map((m) => m[1]));
}

function isRecent(repo, cutoff) {
  return new Date(repo.pushed_at) >= cutoff;
}

const [repos, featured] = await Promise.all([fetchAllRepos(), readFeaturedNames()]);

const cutoff = new Date(Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000);

const kept = repos
  .filter((repo) => {
    if (repo.private || repo.fork || repo.archived || repo.disabled) return false;
    if (EXCLUDE.has(repo.name)) return false;
    return featured.has(repo.name) || isRecent(repo, cutoff);
  })
  .map((repo) => ({
    name: repo.name,
    description: repo.description ?? '',
    url: repo.html_url,
    language: repo.language ?? undefined,
    stars: repo.stargazers_count || undefined,
    pushedAt: repo.pushed_at,
  }))
  // Most-starred first, then most recently pushed, so the ordering is stable
  // across runs rather than dependent on API response order.
  .sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0) || b.pushedAt.localeCompare(a.pushedAt));

const missing = [...featured].filter((name) => !kept.some((repo) => repo.name === name));
if (missing.length > 0) {
  throw new Error(
    `Featured ${missing.length > 1 ? 'projects are' : 'project is'} missing from the API results: ${missing.join(', ')}. ` +
      'Check the repo still exists, is public, and is not excluded.',
  );
}

const withoutDescription = kept.filter((repo) => repo.description === '');

await writeFile(outputPath, `${JSON.stringify(kept, null, 2)}\n`);

console.log(`Wrote ${kept.length} projects to src/data/repos.generated.json`);
for (const repo of kept) {
  const age = Math.floor((Date.now() - new Date(repo.pushedAt)) / 86400000);
  const flag = featured.has(repo.name) ? ' (featured)' : '';
  console.log(`  ${repo.name} - ${repo.stars ?? 0} stars, pushed ${age}d ago${flag}`);
}
if (withoutDescription.length > 0) {
  console.log(
    `\nNo GitHub description set: ${withoutDescription.map((r) => r.name).join(', ')}. ` +
      'Set one on the repo, or add a descriptionOverrides entry.',
  );
}
