import { AppContext } from '@/contexts/app.context'
import { setProfileToLS } from '@/utils/auth'
import http from '@/utils/http'
import { Input, Checkbox, Button, Typography } from '@material-tailwind/react'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone_number: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { setProfile } = useContext(AppContext)

  const isType = () => {
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (formData[key] === '') {
          return false
        }
      }
    }
    return true
  }
  const handleRegister = async () => {
    if (isType()) {
      const result = await http.post('users/register', formData)
      setProfile(result.data)
      setProfileToLS(result.data)
      // navigate('/sign-in')
      window.location.href = 'http://localhost:5173/sign-in'
      toast('Register success')
    }
  }
  return (
    <section className='m-8 flex'>
      <div className='w-2/5 h-full hidden lg:block'>
        <img src='/img/pattern2.png' className='h-full w-full object-cover rounded-3xl' />
      </div>
      <div className='w-full lg:w-3/5 flex flex-col items-center justify-center'>
        <div className='text-center'>
          <Typography variant='h2' className='font-bold mb-4'>
            Join Us Today
          </Typography>
          <Typography variant='paragraph' color='blue-gray' className='text-lg font-normal'>
            Enter your phone number and password to register.
          </Typography>
        </div>
        <form className='mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2'>
          <div className='mb-1 flex flex-col gap-3'>
            <Input
              size='lg'
              placeholder='your name'
              required
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              labelProps={{
                className: 'before:content-none after:content-none'
              }}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              size='lg'
              required
              placeholder='address'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              labelProps={{
                className: 'before:content-none after:content-none'
              }}
            />
            <Input
              size='lg'
              required
              placeholder='phone number'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              labelProps={{
                className: 'before:content-none after:content-none'
              }}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
            />
            <Input
              size='lg'
              required
              placeholder='your123@exam.com'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              labelProps={{
                className: 'before:content-none after:content-none'
              }}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              size='lg'
              required
              type='password'
              placeholder='***********'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              labelProps={{
                className: 'before:content-none after:content-none'
              }}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <Input
              size='lg'
              required
              type='password'
              placeholder='enter the password'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              labelProps={{
                className: 'before:content-none after:content-none'
              }}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>
          <Button className='mt-6' fullWidth onClick={handleRegister}>
            Register Now
          </Button>

          
          <Typography variant='paragraph' className='text-center text-blue-gray-500 font-medium mt-4'>
            Already have an account?
            <Link to='/sign-in' className='text-gray-900 ml-1'>
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  )
}

export default SignUp
