import { Home, Profile, SignIn, SignUp } from '@/pages'
import EcommerceSection12 from './components/product'
import Product from './pages/Products'
import Admin from './pages/Admin'
import User from './pages/User'
import ProductDetail from './pages/Products/ProductDetail'
import ShopingCart from './pages/Products/ShoppingCart'
import Invoice from './pages/Invoice'

export const routes = [
  {
    name: 'home',
    path: '/home',
    element: <Home />
  },
  {
    name: 'profile',
    path: '/profile',
    element: <Profile />
  },
  {
    name: 'Product',
    path: '/product',
    element: <Product />
  },
  {
    path: '/sign-in',
    element: <SignIn />
  },
  {
    path: '/sign-up',
    element: <SignUp />
  },

  {
    path: '/detail/:id',
    element: <ProductDetail />
  },
  {
    path: '/admin',
    element: <Admin />
  },
  {
    path: '/admin/user',
    element: <User />
  },
  {
    path: '/cart',
    element: <ShopingCart />
  },
  {
    path: '/bill/:id',
    element: <Invoice />
  }
]

export default routes
