import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.brand}>ShopSphere</p>
          <p className={styles.copy}>Frontend-only demo store powered by DummyJSON.</p>
        </div>
        <nav className={styles.links} aria-label="Footer">
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/orders">Orders</Link>
        </nav>
      </div>
    </footer>
  )
}
