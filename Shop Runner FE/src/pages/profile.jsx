import { Avatar, Typography, Button } from '@material-tailwind/react'
import { MapPinIcon, BriefcaseIcon, BuildingLibraryIcon } from '@heroicons/react/24/solid'
import { Footer } from '@/widgets/layout'
import http from '@/utils/http'
import { AppContext } from '@/contexts/app.context'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function Profile() {
  const { profile } = useContext(AppContext)
  const [data, setData] = useState({})
  useEffect(() => {
    getProfile()
  }, [])
  async function getProfile() {
    const response = await http.get(`users/get/${profile}`)
    setData(response?.data)
  }
  return (
    <>
      <section className='relative block h-[50vh]'>
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className='absolute top-0 h-full w-full bg-black/60 bg-cover bg-center' />
      </section>
      <section className='relative bg-white py-16'>
        <div className='relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white'>
          <div className='container mx-auto'>
            <div className='flex flex-col lg:flex-row justify-between'>
              <div className='relative flex gap-6 items-start'>
                <div className='-mt-20 w-40'>
                  <Avatar src='/img/team-5.png' alt='Profile picture' variant='circular' className='h-full w-full' />
                </div>
                <div className='flex flex-col mt-2'>
                  <Typography variant='h4' color='blue-gray'>
                    {data.name}
                  </Typography>
                  <Typography variant='paragraph' color='gray' className='!mt-0 font-normal'>
                    {data.email}
                  </Typography>
                  {/* <Typography variant='paragraph' color='gray' className='!mt-0 font-normal'>
                    {data.phoneNumber}
                  </Typography> */}
                </div>
              </div>

              <div className='mt-10 mb-10 flex lg:flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5'>
                {data.role === 'ADMIN' && (
                  <div className='flex gap-4'>
                    <Link to={'/admin/user'}>
                      <Button className='bg-gray-900 w-fit lg:ml-auto'>Admin User</Button>
                    </Link>
                    <Link to={'/admin'}>
                      <Button className='bg-gray-900 w-fit lg:ml-auto'>Admin Product</Button>
                    </Link>
                  </div>
                )}
                <div className='flex justify-start py-4 pt-8 lg:pt-4'>
                  <div className='mr-4 p-3 text-center'>
                    <Typography variant='lead' color='blue-gray' className='font-bold uppercase'>
                      22
                    </Typography>
                    <Typography variant='small' className='font-normal text-blue-gray-500'>
                      Friends
                    </Typography>
                  </div>
                  <div className='mr-4 p-3 text-center'>
                    <Typography variant='lead' color='blue-gray' className='font-bold uppercase'>
                      10
                    </Typography>
                    <Typography variant='small' className='font-normal text-blue-gray-500'>
                      Photos
                    </Typography>
                  </div>
                  <div className='p-3 text-center lg:mr-4'>
                    <Typography variant='lead' color='blue-gray' className='font-bold uppercase'>
                      89
                    </Typography>
                    <Typography variant='small' className='font-normal text-blue-gray-500'>
                      Comments
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className='mb-10 py-6'>
              <div className='flex w-full flex-col items-start lg:w-1/2'>
                <Typography className='mb-6 font-normal text-blue-gray-500'>
                Welcome to our shop! Based in Melbourne and Brooklyn, 
                we offer a wide range of products designed to meet all your needs
                . Every item is carefully selected and crafted to ensure the highest quality and satisfaction. Explore our collection and find the perfect piece to add a touch of warmth and style to your life.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='bg-white'>
        <Footer />
      </div>
    </>
  )
}

export default Profile
