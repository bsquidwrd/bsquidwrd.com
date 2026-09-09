export type Project = {
  name: string;
  description: string;
  url: string;
  language?: string;
  stars?: number;
};

// What earns a spot here: public, not archived, and pushed within the last year.
// The featured three are exempt from the age rule, since the homepage picks are
// editorial rather than a reflection of what was touched most recently.
export const projects: Project[] = [
  {
    name: 'LiveBot',
    description:
      'Discord bot that announces to your server the moment you go live on Twitch. The project I have kept coming back to the longest.',
    url: 'https://github.com/bsquidwrd/LiveBot',
    language: 'C#',
    stars: 11,
  },
  {
    name: 'discord-user-reminder',
    description:
      'Discord reminder app that works anywhere Discord does: DMs, servers, threads, voice. Installs per-user or per-server, shards automatically, and ships as a container.',
    url: 'https://github.com/bsquidwrd/discord-user-reminder',
    language: 'TypeScript',
  },
  {
    name: 'TwitchChannelPointCalculator',
    description:
      'Works out how long a channel points target actually takes, given your hours per day, sub tier, streaks, raids, bits, and gifted subs.',
    url: 'https://github.com/bsquidwrd/TwitchChannelPointCalculator',
    language: 'TypeScript',
  },
  {
    name: 'streamerbot-assets',
    description: 'Resources and overlays used with Streamer.bot.',
    url: 'https://github.com/bsquidwrd/streamerbot-assets',
    language: 'JavaScript',
  },
];

// The homepage shows these three, in this order. Editorial, so it is a list rather
// than a flag on each project.
const featuredNames = ['LiveBot', 'discord-user-reminder', 'TwitchChannelPointCalculator'];

export const featuredProjects: Project[] = featuredNames.map((name) => {
  const project = projects.find((p) => p.name === name);
  if (!project) {
    throw new Error(`Featured project "${name}" is not in the projects list.`);
  }
  return project;
});
