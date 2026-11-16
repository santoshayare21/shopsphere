import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'

export default function NotFoundPage() {
  return (
    <div className="container">
      <EmptyState
        title="Page not found"
        description="That route does not exist in ShopSphere."
        action={
          <Link to="/">
            <Button type="button">Back home</Button>
          </Link>
        }
      />
    </div>
  )
}
