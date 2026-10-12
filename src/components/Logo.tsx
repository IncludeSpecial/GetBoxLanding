import { useId } from 'react'

type Props = {
  className?: string
  title?: string
  /** Hide from assistive tech when the brand name is already next to it. */
  decorative?: boolean
}

/** GetBox mark — open package + get-arrow */
export function Logo({ className = '', title = 'GetBox', decorative = false }: Props) {
  const uid = useId().replace(/:/g, '')
  const face = `gbFace-${uid}`
  const lid = `gbLid-${uid}`

  return (
    <svg
      className={`logo ${className}`}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': title })}
    >
      <defs>
        <linearGradient id={face} x1="8" y1="6" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2b8fc4" />
          <stop offset="1" stopColor="#155a86" />
        </linearGradient>
        <linearGradient id={lid} x1="6" y1="8" x2="28" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#66c0f4" />
          <stop offset="1" stopColor="#3a9fd4" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="8" fill="#0d1a24" />
      <rect x="1.5" y="1.5" width="37" height="37" rx="6.5" stroke="#1e4a66" strokeWidth="1" />
      <path
        d="M8 16.5 L20 10.5 L32 16.5 L32 28.5 L20 34.5 L8 28.5 Z"
        fill={`url(#${face})`}
        opacity="0.95"
      />
      <path d="M11.5 18.2 L20 13.8 L28.5 18.2 L28.5 26.8 L20 31.2 L11.5 26.8 Z" fill="#0b1219" />
      <path d="M8 16.5 L20 10.5 L26 7.2 L14 13.2 Z" fill={`url(#${lid})`} />
      <path
        d="M20 15.2 V24.2 M20 24.2 L16.2 20.4 M20 24.2 L23.8 20.4"
        stroke="#d2efa4"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
