export interface TimelineItem {
  id: string
  when: string
  role: { fr: string; en: string }
  org: string
  desc: { fr: string; en: string }
  type: 'work' | 'education'
}

export const TIMELINE: TimelineItem[] = [
  {
    id: 'genixi',
    when: '02/2026 – 05/2026',
    role: {
      fr: 'Développeuse Web Frontend — Recherche appliquée',
      en: 'Frontend Web Developer — Applied research',
    },
    org: 'Collège La Cité / GénieLab (InnovaCité) · Ottawa',
    desc: {
      fr: "Développement de GENIXI (navigation vocale par IA) en React, TypeScript et Vite au sein d'une équipe multidisciplinaire Agile. Intégration d'APIs REST, débogage multiplateforme et documentation technique.",
      en: 'Developed GENIXI (AI voice navigation) in React, TypeScript, and Vite within a multidisciplinary Agile team. REST API integration, cross-platform debugging, and technical documentation.',
    },
    type: 'work',
  },
  {
    id: 'receptionniste',
    when: '09/2024 – présent',
    role: {
      fr: 'Réceptionniste / Service à la clientèle',
      en: 'Receptionist / Customer Service',
    },
    org: 'Résidence La Cité · Ottawa',
    desc: {
      fr: 'Service bilingue à haut volume, gestion des priorités et utilisation quotidienne de Microsoft 365.',
      en: 'High-volume bilingual service, priority management, and daily use of Microsoft 365.',
    },
    type: 'work',
  },
  {
    id: 'diploma',
    when: 'Juin 2026',
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
