const CV_URLS = {
  fr: '/CV_Gween_Kangah_FR.pdf',
  en: '/CV_Gween_Kangah_EN.pdf',
} as const

export function getCvUrl(lang: string): string {
  return lang.startsWith('en') ? CV_URLS.en : CV_URLS.fr
}
