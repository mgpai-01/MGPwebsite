import type { MouseEvent } from 'react'

/** Matches the .page-leaving fade-out duration in globals.css. */
const LEAVE_MS = 220

/**
 * Fades <main> out before navigating, so leaving a page matches the
 * page-enter fade-up on arrival instead of hard-flashing.
 *
 * Shared by the header nav and in-page links (e.g. "back to home") so every
 * cross-page navigation on the site feels the same.
 *
 * `onBefore` runs whether or not the fade applies — used by the header to
 * close its mobile menu.
 */
export function fadeNavigate(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  onBefore?: () => void,
) {
  // Let the browser handle modified clicks (new tab, etc.).
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return

  const dest = new URL(href, window.location.origin)
  // Same-page hash links keep their native smooth scroll — only fade on real
  // cross-page navigations.
  if (dest.pathname === window.location.pathname) {
    onBefore?.()
    return
  }
  if (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    onBefore?.()
    return
  }

  e.preventDefault()
  onBefore?.()
  document.querySelector('main')?.classList.add('page-leaving')
  window.setTimeout(() => {
    window.location.href = href
  }, LEAVE_MS)
}
