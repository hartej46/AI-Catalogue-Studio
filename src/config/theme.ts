/**
 * Catalogue Studio - Atelier Design System Tokens
 * Single source of truth for colors, typography, radii, shadows, and spacing.
 */

export const theme = {
  colors: {
    // Canvas & backgrounds
    background: "#FDF9F3", // Warm parchment
    card: "#FFFFFF",
    cardMuted: "#FBF8F2",

    // Primary & accents
    primary: "#7A6A2E", // Olive-gold
    primaryHover: "#655724",
    primaryActive: "#54481D",
    primaryLight: "#8D7B38",
    primaryMuted: "rgba(122, 106, 46, 0.08)",

    // Champagne tints
    champagne: "#E8DFBE",
    champagneLight: "#F5EEDB",
    champagneMuted: "#FAF6ED",
    champagneBorder: "#DFD5B0",

    // Structural borders
    border: "#E8E6DF",
    borderLight: "#F0EFEA",
    borderStrong: "#D5D2C7",

    // Typography
    text: {
      primary: "#1C1917", // Obsidian / deep warm espresso
      secondary: "#57534E", // Warm stone
      muted: "#8C867A", // Soft taupe
      subtle: "#B0A99C",
      inverted: "#FFFFFF",
      accent: "#7A6A2E",
    },

    // Semantic status
    status: {
      success: "#15803D",
      successBg: "#F0FDF4",
      warning: "#B45309",
      warningBg: "#FFFBEB",
      error: "#B91C1C",
      errorBg: "#FEF2F2",
      info: "#1D4ED8",
      infoBg: "#EFF6FF",
    },

    // Concierge & External
    whatsapp: "#25D366",
    whatsappDark: "#1EBE5D",
  },

  fonts: {
    serif: "'Cormorant Garamond', Georgia, Cambria, 'Times New Roman', serif",
    sans: "'Hanken Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  radii: {
    xs: "4px",
    sm: "6px",
    md: "10px",
    cardSm: "12px", // 12px card corner
    cardLg: "16px", // 16px card corner
    full: "9999px",
  },

  shadows: {
    warmSm: "0 2px 8px -1px rgba(122, 106, 46, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)",
    warmCard: "0 4px 20px -2px rgba(122, 106, 46, 0.06), 0 2px 6px rgba(28, 25, 23, 0.03)",
    warmMd: "0 8px 24px -4px rgba(122, 106, 46, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)",
    warmLg: "0 16px 36px -6px rgba(122, 106, 46, 0.12), 0 4px 12px rgba(0, 0, 0, 0.05)",
    drawer: "0 -8px 32px rgba(122, 106, 46, 0.15)",
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
