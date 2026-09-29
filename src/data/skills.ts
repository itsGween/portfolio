export interface SkillCard {
  id: string
  title: { fr: string; en: string }
  icon: string
  items: string[]
}

export const SKILLS: SkillCard[] = [
  {
    id: 'languages',
    title: { fr: 'Langages', en: 'Languages' },
    icon: 'code',
    items: ['TypeScript', 'JavaScript', 'Java', 'C#', 'Kotlin', 'Python', 'SQL', 'CQL'],
  },
  {
    id: 'frontend',
    title: { fr: 'Frontend', en: 'Frontend' },
    icon: 'monitor',
    items: ['React', 'Jetpack Compose', 'Tailwind CSS', 'Framer Motion', 'Vite', 'GC Design System'],
  },
  {
    id: 'backend',
    title: { fr: 'Backend & API', en: 'Backend & API' },
    icon: 'server',
    items: ['Node.js', 'NestJS', 'FastAPI', 'Spring Boot', '.NET', 'Prisma', 'REST', 'WebSocket', 'Postman'],
  },
  {
    id: 'databases',
    title: { fr: 'Bases de données', en: 'Databases' },
    icon: 'database',
    items: ['PostgreSQL', 'Cassandra', 'NoSQL', 'DDL'],
  },
  {
    id: 'cloud',
    title: { fr: 'Cloud & Infra', en: 'Cloud & Infra' },
    icon: 'cloud',
    items: ['Azure', 'Azure CLI', 'Key Vault', 'Railway', 'Cloudflare', 'Cloudinary'],
  },
  {
    id: 'devops',
    title: { fr: 'DevOps & CI/CD', en: 'DevOps & CI/CD' },
    icon: 'git',
    items: ['Docker', 'Jenkins', 'Git', 'GitHub Actions', 'CI/CD', 'PowerShell', 'Linux', 'Tests', 'Playwright', 'axe-core', 'OWASP'],
  },
  {
    id: 'power-platform',
    title: { fr: 'Power Platform', en: 'Power Platform' },
    icon: 'layers',
    items: ['Power Apps (code apps)', 'Microsoft Dataverse', 'Power Platform CLI'],
  },
]
