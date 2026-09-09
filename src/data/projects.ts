export type Project = {
  name: string;
  description: string;
  url: string;
  language?: string;
  stars?: number;
  featured?: boolean;
};

// Descriptions marked TODO were pulled from repos that have no GitHub description set.
// Either fill them in here or add a description on the repo and re-sync.
export const projects: Project[] = [
  {
    name: 'LiveBot',
    description: 'Discord bot that announces to your server the moment you go live on Twitch. The project I have maintained the longest.',
    url: 'https://github.com/bsquidwrd/LiveBot',
    language: 'C#',
    stars: 11,
    featured: true,
  },
  {
    name: 'JSS-API',
    description: 'A collection of scripts for driving the Jamf Software Server API, shared for other Mac admins to crib from.',
    url: 'https://github.com/bsquidwrd/JSS-API',
    language: 'Python',
    stars: 8,
    featured: true,
  },
  {
    name: 'Example-TwitchIO-Bot',
    description: 'A worked example of what is possible with TwitchIO, written while poking at the edges of the library.',
    url: 'https://github.com/bsquidwrd/Example-TwitchIO-Bot',
    language: 'Python',
    stars: 6,
    featured: true,
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
    description: 'A learning project spanning Python, JavaScript, CSS, HTML, and talking to third-party APIs.',
    url: 'https://github.com/bsquidwrd/ubiquitous-adventure',
    language: 'Python',
    stars: 4,
  },
  {
    name: 'twitch-misc',
    description: 'A scratchpad for random Twitch API experiments.',
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
    name: 'streamerbot-assets',
    description: 'Resources and overlays used with Streamer.bot.',
    url: 'https://github.com/bsquidwrd/streamerbot-assets',
    language: 'JavaScript',
  },
  {
    name: 'TwitchChannelPointCalculator',
    description: 'TODO: describe this one. TypeScript, Twitch channel points.',
    url: 'https://github.com/bsquidwrd/TwitchChannelPointCalculator',
    language: 'TypeScript',
  },
  {
    name: 'oneroster-browser',
    description: 'TODO: describe this one. TypeScript, OneRoster data.',
    url: 'https://github.com/bsquidwrd/oneroster-browser',
    language: 'TypeScript',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
