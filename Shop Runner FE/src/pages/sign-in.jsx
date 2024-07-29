import { AppContext } from '@/contexts/app.context'
import { setAccessTokenToLS } from '@/utils/auth'
import http from '@/utils/http'
import { Input, Checkbox, Button, Typography } from '@material-tailwind/react'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export function SignIn() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const validateEmail = (input) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(input)
  }
  const handleLogin = async () => {
    let phone
    let email
    if (validateEmail(formData.email)) {
      email = formData.email
    } else {
      phone = formData.email
    }

    const result = await http.post('users/login', { ...formData, email, phone_number: phone })
    setAccessTokenToLS(result.data.token || '')
    setIsAuthenticated(true)
    setProfile(result.data.id)
    localStorage.setItem('profile', JSON.stringify(result.data.id))
    toast('Login success')
    navigate('home')
    window.location.reload();
  }
  return (
    <section className='m-8 flex gap-4'>
      <div className='w-full lg:w-3/5 mt-24'>
        <div className='text-center'>
          <Typography variant='h2' className='font-bold mb-4'>
            Sign In
          </Typography>
          <Typography variant='paragraph' color='blue-gray' className='text-lg font-normal'>
            Enter your email or phone number and password to Sign In.
          </Typography>
        </div>
        <form className='mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2'>
          <div className='mb-1 flex flex-col gap-6'>
            <Input
              size='lg'
              placeholder='email or phone number to log in'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              labelProps={{
                className: 'before:content-none after:content-none'
              }}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              type='password'
              size='lg'
              placeholder='**********'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              labelProps={{
                className: 'before:content-none after:content-none'
              }}
            />
          </div>
          <Button className='mt-6' fullWidth onClick={handleLogin}>
            Sign In
          </Button>
          <div className='flex justify-center mt-6'>
            {' '}
            {/* Added flex justify-center here */}
            <Typography variant='small' className='font-medium text-gray-900'>
              <a href='#' className='flex items-center'>
                Forgot Password?
              </a>
            </Typography>
          </div>
        
          <Typography variant='paragraph' className='text-center text-blue-gray-500 font-medium mt-4'>
            Not registered?
            <Link to='/sign-up' className='text-gray-900 ml-1'>
              Create account
            </Link>
          </Typography>
        </form>
      </div>
      <div className='w-2/5 h-full hidden lg:block'>
        <img src='/img/pattern1.png' className='h-full w-full object-cover rounded-3xl' />
      </div>
    </section>
  )
}

export default SignIn
