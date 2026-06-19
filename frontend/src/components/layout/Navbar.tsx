// C:\Users\Melody\Documents\haliberrycake\frontend\src\components\layout\Navbar.tsx
import { useState, useEffect } from 'react'
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

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location])

  interface SiteSetting { key: string; image_url: string | null }

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
          style={{ color: scrolled || !isHome ? 'var(--text-primary)' : 'white' }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[var(--cream-white)]/98 backdrop-blur-md shadow-luxury-lg border-t border-[var(--cream)]"
          >
            <ul className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <NavLink
                    to={href}
                    className={({ isActive }) =>
                      `block font-sans text-base font-medium py-1 border-b border-cream transition-colors ${
                        isActive ? 'text-[var(--peach)]' : 'text-[var(--text-primary)]'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <Link to="/shop" className="btn-primary w-full justify-center">
                  <ShoppingBag size={16} />
                  Order a Cake
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}