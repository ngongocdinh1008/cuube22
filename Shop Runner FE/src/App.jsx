import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Navbar } from '@/widgets/layout'
import routes from '@/routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ShopingCart from './pages/Products/ShoppingCart'

function App() {
  const { pathname } = useLocation()

  return (
    <>
      {!(pathname == '/sign-in' || pathname == '/sign-up' || pathname == '/product' || pathname == '/admin/user') && (
        <div className='container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4'>
          <Navbar routes={routes} />
        </div>
      )}
      <Routes>
        {routes.map(({ path, element }, key) => element && <Route key={key} exact path={path} element={element} />)}
        <Route path='*' element={<Navigate to='/home' replace />} />
      </Routes>
      <ToastContainer autoClose={700} />
      <ShopingCart />
    </>
  )
}

export default App
