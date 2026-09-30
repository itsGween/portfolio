// Réglages partagés par toutes les cartes du site (Projets, Compétences, Blog, Services…).
// Modifier ici plutôt que dans chaque section, pour que les cartes restent identiques.

/** Forme commune : remplit la hauteur de sa rangée de grille, même rayon et même bordure. */
export const CARD_SHAPE = 'h-full rounded-[20px] border border-line'

/** Marge intérieure commune. */
export const CARD_PADDING = 'p-8 max-md:p-6'

/** Fond commun des cartes de contenu. */
export const CARD_BG = '#211308'

/** Espacement commun entre cartes dans une grille. */
export const CARD_GRID_GAP = 'gap-6'

/** Survol commun : légère élévation, bordure orange, ombre. */
export const CARD_HOVER = {
  y: -6,
  borderColor: 'rgba(255,122,24,.4)',
  boxShadow: '0 24px 56px rgba(0,0,0,.45)',
}

/** Enveloppe de grille (RevealOnScroll) : doit remplir la cellule pour que la carte s'étire. */
export const CARD_CELL = 'h-full'
