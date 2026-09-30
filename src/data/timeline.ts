export interface TimelineItem {
  id: string
  when: string
  role: { fr: string; en: string }
  org: string
  desc: { fr: string; en: string }
  tasks?: { fr: string[]; en: string[] }
  type: 'work' | 'education'
}

export const TIMELINE: TimelineItem[] = [
  {
    id: 'genixi',
    when: '02/2026 – 05/2026',
    role: {
      fr: 'Développeuse Web Full Stack — Recherche appliquée',
      en: 'Full Stack Web Developer — Applied research',
    },
    org: 'Collège La Cité / GénieLab (InnovaCité) · Ottawa',
    desc: {
      fr: "Développement de GENIXI (navigation vocale par IA) en React, TypeScript et Vite au sein d'une équipe multidisciplinaire Agile. Intégration d'APIs REST, débogage multiplateforme et documentation technique.",
      en: 'Developed GENIXI (AI voice navigation) in React, TypeScript, and Vite within a multidisciplinary Agile team. REST API integration, cross-platform debugging, and technical documentation.',
    },
    tasks: {
      fr: [
        "Développement d'une application Web de navigation avec visualisation géospatiale (Leaflet)",
        'Développement avec React, TypeScript, Vite et Tailwind CSS',
        'Création de composants frontend interactifs et réutilisables',
        "Intégration et consommation d'API REST (FastAPI, Deepgram)",
        "Débogage d'intégrations API et correction de problèmes multiplateformes (iOS)",
        "Configuration d'un environnement de déploiement sécurisé (Cloudflare Tunnel, HTTPS)",
        'Rédaction de documentation technique et transfert de connaissances',
        "Travail au sein d'une équipe Agile multidisciplinaire",
      ],
      en: [
        'Built a geospatial navigation web application (Leaflet)',
        'Developed with React, TypeScript, Vite, and Tailwind CSS',
        'Built interactive, reusable frontend components',
        'Integrated and consumed REST APIs (FastAPI, Deepgram)',
        'Debugged API integrations and fixed cross-platform (iOS) issues',
        'Configured a secure deployment environment (Cloudflare Tunnel, HTTPS)',
        'Wrote technical documentation and led knowledge transfer',
        'Worked within a multidisciplinary Agile team',
      ],
    },
    type: 'work',
  },
  {
    id: 'receptionniste',
    when: '09/2024 – 09/2026',
    role: {
      fr: 'Réceptionniste / Service à la clientèle',
      en: 'Receptionist / Customer Service',
    },
    org: 'Résidence La Cité · Ottawa',
    desc: {
      fr: 'Service bilingue à haut volume, gestion des priorités et utilisation quotidienne de Microsoft 365.',
      en: 'High-volume bilingual service, priority management, and daily use of Microsoft 365.',
    },
    tasks: {
      fr: [
        'Service à la clientèle bilingue',
        "Communication avec différents types d'utilisateurs",
        'Gestion simultanée de plusieurs demandes',
        'Résolution de problèmes',
        'Gestion des priorités',
        'Utilisation quotidienne de Microsoft 365',
      ],
      en: [
        'Bilingual customer service',
        'Communication with a wide range of users',
        'Managing multiple requests simultaneously',
        'Problem-solving',
        'Priority management',
        'Daily use of Microsoft 365',
      ],
    },
    type: 'work',
  },
  {
    id: 'diploma',
    when: '06/2026',
    role: {
      fr: 'Diplôme avancé — Technologie du génie informatique',
      en: 'Advanced Diploma — Computer Engineering Technology',
    },
    org: 'La Cité · Ottawa — Grande Distinction, GPA 4.007',
    desc: {
      fr: 'Développement web & mobile, architecture logicielle, bases de données, réseautique, cybersécurité, infonuagique Azure et méthodologies Agile.',
      en: 'Web & mobile development, software architecture, databases, networking, cybersecurity, Azure cloud, and Agile methodologies.',
    },
    type: 'education',
  },
]
