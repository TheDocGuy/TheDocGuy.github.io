/** Palette lock for WCAG contrast on forge. Keep in sync with `src/app/globals.css`. */
export const PALETTE = {
  forge: "#1a0f00",
  iron: "#2e2016",
  ember: "#c45c0a",
  emberHot: "#f07020",
  emberFill: "#8f3c08",
  emberFillHover: "#a34609",
  ash: "#a48b7a",
  cream: "#f5ede0",
} as const

function srgbChannel(value: number): number {
  const channel = value / 255
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
}

export function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "")
  if (value.length !== 6) throw new Error(`Invalid hex: ${hex}`)
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ]
}

export function relativeLuminance(hex: string): number {
  const [red, green, blue] = hexToRgb(hex)
  return 0.2126 * srgbChannel(red) + 0.7152 * srgbChannel(green) + 0.0722 * srgbChannel(blue)
}

export function contrastRatio(foreground: string, background: string): number {
  const first = relativeLuminance(foreground)
  const second = relativeLuminance(background)
  const lighter = Math.max(first, second)
  const darker = Math.min(first, second)
  return (lighter + 0.05) / (darker + 0.05)
}
