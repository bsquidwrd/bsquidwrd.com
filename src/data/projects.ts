import generated from './repos.generated.json';

export type Project = {
  name: string;
  description: string;
  url: string;
  language?: string;
  stars?: number;
  pushedAt: string;
};

// The homepage shows these three, in this order. Editorial, so it is a list rather
// than a flag on each project. Anything named here is also exempt from the age rule
// in scripts/refresh-projects.mjs, so a featured project cannot age off the site.
const featuredNames = ['LiveBot', 'discord-user-reminder', 'TwitchChannelPointCalculator'];

// Descriptions default to the repo's own GitHub description. Add an entry here to
// override one, for a project whose repo description does not say what you want the
// site to say. Everything else in the list is generated.
const descriptionOverrides: Record<string, string> = {
  LiveBot:
    'Discord bot that announces to your server the moment you go live on Twitch. The project I have kept coming back to the longest.',
  TwitchChannelPointCalculator:
    'Works out how long a channel points target actually takes, given your hours per day, sub tier, streaks, raids, bits, and gifted subs.',
};

export const projects: Project[] = generated.map((repo) => ({
  ...repo,
  description: descriptionOverrides[repo.name] ?? repo.description,
}));

export const featuredProjects: Project[] = featuredNames.map((name) => {
  const project = projects.find((p) => p.name === name);
  if (!project) {
    throw new Error(
      `Featured project "${name}" is not in the generated list. Run npm run refresh:projects.`,
    );
  }
  return project;
});
