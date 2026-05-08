export const theme = {
  bg: {
    primary: '#FFD2A8',
    gradient:
      'linear-gradient(180deg, #FFE2BC 0%, #FFB888 35%, #F08A6B 65%, #B85E5C 100%)',
  },
  text: {
    primary: '#3A1F26',
    secondary: '#6E4248',
    muted: '#9A7078',
  },
  accent: {
    primary: '#C8472D',
    secondary: '#A53A20',
    warm: '#E8945A',
    highlight: '#FFC890',
  },
} as const

export type Theme = typeof theme

export const fontSerif = 'var(--font-playfair), Georgia, serif'
export const fontBody = 'var(--font-crimson), Georgia, serif'
