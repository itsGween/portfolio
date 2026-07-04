type Lang = 'fr' | 'en'

interface FallbackEntry {
  keywords: string[]
  fr: string
  en: string
}

const FALLBACKS: FallbackEntry[] = [
  {
    keywords: ['parcours', 'background', 'formation', 'diplôme', 'diploma', 'étude', 'study'],
    fr: "Je suis diplômée en Technologie du génie informatique de La Cité (Ottawa) avec Grande Distinction et un GPA de 4.007. J'ai aussi travaillé sur GENIXI, un projet de recherche appliquée en navigation vocale par IA. Envie d'en savoir plus ? 📩 kangahhansberryl7@outlook.com",
    en: "I graduated from La Cité (Ottawa) in Computer Engineering Technology with Highest Distinction and a GPA of 4.007. I also worked on GENIXI, an applied research project in AI voice navigation. Want to know more? 📩 kangahhansberryl7@outlook.com",
  },
  {
    keywords: ['projet', 'project', 'genixi', 'smartcart', 'azure', 'cassandra', 'travail', 'work'],
    fr: "Mes projets phares : GENIXI (navigation vocale IA en React/FastAPI), SmartCart (app Android temps-réel en Kotlin/NestJS), une infrastructure Azure, et un cluster Cassandra. Chacun m'a appris quelque chose d'unique ! Tu veux les détails d'un projet en particulier ?",
    en: "My key projects: GENIXI (AI voice nav in React/FastAPI), SmartCart (real-time Android app in Kotlin/NestJS), an Azure infrastructure, and a Cassandra cluster. Each taught me something unique! Want details on a specific project?",
  },
  {
    keywords: ['stack', 'compétence', 'skill', 'technologie', 'technology', 'langage', 'language'],
    fr: "Je maîtrise React/TypeScript côté frontend, Node.js/NestJS/FastAPI côté backend, PostgreSQL et Cassandra pour les BDD, et Azure/Docker pour le cloud. Je code aussi en Kotlin pour Android ! Tu veux qu'on creuse un aspect en particulier ?",
    en: "I'm fluent in React/TypeScript on the frontend, Node.js/NestJS/FastAPI on the backend, PostgreSQL and Cassandra for databases, and Azure/Docker for cloud. I also code Kotlin for Android! Want to dig deeper into anything?",
  },
  {
    keywords: ['disponible', 'available', 'dispo', 'stage', 'internship', 'freelance', 'embauche', 'hire', 'poste', 'job', 'emploi', 'employment'],
    fr: "Je suis disponible immédiatement pour un emploi ou des projets freelance ! Basée à Ottawa, autorisée à travailler au Canada. La meilleure façon de me contacter : kangahhansberryl7@outlook.com ou 819 592-8576.",
    en: "I'm immediately available for employment or freelance projects! Based in Ottawa, authorized to work in Canada. Best way to reach me: kangahhansberryl7@outlook.com or 819 592-8576.",
  },
  {
    keywords: ['contact', 'email', 'téléphone', 'phone', 'joindre', 'reach', 'message'],
    fr: "Tu peux me joindre par email à kangahhansberryl7@outlook.com ou par téléphone au 819 592-8576. Je réponds rapidement !",
    en: "You can reach me by email at kangahhansberryl7@outlook.com or by phone at 819 592-8576. I respond quickly!",
  },
]

const DEFAULT: Record<Lang, string> = {
  fr: "Je suis Gween, développeuse full-stack à Ottawa ! Je peux te parler de mon parcours, mes projets (GENIXI, SmartCart…), mes compétences ou ma disponibilité. Pour me contacter directement : kangahhansberryl7@outlook.com 👩‍💻",
  en: "I'm Gween, a full-stack developer based in Ottawa! I can tell you about my background, projects (GENIXI, SmartCart…), skills, or availability. To reach me directly: kangahhansberryl7@outlook.com 👩‍💻",
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
