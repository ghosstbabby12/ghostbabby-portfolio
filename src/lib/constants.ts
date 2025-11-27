export const TECH_STACK = [
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Vercel',
  'React',
  'Node.js'
] as const

export const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/camila-bastidas-2574b4363/',
    ariaLabel: 'LinkedIn Profile'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/ghosstbabby12',
    ariaLabel: 'GitHub Profile'
  },
  {
    name: 'X',
    url: 'https://x.com/ghosstbabby',
    ariaLabel: 'X (Twitter) Profile'
  },
  {
    name: 'Vercel',
    url: 'https://vercel.com/camila-bastidas-projects/',
    ariaLabel: 'Vercel Profile'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/ghosstbabby/',
    ariaLabel: 'Instagram Profile'
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/user/31k4nhz2uwndcdpafnakc64tt4ti?si=26316620a4f24f1c',
    ariaLabel: 'Spotify Profile'
  }
] as const

export const PROFILE_IMAGE = {
  hero: '/images/me15.jpeg',
  about: '/images/me555.jpeg',
  avatar: 'https://media.tenor.com/cl2Xs1LDULsAAAAi/balls.gif'
} as const

export const NAV_ITEMS = [
  { href: '#home', labelKey: 'nav.home' },
  { href: '#about', labelKey: 'nav.about' },
  { href: '#projects', labelKey: 'nav.projects' },
  { href: '#experience', labelKey: 'nav.experience' },
  { href: '#mygame', labelKey: 'nav.mygame' },
  { href: '#galeria', labelKey: 'nav.gallery' },
  { href: '#testimonials', labelKey: 'nav.testimonials' },
  { href: '#contact', labelKey: 'nav.contact' }
] as const
