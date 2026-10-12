/** Screenshot variants produced by scripts/optimize-images.mjs */
export function shot(name: string) {
  const base = `/screenshots/${name}`
  return {
    src: `${base}.webp`,
    srcSet: `${base}-960.webp 960w, ${base}.webp 1920w`,
    '960': `${base}-960.webp`,
    thumb: `${base}-thumb.webp`,
  }
}
