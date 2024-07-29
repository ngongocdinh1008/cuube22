import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Navbar as MTNavbar, MobileNav, Typography, Button, IconButton } from '@material-tailwind/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { AppContext } from '@/contexts/app.context'
import { useLocation } from 'react-router-dom'
export function Navbar({ brandName, routes, action }) {
  const [openNav, setOpenNav] = React.useState(false)
  const { openCart, setOpenCart } = useContext(AppContext)
  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('profile')
    localStorage.removeItem('price')
    localStorage.removeItem('cart')
    window.location.reload()
  }
  const location = useLocation()
  const { isAuthenticated } = useContext(AppContext)
  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false))
  }, [])

  const navList = (
    <ul className='mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      {routes.map(({ name, path, icon, href, target }) => (
        <Typography key={name} as='li' variant='small' color='inherit' className='capitalize'>
          {href ? (
            <a href={href} target={target} className='flex items-center gap-5 p-1 font-bold'>
              {icon &&
                React.createElement(icon, {
                  className: 'w-[18px] h-[18px] opacity-75 mr-1'
                })}
              {name}
            </a>
          ) : (
            <Link to={path} target={target} className='flex items-center gap-5 p-1 font-bold'>
              {icon &&
                React.createElement(icon, {
                  className: 'w-[18px] h-[18px] opacity-75 mr-1'
                })}
              {name}
            </Link>
          )}
        </Typography>
      ))}
    </ul>
  )

  return (
    <MTNavbar color='transparent' className='p-3'>
      {location.pathname !== '/admin' &&
        location.pathname !== '/product' &&
        !location.pathname.includes('/detail') &&
        !location.pathname.includes('/bill') && (
          <>
            <div className='container mx-auto flex items-center justify-between text-white'>
              <Link to='/'>
                <Typography className='mr-4 ml-2 cursor-pointer py-1.5 font-bold'>{brandName}</Typography>
              </Link>

              <div className='hidden lg:flex'>
                {/* {navList} */}
                <Link to='/' className='flex items-center gap-5 p-1 font-bold mr-6'>
                  Home
                </Link>
                {isAuthenticated && <Link to='/profile' className='flex items-center gap-5 p-1 font-bold mr-6'>
                  Profile
                </Link>}
                <Link to='/product' className='flex items-center gap-5 p-1 font-bold mr-6'>
                  Product
                </Link>
                {!isAuthenticated && <Link to='/sign-up' className='flex items-center gap-1 p-1 font-bold mr-6'>
                  Join now
                </Link>}
                {isAuthenticated && (
                  <div onClick={handleLogout} className='flex items-center gap-5 p-1 cursor-pointer font-bold mr-6'>
                    Logout
                  </div>
                )}
              </div>
              <div className='flex gap-8'>
                {isAuthenticated ? (
                  <>
                    <div className='flex gap-4'>
                      <p className='cursor-pointer' onClick={() => setOpenCart(true)}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                          />
                        </svg>
                      </p>
                      <Link to={'/profile'} className='cursor-pointer'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                          />
                        </svg>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className='hidden gap-2 lg:flex'>
                    <a href='/sign-up'>
                      <Button variant='text' size='sm' color='white' fullWidth>
                        Register
                      </Button>
                    </a>
                    {React.cloneElement(action, {
                      className: 'hidden lg:inline-block'
                    })}
                  </div>
                )}
              </div>

              <IconButton
                variant='text'
                size='sm'
                color='white'
                className='ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <XMarkIcon strokeWidth={2} className='h-6 w-6' />
                ) : (
                  <Bars3Icon strokeWidth={2} className='h-6 w-6' />
                )}
              </IconButton>
            </div>
            <MobileNav className='rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900' open={openNav}>
              <div className='container mx-auto'>
                {navList}
                <a href='%' target='_blank' className='mb-2 block'>
                  <Button variant='text' size='sm' fullWidth>
                    pro version
                  </Button>
                </a>
                {React.cloneElement(action, {
                  className: 'w-full block'
                })}
              </div>
            </MobileNav>
          </>
        )}
    </MTNavbar>
  )
}

Navbar.defaultProps = {
  brandName: 'Shop Runner',
  action: (
    <a href='/sign-in'>
      <Button variant='gradient' size='sm' fullWidth>
        Sign-in
      </Button>
    </a>
  )
}

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node
}

Navbar.displayName = '/src/widgets/layout/navbar.jsx'

export default Navbar
