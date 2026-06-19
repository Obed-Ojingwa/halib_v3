// C:\Users\Melody\Documents\haliberrycake\frontend\src\components\layout\Navbar.tsx
import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useCart } from '@/context/CartContext'

const NAV_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'Our Story',      href: '/about' },
  { label: 'Shop Cakes',       href: '/shop' },
  { label: 'Baking Masterclasses',    href: '/cake-classes' },
  { label: 'Haliberry CIC', href: '/cic' },
  { label: 'Gallery',    href: '/gallery' },
  { label: 'Contact',    href: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]  = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { cartCount } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const drawerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location])

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }

      if (event.key !== 'Tab' || !drawerRef.current) return

      const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusableElements.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  interface SiteSetting { key: string; image_url: string | null }

  const closeMenu = () => setMenuOpen(false)

  const { data: siteSettings } = useQuery<SiteSetting[]>({
    queryKey: ['site-settings'],
    queryFn: async () => (await api.get('/api/v1/site-settings')).data,
    staleTime: 1000 * 60 * 10,
    retry: false,
  })

  const brandLogoUrl = siteSettings?.find((setting) => setting.key === 'brand_logo')?.image_url ?? null

  const navBg = scrolled || !isHome
    ? 'bg-[var(--cream-white)]/95 backdrop-blur-md shadow-luxury-sm'
    : 'bg-transparent'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 leading-none">
          {brandLogoUrl ? (
            <img
              src={brandLogoUrl}
              alt="Haliberry Cake logo"
              className="h-10 max-h-[2.5rem] w-auto object-contain"
            />
          ) : (
            <div className="flex flex-col leading-none">
              <span
                className="font-serif font-bold tracking-tight"
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.6rem)',
                  color: 'var(--text-primary)',
                }}
              >
                Haliberry
              </span>
              <span
                className="font-sans tracking-[0.18em] uppercase"
                style={{
                  fontSize: '0.55rem',
                  color: scrolled || !isHome ? 'var(--peach)' : 'rgba(255,255,255,0.85)',
                }}
              >
                Cake · London
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <NavLink
                to={href}
                className={({ isActive }) =>
                  `font-sans text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isActive
                      ? 'text-[var(--peach)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--peach)]'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/cart"
            className="btn-outline flex items-center gap-2 text-xs py-2.5 px-4"
          >
            <ShoppingBag size={15} />
            Cart
            <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[var(--peach)] px-2 text-[0.7rem] font-semibold text-white">
              {cartCount}
            </span>
          </Link>
          <Link
            to="/shop"
            className="btn-primary text-xs py-2.5 px-5"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="lg:hidden p-2 rounded-lg transition-colors"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation-drawer"
          style={{ color: scrolled || !isHome ? 'var(--text-primary)' : 'white' }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="lg:hidden absolute inset-x-0 top-full z-40"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              ref={drawerRef}
              id="mobile-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation drawer"
              tabIndex={-1}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="relative z-50 w-[88vw] max-w-sm min-h-[calc(100vh-72px)] overflow-y-auto bg-[var(--cream-white)] p-6 shadow-2xl border-r border-[var(--cream)]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-sans text-lg font-semibold tracking-wide text-[var(--text-primary)]">
                  Navigation
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full p-2 text-[var(--text-primary)] transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[var(--peach)]"
                >
                  <X size={22} />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>

              <nav className="mt-8 space-y-3">
                {NAV_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    to={href}
                    onClick={closeMenu}
                    className="block rounded-2xl border border-[var(--sand)] bg-white px-4 py-3 text-base font-medium text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--peach)] hover:text-[var(--peach)]"
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6">
                <Link
                  to="/shop"
                  onClick={closeMenu}
                  className="btn-primary w-full justify-center"
                >
                  <ShoppingBag size={16} />
                  Order a Cake
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}