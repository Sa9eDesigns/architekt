
import { extendTheme } from '@mui/joy/styles';


declare module '@mui/joy/styles' {
  // No custom tokens found, you can skip the theme augmentation.
}


const theme = extendTheme({
  "colorSchemes": {
    "light": {
      "palette": {}
    },
    "dark": {
      "palette": {
        "primary": {
          "50": "#f5f3ff",
          "100": "#ede9fe",
          "200": "#ddd6fe",
          "300": "#c4b5fd",
          "400": "#a78bfa",
          "500": "#8b5cf6",
          "600": "#7c3aed",
          "700": "#6d28d9",
          "800": "#5b21b6",
          "900": "#4c1d95"
        },
        "neutral": {
          "50": "#f9fafb",
          "100": "#f3f4f6",
          "200": "#e5e7eb",
          "300": "#d1d5db",
          "400": "#9ca3af",
          "500": "#6b7280",
          "600": "#4b5563",
          "700": "#374151",
          "800": "#1f2937",
          "900": "#111827"
        }
      }
    }
  }
})

export default theme;