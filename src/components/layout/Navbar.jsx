import { useState } from 'react'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Heart, Menu, Moon, Search, ShoppingCart, Sun, User } from 'lucide-react'
import IconButton from '@/components/ui/IconButton'
import Input from '@/components/ui/Input'
import Drawer from '@/components/ui/Drawer'
import Button from '@/components/ui/Button'
import { useTheme } from '@/context/ThemeContext'
import { selectCartItemCount } from '@/features/cart/slices/cartSelectors'
import { selectIsAuthenticated } from '@/features/auth/slices/authSelectors'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/orders', label: 'Orders' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { theme, toggleTheme } = useTheme()
  const cartCount = useSelector(selectCartItemCount)
  const isAuthed = useSelector(selectIsAuthenticated)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState(params.get('q') || '')

  const submitSearch = (e) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
    setSearchOpen(false)
    setMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand}>
          ShopSphere
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.linkActive : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form className={styles.searchDesktop} onSubmit={submitSearch} role="search">
          <Input
            aria-label="Search products"
            placeholder="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className={styles.actions}>
          <IconButton
            className={styles.mobileOnly}
            label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={20} aria-hidden />
          </IconButton>
          <IconButton
            label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={20} aria-hidden /> : <Moon size={20} aria-hidden />}
          </IconButton>
          <IconButton
            label={isAuthed ? 'Profile' : 'Login'}
            onClick={() => navigate(isAuthed ? '/profile' : '/login')}
          >
            <User size={20} aria-hidden />
          </IconButton>
          <div className={styles.badgeWrap}>
            <IconButton label="Wishlist" onClick={() => navigate('/wishlist')}>
              <Heart size={20} aria-hidden />
            </IconButton>
          </div>
          <div className={styles.badgeWrap}>
            <IconButton label="Cart" onClick={() => navigate('/cart')}>
              <ShoppingCart size={20} aria-hidden />
            </IconButton>
            {cartCount > 0 ? <span className={styles.count}>{cartCount}</span> : null}
          </div>
          <IconButton
            className={styles.mobileOnly}
            label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={20} aria-hidden />
          </IconButton>
        </div>
      </div>

      <Drawer open={menuOpen} title="Menu" onClose={() => setMenuOpen(false)} side="left">
        <nav className={styles.menuList} aria-label="Mobile">
          {NAV_LINKS.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link to={isAuthed ? '/profile' : '/login'} onClick={() => setMenuOpen(false)}>
            {isAuthed ? 'Profile' : 'Login'}
          </Link>
        </nav>
      </Drawer>

      <Drawer
        open={searchOpen}
        title="Search"
        onClose={() => setSearchOpen(false)}
        side="bottom"
      >
        <form className={styles.searchSheet} onSubmit={submitSearch} role="search">
          <Input
            aria-label="Search products"
            placeholder="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <Button type="submit" fullWidth>
            Search
          </Button>
        </form>
      </Drawer>
    </header>
  )
}
