import { useEffect, useState } from 'react'

export function useScrollSpy(ids: string[], threshold = 0.5) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [ids, threshold])

  return active
}
