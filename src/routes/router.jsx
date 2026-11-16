import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from '@/components/layout/RootLayout'
import LazyPage from '@/routes/LazyPage'
import ProtectedRoute from '@/routes/ProtectedRoute'
import PageSkeleton from '@/components/skeletons/PageSkeleton'
import HomeSkeleton from '@/components/skeletons/HomeSkeleton'
import ProductsSkeleton from '@/components/skeletons/ProductsSkeleton'
import DetailSkeleton from '@/components/skeletons/DetailSkeleton'
import CartSkeleton from '@/components/skeletons/CartSkeleton'
import WishlistSkeleton from '@/components/skeletons/WishlistSkeleton'
import OrdersSkeleton from '@/components/skeletons/OrdersSkeleton'
import CheckoutSkeleton from '@/components/skeletons/CheckoutSkeleton'
import ProfilePageSkeleton from '@/components/skeletons/ProfilePageSkeleton'
import LoginSkeleton from '@/components/skeletons/LoginSkeleton'

const HomePage = lazy(() => import('@/features/products/pages/HomePage'))
const ProductsPage = lazy(() => import('@/features/products/pages/ProductsPage'))
const ProductDetailPage = lazy(
  () => import('@/features/products/pages/ProductDetailPage'),
)
const CartPage = lazy(() => import('@/features/cart/pages/CartPage'))
const WishlistPage = lazy(() => import('@/features/wishlist/pages/WishlistPage'))
const CheckoutPage = lazy(() => import('@/features/checkout/pages/CheckoutPage'))
const OrdersPage = lazy(() => import('@/features/orders/pages/OrdersPage'))
const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage'))
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))
const NotFoundPage = lazy(() => import('@/features/products/pages/NotFoundPage'))

function withLazy(Page, fallback) {
  return (
    <LazyPage fallback={fallback}>
      <Page />
    </LazyPage>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: withLazy(HomePage, <HomeSkeleton />),
      },
      {
        path: 'products',
        element: withLazy(ProductsPage, <ProductsSkeleton />),
      },
      {
        path: 'products/:id',
        element: withLazy(ProductDetailPage, <DetailSkeleton />),
      },
      {
        path: 'cart',
        element: withLazy(CartPage, <CartSkeleton />),
      },
      {
        path: 'wishlist',
        element: (
          <ProtectedRoute>
            {withLazy(WishlistPage, <WishlistSkeleton />)}
          </ProtectedRoute>
        ),
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            {withLazy(CheckoutPage, <CheckoutSkeleton />)}
          </ProtectedRoute>
        ),
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            {withLazy(OrdersPage, <OrdersSkeleton />)}
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            {withLazy(ProfilePage, <ProfilePageSkeleton />)}
          </ProtectedRoute>
        ),
      },
      {
        path: 'login',
        element: withLazy(LoginPage, <LoginSkeleton />),
      },
      {
        path: 'home',
        element: <Navigate to="/" replace />,
      },
      {
        path: '*',
        element: withLazy(NotFoundPage, <PageSkeleton />),
      },
    ],
  },
])
