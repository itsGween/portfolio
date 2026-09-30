type Lang = 'fr' | 'en'

interface FallbackEntry {
  keywords: string[]
  fr: string
  en: string
}

// L'ordre compte : la première entrée dont un mot-clé apparaît gagne. Les sujets précis
// passent donc avant les génériques (« quitté ton emploi » ne doit pas tomber sur la disponibilité).
const FALLBACKS: FallbackEntry[] = [
  {
    keywords: ['résidence', 'residence', 'réception', 'recept', 'quitt', 'left your', 'leave', 'départ'],
    fr: "J'ai occupé le poste de réceptionniste à la Résidence La Cité de septembre 2024 à septembre 2026. Ce poste était lié à mon statut d'étudiante-résidente ; maintenant diplômée et n'habitant plus la résidence, je ne remplis plus les conditions pour l'occuper. Je cherche maintenant un poste à temps plein où mettre à profit mes compétences techniques en Technologie du génie informatique.",
    en: "I worked as a receptionist at Résidence La Cité from September 2024 to September 2026. The role was tied to my status as a student-resident; now that I've graduated and no longer live at the residence, I no longer meet the conditions for the position. I'm now looking for a full-time role where I can apply the technical skills I gained through my Computer Engineering Technology program.",
  },
  {
    keywords: ['power', 'dataverse', 'aiprp', 'atip', 'power apps', 'powerapps'],
    fr: "Mon projet Power Platform, c'est le Tracker AIPRP : une application interne fictive de suivi des demandes d'accès à l'information (délai légal de 30 jours), construite sur Microsoft Dataverse et une code app Power Apps en React + TypeScript, déployée avec les CLI pac et pa. Il est en développement actif : schéma Dataverse, 4 écrans bilingues et tests WCAG sont livrés ; les flux Power Automate et les rôles de sécurité sont à venir.",
    en: "My Power Platform project is the ATIP Tracker: a fictional internal app for tracking access-to-information requests (30-day legal deadline), built on Microsoft Dataverse and a Power Apps code app in React + TypeScript, deployed with the pac and pa CLIs. It's in active development: the Dataverse schema, 4 bilingual screens and WCAG tests are delivered; Power Automate flows and security roles are coming next.",
  },
  {
    keywords: ['azure', 'cloud', 'infonuag', 'key vault', 'vnet'],
    fr: "Sur Azure, j'ai déployé et configuré une infrastructure complète via Azure CLI : réseaux virtuels (VNets) interconnectés par VNet Peering, machines virtuelles, stockage et Azure Key Vault pour les secrets. J'ai automatisé la configuration avec PowerShell et appliqué des paramètres de réseau et de sécurité (projet académique, janvier – avril 2026).",
    en: "On Azure, I deployed and configured a full infrastructure with the Azure CLI: virtual networks (VNets) connected through VNet Peering, virtual machines, storage and Azure Key Vault for secrets. I automated the configuration with PowerShell and applied network and security settings (academic project, January – April 2026).",
  },
  {
    keywords: ['parcours', 'background', 'formation', 'diplôme', 'diploma', 'étude', 'study', 'journey', 'career'],
    fr: "Je suis diplômée en Technologie du génie informatique du Collège La Cité (Ottawa), avec Grande Distinction et un GPA de 4.007. De février à mai 2026, j'ai été développeuse Web full stack en recherche appliquée chez GénieLab, sur GENIXI. J'ai ensuite construit des projets orientés secteur public fédéral (Auditeur WCAG, SecureGate, Tracker AIPRP) et je cherche maintenant un poste à temps plein.",
    en: "I graduated in Computer Engineering Technology from Collège La Cité (Ottawa) with Highest Distinction and a GPA of 4.007. From February to May 2026, I was a full stack web developer in applied research at GénieLab, working on GENIXI. I then built federal-public-sector-oriented projects (WCAG Auditor, SecureGate, ATIP Tracker) and I'm now looking for a full-time role.",
  },
  {
    keywords: ['projet', 'project', 'genixi', 'smartcart', 'securegate', 'wcag', 'cassandra', 'travail', 'work'],
    fr: "Mes projets : GENIXI (navigation géospatiale en React/FastAPI), SmartCart (app Android temps réel en Kotlin/NestJS), SecureGate (authentification sécurisée en Spring Boot), l'Auditeur d'accessibilité WCAG (Playwright + axe-core), le Tracker AIPRP (Power Platform), une infrastructure Azure et un cluster Cassandra. Tu veux les détails d'un projet en particulier ?",
    en: "My projects: GENIXI (geospatial navigation in React/FastAPI), SmartCart (real-time Android app in Kotlin/NestJS), SecureGate (secure authentication in Spring Boot), the WCAG accessibility auditor (Playwright + axe-core), the ATIP Tracker (Power Platform), an Azure infrastructure and a Cassandra cluster. Want details on a specific project?",
  },
  {
    keywords: ['stack', 'compétence', 'skill', 'technologie', 'technology', 'langage', 'language'],
    fr: "Je maîtrise React/TypeScript côté frontend, Node.js/NestJS/FastAPI côté backend, PostgreSQL et Cassandra pour les BDD, et Azure/Docker pour le cloud. Je code aussi en Kotlin pour Android ! Tu veux qu'on creuse un aspect en particulier ?",
    en: "I work with React/TypeScript on the frontend, Node.js/NestJS/FastAPI on the backend, PostgreSQL and Cassandra for databases, and Azure/Docker for cloud. I also code Kotlin for Android! Want to dig deeper into anything?",
  },
  {
    keywords: ['disponible', 'available', 'dispo', 'stage', 'internship', 'freelance', 'embauche', 'hire', 'poste', 'job', 'emploi', 'employment'],
    fr: "Je suis disponible immédiatement pour un emploi ou des projets freelance ! Basée à Ottawa, autorisée à travailler au Canada. La meilleure façon de me contacter : gween.hkangah@gmail.com ou 819 592-8576.",
    en: "I'm immediately available for employment or freelance projects! Based in Ottawa, authorized to work in Canada. Best way to reach me: gween.hkangah@gmail.com or 819 592-8576.",
  },
  {
    keywords: ['contact', 'email', 'téléphone', 'phone', 'joindre', 'reach', 'message'],
    fr: "Tu peux me joindre par email à gween.hkangah@gmail.com ou par téléphone au 819 592-8576. Je réponds rapidement !",
    en: "You can reach me by email at gween.hkangah@gmail.com or by phone at 819 592-8576. I respond quickly!",
  },
]

const DEFAULT: Record<Lang, string> = {
  fr: "Je suis Gween, développeuse full-stack à Ottawa ! Je peux te parler de mon parcours, mes projets (GENIXI, SmartCart…), mes compétences ou ma disponibilité. Pour me contacter directement : gween.hkangah@gmail.com 👩‍💻",
  en: "I'm Gween, a full-stack developer based in Ottawa! I can tell you about my background, projects (GENIXI, SmartCart…), skills, or availability. To reach me directly: gween.hkangah@gmail.com 👩‍💻",
}

export function getFallbackResponse(input: string, lang: Lang): string {
  const lower = input.toLowerCase()
  for (const entry of FALLBACKS) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry[lang]
    }
  }
  return DEFAULT[lang]
}
