export interface Project {
  id: string
  no: string
  kicker: { fr: string; en: string }
  name: string
  desc: { fr: string; en: string }
  stack: string[]
  featured: boolean
  github?: string
  demo?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'genixi',
    no: '01',
    kicker: { fr: 'Recherche appliquée · GénieLab', en: 'Applied research · GénieLab' },
    name: 'GENIXI',
    desc: {
      fr: "Application web de navigation vocale assistée par IA. Composants frontend interactifs, consommation d'APIs REST, géolocalisation, synthèse vocale, tests multiplateformes et déploiement sécurisé.",
      en: 'AI-assisted vocal navigation web app. Interactive frontend components, REST API consumption, geolocation, speech synthesis, cross-platform testing, and secure deployment.',
    },
    stack: ['React', 'TypeScript', 'Vite', 'Web Speech API', 'Leaflet', 'FastAPI', 'Deepgram'],
    featured: true,
  },
  {
    id: 'smartcart',
    no: '02',
    kicker: { fr: 'Capstone · Android', en: 'Capstone · Android' },
    name: 'SmartCart',
    desc: {
      fr: "Application Android de panier intelligent connectée en temps réel via WebSocket. 22 endpoints API, synthèse vocale, gestion de listes d'achats.",
      en: 'Smart shopping cart Android app with real-time WebSocket sync. 22 API endpoints, voice synthesis, and shopping list management.',
    },
    stack: ['Kotlin', 'Jetpack Compose', 'NestJS', 'WebSocket', 'Railway', 'Cloudinary'],
    featured: false,
  },
  {
    id: 'azure-infra',
    no: '03',
    kicker: { fr: 'Projet académique · Cloud', en: 'Academic project · Cloud' },
    name: 'Infra Azure',
    desc: {
      fr: 'Déploiement de ressources Azure via CLI : VNets, VMs, Storage, Key Vault, VNet Peering. Configuration réseau, sécurité et automatisation.',
      en: 'Azure resource deployment via CLI: VNets, VMs, Storage, Key Vault, VNet Peering. Network configuration, security, and automation.',
    },
    stack: ['Azure', 'PowerShell', 'CLI', 'Key Vault'],
    featured: false,
  },
  {
    id: 'cassandra',
    no: '04',
    kicker: { fr: 'Projet académique · Data', en: 'Academic project · Data' },
    name: 'Cluster Cassandra',
    desc: {
      fr: 'Cluster Docker à 3 nœuds (RF=3), 12 tables CQL. Modélisation de données NoSQL pour un système de réservation.',
      en: '3-node Docker cluster (RF=3), 12 CQL tables. NoSQL data modeling for a reservation system.',
    },
    stack: ['Cassandra', 'Docker', 'CQL', 'NoSQL'],
    featured: false,
  },
]
