import { useId } from 'react'

type Props = {
  className?: string
  title?: string
  /** Hide from assistive tech when the brand name is already next to it. */
  decorative?: boolean
}

/**
 * GetBox mark — Fluent-style tile with an open box and a download arrow.
 * Master file: assets-src/brand/getbox-logo.svg (keep in sync).
 */
export function Logo({ className = '', title = 'GetBox', decorative = false }: Props) {
  const uid = useId().replace(/:/g, '')
  const tile = `gbTile-${uid}`
  const shine = `gbShine-${uid}`
  const right = `gbRight-${uid}`

  return (
    <svg
      className={`logo ${className}`}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': title })}
    >
      <defs>
        <linearGradient id={tile} x1="8" y1="2" x2="56" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4cb8f2" />
          <stop offset="1" stopColor="#1663a0" />
        </linearGradient>
        <linearGradient id={shine} x1="32" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity=".22" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={right} x1="32" y1="30" x2="50" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e3f2fd" />
          <stop offset="1" stopColor="#b9dcf4" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill={`url(#${tile})`} />
      <rect width="64" height="64" rx="14" fill={`url(#${shine})`} />
      <ellipse cx="32" cy="55.5" rx="17" ry="3.2" fill="#0a3a5e" opacity=".35" />
      <path d="M13 29 L32 38.5 L32 56 L13 46.5 Z" fill="#fff" />
      <path d="M51 29 L32 38.5 L32 56 L51 46.5 Z" fill={`url(#${right})`} />
      <path d="M13 29 L32 19.5 L51 29 L32 38.5 Z" fill="#0f4f80" />
      <path
        d="M32 7 V33 M23.5 24.5 L32 33 L40.5 24.5"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
