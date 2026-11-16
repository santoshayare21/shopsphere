import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Package } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import { selectOrders } from '@/features/orders/slices/ordersSelectors'
import { formatCurrency, formatDate } from '@/utils/format'
import styles from './OrdersPage.module.css'

export default function OrdersPage() {
  const orders = useSelector(selectOrders)

  if (orders.length === 0) {
    return (
      <div className="container">
        <h1 className="page-title">Orders</h1>
        <EmptyState
          icon={<Package size={32} aria-hidden />}
          title="No orders yet"
          description="Completed checkouts will show up here."
          action={
            <Link to="/products">
              <Button type="button">Start shopping</Button>
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="page-title">Orders</h1>
      <p className="page-subtitle">Local order history persisted in your browser.</p>
      <ul className={styles.list}>
        {orders.map((order) => (
          <Card as="li" key={order.id} className={styles.row}>
            <div>
              <p className={styles.id}>Order {order.id.slice(0, 8)}</p>
              <p className={styles.meta}>{formatDate(order.createdAt)}</p>
            </div>
            <p className={styles.meta}>
              {order.items.length} item{order.items.length === 1 ? '' : 's'}
            </p>
            <p className={styles.total}>{formatCurrency(order.totals.total)}</p>
            <Badge tone="success">{order.status}</Badge>
          </Card>
        ))}
      </ul>
    </div>
  )
}
