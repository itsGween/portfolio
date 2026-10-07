import { useEffect, useState } from 'react'

// Section active = celle qui traverse une ligne horizontale située à 40 % du haut
// de la fenêtre. Contrairement à un seuil de visibilité (ex. 50 %), ça fonctionne
// aussi pour les sections plus hautes que l'écran. Renvoie '' si aucune section
// suivie n'est sous la ligne (hero, parcours, contact).
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const visible = new Set<string>()
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        setActive(ids.find((id) => visible.has(id)) ?? '')
      },
      { rootMargin: '-40% 0px -60% 0px' }
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    }
    return () => obs.disconnect()
  }, [ids])

  return active
}
