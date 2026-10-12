import { useEffect, useState } from 'react'

const NAVIGATE_EVENT = 'getbox:navigate'

function scrollAfterRender(hash: string) {
  // Wait for React to commit the new page before looking up the anchor.
  window.setTimeout(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, 0)
}

/** Client-side navigation to a same-origin URL. */
export function navigate(href: string, { replace = false } = {}) {
  const url = new URL(href, window.location.origin)
  const next = url.pathname + url.search + url.hash
  if (replace) {
    window.history.replaceState({}, '', next)
  } else {
    window.history.pushState({}, '', next)
  }
  window.dispatchEvent(new Event(NAVIGATE_EVENT))
  if (!replace) scrollAfterRender(url.hash)
}

/**
 * Lightweight SPA path without a router dependency.
 * `initial` is used during server rendering, where `window` does not exist.
 */
export function usePathname(initial?: string) {
  const [pathname, setPathname] = useState(() => initial ?? window.location.pathname)

  useEffect(() => {
    const sync = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', sync)
    window.addEventListener(NAVIGATE_EVENT, sync)

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return
      }
      const target = e.target as HTMLElement | null
      const a = target?.closest?.('a')
      if (!a) return
      if (a.target && a.target !== '_self') return
      if (a.hasAttribute('download')) return
      const href = a.getAttribute('href')
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
        return
      }
      const url = new URL(href, window.location.origin)
      if (url.origin !== window.location.origin) return
      e.preventDefault()
      if (url.pathname !== window.location.pathname || url.search !== window.location.search) {
        navigate(url.href)
      } else if (url.hash) {
        document.querySelector(url.hash)?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener(NAVIGATE_EVENT, sync)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return pathname
}
