import { getAccessTokenFromLS, getProfileFromLS } from '@/utils/auth'
import { createContext, useState } from 'react'

export const getInitialAppContext = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  openCart: false,
  setOpenCart: () => null,
  reload: false,
  setReload: () => null,
  cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  setCart: () => null,
  price: 0,
  setPrice: () => null
})

const initialAppContext = getInitialAppContext()

export const AppContext = createContext(initialAppContext)

export const AppProvider = ({ children, defaultValue = initialAppContext }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(defaultValue.isAuthenticated)
  const [profile, setProfile] = useState(defaultValue.profile)
  const [openCart, setOpenCart] = useState(false)
  const [reload, setReload] = useState(false)
  const [cart, setCart] = useState([])
  const [price, setPrice] = useState(0)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        openCart,
        setOpenCart,
        setReload,
        reload,
        setCart,
        cart,
        setPrice,
        price
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
