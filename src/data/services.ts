export interface Service {
  id: string
  icon: string
  title: { fr: string; en: string }
  desc: { fr: string; en: string }
}

export const SERVICES: Service[] = [
  {
    id: 'frontend',
    icon: 'monitor',
    title: { fr: 'Développement Frontend', en: 'Frontend Development' },
    desc: {
      fr: 'Interfaces React / TypeScript réactives, accessibles et performantes — animations soignées avec Framer Motion.',
      en: 'Responsive, accessible, and performant React / TypeScript interfaces — polished animations with Framer Motion.',
    },
  },
  {
    id: 'backend',
    icon: 'server',
    title: { fr: 'Backend & API', en: 'Backend & API' },
    desc: {
      fr: 'APIs REST et WebSocket robustes avec Node.js, NestJS ou FastAPI. Architecture microservices et intégration.',
      en: 'Robust REST and WebSocket APIs with Node.js, NestJS, or FastAPI. Microservices architecture and integration.',
    },
  },
  {
    id: 'fullstack',
    icon: 'layers',
    title: { fr: 'Applications Full-Stack', en: 'Full-Stack Applications' },
    desc: {
      fr: "De la conception à la mise en production : je porte votre produit de l'idée à un déploiement fiable.",
      en: 'From design to production: I carry your product from idea to reliable deployment.',
    },
  },
  {
    id: 'cloud',
    icon: 'cloud',
    title: { fr: 'Cloud & DevOps', en: 'Cloud & DevOps' },
    desc: {
      fr: 'Conteneurisation Docker, pipelines CI/CD, déploiement sur Azure / Railway et bonnes pratiques de sécurité.',
      en: 'Docker containerization, CI/CD pipelines, deployment on Azure / Railway, and security best practices.',
    },
  },
]
