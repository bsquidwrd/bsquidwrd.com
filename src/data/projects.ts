export type Project = {
  name: string;
  description: string;
  url: string;
  language?: string;
  stars?: number;
};

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
    name: 'JSS-API',
    description:
      'Scripts for the Jamf Software Server API, put up so other Mac admins can use them.',
    url: 'https://github.com/bsquidwrd/JSS-API',
    language: 'Python',
    stars: 8,
  },
  {
    name: 'Example-TwitchIO-Bot',
    description:
      'An example bot showing what you can do with TwitchIO, written while I was learning the library.',
    url: 'https://github.com/bsquidwrd/Example-TwitchIO-Bot',
    language: 'Python',
    stars: 6,
  },
  {
    name: 'Get-WiFi-Addresses',
    description: 'Utility for pulling the WiFi MAC addresses of connected iOS devices.',
    url: 'https://github.com/bsquidwrd/Get-WiFi-Addresses',
    language: 'Objective-C',
    stars: 6,
  },
  {
    name: 'ubiquitous-adventure',
    description:
      'A learning project spanning Python, JavaScript, CSS, HTML, and talking to third-party APIs.',
    url: 'https://github.com/bsquidwrd/ubiquitous-adventure',
    language: 'Python',
    stars: 4,
  },
  {
    name: 'twitch-misc',
    description: 'Where I try out random things against the Twitch API.',
    url: 'https://github.com/bsquidwrd/twitch-misc',
    language: 'Python',
    stars: 2,
  },
  {
    name: 'django-keybase-verification',
    description: 'Drop-in Django app for verifying domain ownership with Keybase.io.',
    url: 'https://github.com/bsquidwrd/django-keybase-verification',
    language: 'Python',
    stars: 1,
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
  {
    name: 'oneroster-browser',
    description: 'Next.js app for browsing OneRoster API data.',
    url: 'https://github.com/bsquidwrd/oneroster-browser',
    language: 'TypeScript',
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
