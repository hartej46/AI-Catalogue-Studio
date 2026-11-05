/**
 * Catalogue Studio - Atelier Design System Tokens
 * Single source of truth for colors, typography, radii, shadows, and spacing.
 */

export const theme = {
  colors: {
    // Core tokens
    bg: "#F4EFE8", // Bone, page background
    surface: "#FBF8F3", // Parchment, cards and panels
    ink: "#1C1714", // Espresso, main text
    muted: "#6E655C", // Warm grey, secondary text
    border: "#DDD4C7", // Stone, hairline borders
    accent: "#5B1A1F", // Oxblood, primary buttons, links, key moments
    accentHover: "#471418", // Deeper oxblood
    brass: "#B08D57", // Antique brass, detail only

    // Semantic mappings
    background: "#F4EFE8",
    card: "#FBF8F3",
    cardMuted: "#F4EFE8",
    primary: "#5B1A1F",
    primaryHover: "#471418",
    primaryActive: "#3A1013",
    primaryMuted: "rgba(91, 26, 31, 0.08)",

    text: {
      primary: "#1C1714",
      secondary: "#6E655C",
      muted: "#6E655C",
      subtle: "#8E857C",
      inverted: "#F4EFE8", // Bone on Oxblood
      accent: "#5B1A1F",
    },

    status: {
      success: "#2D5A27",
      successBg: "#F0F4EE",
      warning: "#8C5E1E",
      warningBg: "#F7F2E8",
      error: "#7D1D22",
      errorBg: "#F9ECEC",
      info: "#5B1A1F",
      infoBg: "#F7EFEF",
    },

    whatsapp: "#2D5A27",
    whatsappDark: "#23471E",
  },

  fonts: {
    serif: "'Cormorant Garamond', Georgia, Cambria, 'Times New Roman', serif",
    sans: "'Hanken Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  radii: {
    xs: "4px",
    sm: "6px",
    md: "8px",
    cardSm: "6px",
    cardLg: "8px",
    full: "9999px",
  },

  shadows: {
    warmSm: "0 1px 2px rgba(28, 23, 20, 0.06)",
    warmCard: "0 1px 3px rgba(28, 23, 20, 0.05)",
    warmMd: "0 2px 4px rgba(28, 23, 20, 0.06)",
    warmLg: "0 4px 8px rgba(28, 23, 20, 0.08)",
    drawer: "0 -4px 16px rgba(28, 23, 20, 0.08)",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
  },

  layout: {
    mobileMaxWidth: "390px",
    containerMaxWidth: "440px",
  },
} as const;

export type Theme = typeof theme;
export default theme;
