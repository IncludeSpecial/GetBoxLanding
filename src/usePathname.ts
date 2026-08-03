import { useEffect, useState } from 'react'

function currentPath() {
  return window.location.pathname
}

/** Lightweight SPA path without a router dependency. */
export function usePathname() {
  const [pathname, setPathname] = useState(currentPath)

  useEffect(() => {
    const onPop = () => setPathname(currentPath())
    window.addEventListener('popstate', onPop)

    const onClick = (e: MouseEvent) => {
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
        window.history.pushState({}, '', url.pathname + url.search + url.hash)
        setPathname(url.pathname)
        const hash = url.hash
        queueMicrotask(() => {
          if (hash) {
            document.querySelector(hash)?.scrollIntoView()
          } else {
            window.scrollTo(0, 0)
          }
        })
      } else if (url.hash) {
        document.querySelector(url.hash)?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('popstate', onPop)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return pathname
}
