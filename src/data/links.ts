export type Link = {
  label: string;
  href: string;
  note: string;
  icon: 'github' | 'link' | 'mail';
};

export const links: Link[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/bsquidwrd',
    note: '@bsquidwrd',
    icon: 'github',
  },
  {
    label: 'Everywhere else',
    href: 'https://bsquidwrd.link/',
    note: 'bsquidwrd.link',
    icon: 'link',
  },
];
