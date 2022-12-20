import { TinyColor } from '@ctrl/tinycolor'

export function isDark(color: string): boolean {
  const tinyColor = new TinyColor(color)
  return tinyColor.isDark()
}

export function isLight(color: string): boolean {
  return !isDark(color)
}
