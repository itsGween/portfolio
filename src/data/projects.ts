export interface LocalizedText {
  fr: string
  en: string
}

export interface ProjectImage {
  src: string
  alt: LocalizedText
}

export interface ProjectDiagram {
  /** Chaîne unique, ou une version par langue quand le diagramme contient du texte. */
  src: string | LocalizedText
  alt: LocalizedText
}

export interface DocLink {
  label: LocalizedText
  url: string
}

export interface Project {
  id: string
  no: string
  kicker: LocalizedText
  name: string
  desc: LocalizedText
  longDesc?: LocalizedText
  stack: string[]
  featured: boolean
  github?: string
  demo?: string
  role?: LocalizedText
  year?: string
  license?: string
  status?: LocalizedText
  highlights?: LocalizedText
  features?: { fr: string[]; en: string[] }
  screenshots?: ProjectImage[]
  architectureDiagram?: ProjectDiagram
  docsLinks?: DocLink[]
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
  {
    id: 'securegate',
    no: '05',
    kicker: {
      fr: 'Projet personnel · Sécurité applicative',
      en: 'Personal project · Application security',
    },
    name: 'SecureGate',
    desc: {
      fr: "Service d'authentification et d'autorisation démontrant une sécurité pensée dès la conception : mots de passe hachés en Argon2id, MFA TOTP, RBAC granulaire, jetons JWT révocables et journal d'audit complet. L'application conteneurisée sert ensuite de cible à un test d'intrusion structuré (Nmap, Hydra, OWASP ZAP) — le pendant défensif d'un travail de pentest offensif.",
      en: 'Authentication and authorization service demonstrating security by design: Argon2id password hashing, TOTP MFA, granular RBAC, revocable JWTs and a full audit log. The containerized app doubles as the target of a structured penetration test (Nmap, Hydra, OWASP ZAP) — the defensive counterpart to offensive pentest work.',
    },
    stack: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'PostgreSQL',
      'React',
      'TypeScript',
      'Docker',
      'GC Design System',
    ],
    featured: false,
    github: 'https://github.com/itsGween/SecureGate',
    role: {
      fr: 'Conception et développement full-stack (backend sécurité, frontend, infra, documentation d’architecture)',
      en: 'Full-stack design and development (security backend, frontend, infra, architecture documentation)',
    },
    year: '2026',
    license: 'MIT',
    highlights: {
      fr: 'Sécurité by design, conformité aux normes numériques fédérales (GC Design System, bilinguisme réel FR/EN), décisions d’architecture documentées (ADR), démarche à la fois offensive et défensive (Nmap, Hydra, John the Ripper, OWASP ZAP).',
      en: 'Security by design, compliance with federal digital standards (GC Design System, real FR/EN bilingualism), documented architecture decisions (ADRs), a combined offensive and defensive approach (Nmap, Hydra, John the Ripper, OWASP ZAP).',
    },
    features: {
      fr: [
        'MFA TOTP : activation par QR code, codes de récupération à usage unique',
        'RBAC (ADMIN / AUDITEUR / UTILISATEUR) via @PreAuthorize',
        'JWT access court + refresh long révocable et haché en base',
        'Verrouillage de compte après échecs de connexion répétés',
        "Journal d'audit complet (qui / quoi / quand / IP), filtrable",
        'Tableau de bord admin : utilisateurs, rôles, visionneuse d’audit',
        'Interface entièrement bilingue FR/EN (GC Design System)',
      ],
      en: [
        'TOTP MFA: QR code activation, single-use recovery codes',
        'RBAC (ADMIN / AUDITOR / USER) via @PreAuthorize',
        'Short-lived access JWT + long-lived refresh, revocable and hashed at rest',
        'Account lockout after repeated failed login attempts',
        'Full audit log (who / what / when / IP), filterable',
        'Admin dashboard: user & role management, audit viewer',
        'Fully bilingual FR/EN interface (GC Design System)',
      ],
    },
    screenshots: [
      {
        src: '/assets/projects/securegate/dashboard.jpg',
        alt: { fr: 'Tableau de bord SecureGate', en: 'SecureGate dashboard' },
      },
      {
        src: '/assets/projects/securegate/mfa-setup.jpg',
        alt: {
          fr: "Activation de l'authentification à deux facteurs",
          en: 'Two-factor authentication setup',
        },
      },
      {
        src: '/assets/projects/securegate/admin-users.jpg',
        alt: { fr: 'Gestion des utilisateurs (admin)', en: 'User management (admin)' },
      },
      {
        src: '/assets/projects/securegate/admin-audit.jpg',
        alt: { fr: "Journal d'audit (admin)", en: 'Audit log (admin)' },
      },
    ],
    architectureDiagram: {
      src: '/assets/projects/securegate/architecture.svg',
      alt: {
        fr: 'Diagramme d’architecture SecureGate : frontend React, backend Spring Boot (sécurité, MFA, audit), PostgreSQL',
        en: 'SecureGate architecture diagram: React frontend, Spring Boot backend (security, MFA, audit), PostgreSQL',
      },
    },
    docsLinks: [
      {
        label: { fr: 'Rapport de test d’intrusion', en: 'Penetration test report' },
        url: 'https://github.com/itsGween/SecureGate/blob/main/docs/security-assessment.md',
      },
      {
        label: { fr: 'Spécification OpenAPI', en: 'OpenAPI specification' },
        url: 'https://github.com/itsGween/SecureGate/blob/main/docs/openapi.yaml',
      },
      {
        label: { fr: 'Décisions d’architecture (ADR)', en: 'Architecture decision records (ADR)' },
        url: 'https://github.com/itsGween/SecureGate/tree/main/docs/adr',
      },
      {
        label: { fr: 'Politique de sécurité', en: 'Security policy' },
        url: 'https://github.com/itsGween/SecureGate/blob/main/SECURITY.md',
      },
    ],
  },
  {
    id: 'auditeur-wcag',
    no: '06',
    kicker: {
      fr: 'Projet personnel · Accessibilité web',
      en: 'Personal project · Web accessibility',
    },
    name: "Auditeur d'accessibilité WCAG",
    desc: {
      fr: "Outil web qui scanne réellement une page (navigateur headless Playwright + moteur axe-core), catégorise chaque violation par critère WCAG et sévérité, conserve l'historique des scans avec tendance dans le temps, et génère une déclaration de conformité au format d'une vraie déclaration d'accessibilité gouvernementale. Export PDF et CSV.",
      en: 'A web tool that runs a real headless-browser scan (Playwright + axe-core), categorizes each violation by WCAG criterion and severity, keeps scan history with trend charts, and generates a government-format accessibility conformance statement. PDF and CSV export.',
    },
    stack: [
      'React',
      'TypeScript',
      'NestJS',
      'Prisma',
      'PostgreSQL',
      'Playwright',
      'axe-core',
      'Recharts',
      'GC Design System',
    ],
    featured: false,
    github: 'https://github.com/itsGween/Auditeur_accessibilit-_WCAG',
    role: {
      fr: 'Conception et développement full-stack',
      en: 'Full-stack design and development',
    },
    year: '2026',
    license: 'MIT',
    highlights: {
      fr: 'Maîtrise réelle de l’accessibilité (WCAG 2.1 AA, axe-core), des normes numériques du gouvernement du Canada (GC Design System), du bilinguisme de contenu réel (pas juste des libellés traduits, URL distincte par langue), et une conscience sécurité (protection SSRF).',
      en: 'Real command of accessibility (WCAG 2.1 AA, axe-core), Government of Canada digital standards (GC Design System), genuine content bilingualism (not just translated labels, distinct URL per language), and security awareness (SSRF protection).',
    },
    features: {
      fr: [
        'Scan réel via navigateur headless (Playwright), pas un simple fetch HTML',
        'Violations groupées par critère WCAG 2.1, impact, extrait HTML et sélecteur CSS',
        'Tableau de bord des scans avec score de conformité',
        'Historique par site + graphique de tendance (Recharts)',
        'Export PDF et CSV',
        'Déclaration de conformité au format gouvernemental',
        'Protection SSRF (URLs publiques http/https uniquement)',
        'Interface bilingue avec URL distincte par langue (/fr, /en)',
      ],
      en: [
        'Real scan via headless browser (Playwright), not a simple HTML fetch',
        'Violations grouped by WCAG 2.1 criterion, impact, HTML snippet and CSS selector',
        'Scan dashboard with conformance score',
        'Per-site history + trend chart (Recharts)',
        'PDF and CSV export',
        'Government-format conformance statement',
        'SSRF protection (public http/https URLs only)',
        'Bilingual interface with a distinct URL per language (/fr, /en)',
      ],
    },
    screenshots: [
      {
        src: '/assets/projects/auditeur-wcag/scan-results.png',
        alt: { fr: "Résultats d'un scan", en: 'Scan results' },
      },
      {
        src: '/assets/projects/auditeur-wcag/dashboard.png',
        alt: { fr: 'Tableau de bord des sites audités', en: 'Audited sites dashboard' },
      },
      {
        src: '/assets/projects/auditeur-wcag/site-history.png',
        alt: { fr: "Historique d'un site avec tendance", en: 'Site history with trend' },
      },
    ],
    architectureDiagram: {
      src: '/assets/projects/auditeur-wcag/architecture.svg',
      alt: {
        fr: "Diagramme d'architecture : frontend React, backend NestJS/Prisma, PostgreSQL, moteur de scan Playwright + axe-core",
        en: 'Architecture diagram: React frontend, NestJS/Prisma backend, PostgreSQL, Playwright + axe-core scan engine',
      },
    },
    docsLinks: [
      {
        label: { fr: 'Déclaration d’accessibilité du projet', en: 'Project accessibility statement' },
        url: 'https://github.com/itsGween/Auditeur_accessibilit-_WCAG/blob/main/ACCESSIBILITY_STATEMENT.md',
      },
      {
        label: { fr: 'Spécification OpenAPI', en: 'OpenAPI specification' },
        url: 'https://github.com/itsGween/Auditeur_accessibilit-_WCAG/blob/main/docs/openapi.yaml',
      },
      {
        label: { fr: 'Décisions d’architecture (ADR)', en: 'Architecture decision records (ADR)' },
        url: 'https://github.com/itsGween/Auditeur_accessibilit-_WCAG/tree/main/docs/adr',
      },
      {
        label: { fr: 'Politique de sécurité', en: 'Security policy' },
        url: 'https://github.com/itsGween/Auditeur_accessibilit-_WCAG/blob/main/SECURITY.md',
      },
    ],
  },
  {
    id: 'tracker-aiprp',
    no: '07',
    kicker: {
      fr: 'Projet personnel · Power Platform, secteur public fédéral',
      en: 'Personal project · Power Platform, federal public sector',
    },
    name: 'Tracker AIPRP',
    desc: {
      fr: "Application interne fictive permettant à un bureau AIPRP fédéral de recevoir, suivre et traiter ses demandes d'accès à l'information, avec calcul automatique de l'échéance légale de 30 jours et tableau de bord des demandes en retard. Construite sur Microsoft Power Platform, bilingue et testée pour la conformité WCAG 2.1 AA.",
      en: 'Fictional internal application letting a federal ATIP office receive, track and process access-to-information requests, with automatic calculation of the 30-day statutory deadline and a dashboard of overdue requests. Built on Microsoft Power Platform, bilingual and tested for WCAG 2.1 AA compliance.',
    },
    longDesc: {
      fr: "Application interne fictive permettant à un bureau AIPRP fédéral de recevoir, suivre et traiter ses demandes d'accès à l'information, avec calcul automatique de l'échéance légale de 30 jours (prorogations incluses), tableau de bord des demandes en retard ou proches de l'échéance, et journal d'activité horodaté. Construite sur Microsoft Power Platform (Dataverse + Power Apps code app), bilingue FR/EN sans texte codé en dur, testée automatiquement pour la conformité WCAG 2.1 AA (Playwright + axe-core).",
      en: 'Fictional internal application letting a federal ATIP office receive, track and process access-to-information requests, with automatic calculation of the 30-day statutory deadline (extensions included), a dashboard of overdue or near-deadline requests, and a timestamped activity log. Built on Microsoft Power Platform (Dataverse + a Power Apps code app), bilingual FR/EN with no hardcoded text, automatically tested for WCAG 2.1 AA compliance (Playwright + axe-core).',
    },
    stack: [
      'Microsoft Dataverse',
      'Power Apps (code app — React + TypeScript + Vite)',
      'Power Automate',
      'React Router',
      'GC Design System',
      'Playwright',
      'axe-core',
      'Power Platform CLI',
      'GitHub Actions',
      'MkDocs Material',
    ],
    featured: false,
    github: 'https://github.com/itsGween/tracker-aiprp',
    role: {
      fr: "Conception et développement complet (schéma de données, application, tests, documentation d'architecture)",
      en: 'End-to-end design and development (data schema, application, tests, architecture documentation)',
    },
    year: '2026',
    status: {
      fr: 'En développement — phases 0 à 2 livrées',
      en: 'In development — phases 0–2 delivered',
    },
    highlights: {
      fr: "Compréhension du cadre légal fédéral (Loi sur l'accès à l'information, délai de 30 jours), maîtrise de Power Platform au-delà du niveau canvas app (code app React, Dataverse, CLI, ALM), rigueur documentaire (ADR, étude de cas), accessibilité et bilinguisme comme réflexes.",
      en: 'Understanding of the federal legal framework (Access to Information Act, 30-day deadline), Power Platform mastery beyond canvas apps (React code app, Dataverse, CLI, ALM), documentation rigor (ADRs, case study), accessibility and bilingualism as defaults, not afterthoughts.',
    },
    features: {
      fr: [
        'Schéma Dataverse complet (tables, colonnes, relations) + données de démo fictives',
        'Code app React à 4 écrans : tableau de bord, liste, détail, nouvelle demande',
        "Calcul de l'échéance légale de 30 jours, prorogations incluses",
        "Tableau de bord des demandes en retard ou proches de l'échéance",
        "Journal d'activité horodaté par demande",
        'Interface bilingue FR/EN sans texte codé en dur',
        'Tests automatisés WCAG 2.1 AA (Playwright + axe-core)',
        "Documentation d'architecture : diagrammes Mermaid, ADR, modèle de données",
      ],
      en: [
        'Complete Dataverse schema (tables, columns, relationships) + fictional demo data',
        'React code app with 4 screens: dashboard, list, detail, new request',
        '30-day statutory deadline calculation, extensions included',
        'Dashboard of overdue and near-deadline requests',
        'Timestamped activity log per request',
        'Bilingual FR/EN interface with no hardcoded text',
        'Automated WCAG 2.1 AA tests (Playwright + axe-core)',
        'Architecture documentation: Mermaid diagrams, ADRs, data model',
      ],
    },
    architectureDiagram: {
      src: {
        fr: '/assets/projects/tracker-aiprp/architecture.svg',
        en: '/assets/projects/tracker-aiprp/architecture.en.svg',
      },
      alt: {
        fr: "Architecture cible du Tracker AIPRP : solution Power Platform avec code app React, tables Dataverse, flux Power Automate, rôles de sécurité et pipeline GitHub Actions (flux, rôles et pipeline pas encore livrés)",
        en: 'Tracker AIPRP (ATIP tracker) target architecture: Power Platform solution with a React code app, Dataverse tables, Power Automate flows, security roles and a GitHub Actions pipeline (flows, roles and pipeline not yet delivered)',
      },
    },
    docsLinks: [
      {
        label: { fr: 'Architecture', en: 'Architecture' },
        url: 'https://github.com/itsGween/tracker-aiprp/blob/main/docs/architecture.md',
      },
      {
        label: { fr: 'Décisions d’architecture (ADR)', en: 'Architecture decision records (ADR)' },
        url: 'https://github.com/itsGween/tracker-aiprp/tree/main/docs/adr',
      },
      {
        label: { fr: 'Modèle de données', en: 'Data model' },
        url: 'https://github.com/itsGween/tracker-aiprp/blob/main/docs/modele-donnees.md',
      },
      {
        label: { fr: 'Accessibilité', en: 'Accessibility' },
        url: 'https://github.com/itsGween/tracker-aiprp/blob/main/docs/accessibilite.md',
      },
      {
        label: { fr: 'Étude de cas', en: 'Case study' },
        url: 'https://github.com/itsGween/tracker-aiprp/blob/main/docs/portfolio-etude-de-cas.md',
      },
    ],
  },
]
