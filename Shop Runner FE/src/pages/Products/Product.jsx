import React, { useState, useEffect, useContext } from 'react'
import './assets/style.css'
import http from '@/utils/http'
import { input } from '@material-tailwind/react'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '@/contexts/app.context'
import { url } from '@/constant/constant'
function Product() {
  const [product, setProduct] = useState([])
  const [total, setTotal] = useState(1)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [category, setCategory] = useState([])
  const { openCart, setOpenCart } = useContext(AppContext)
  const [cate,setCate] = useState("Treadmill  ")
  const navigate = useNavigate()
  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchProduct(inputValue)
    }
  }
  useEffect(() => {
    fetchProduct(page)
    fetchCategory()
  }, [page,inputValue, cate])

  const fetchProduct = async ( page = 0) => {
    const response = await http.get(`/product?page=${page}&limit=8&keyword=${inputValue}&category=${cate}`)
    setTotal(response?.data?.totalPages || 1)
    setProduct(response?.data?.productResponses || [])
  }
  const fetchCategory = async () => {
    const response = await http.get(`/categories`)
    setCategory(response?.data || [])
  }
  return (
    <div className='bg-white text-gray-600 work-sans leading-normal text-base tracking-normal'>
      <nav id='header' className='w-full z-30 top-0 py-1'>
        <div className='flex items-center mr-6'>
          <div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3'>
            <label htmlFor='menu-toggle' className='cursor-pointer md:hidden block'>
              <svg
                className='fill-current text-gray-900'
                xmlns='http://www.w3.org/2000/svg'
                width={20}
                height={20}
                viewBox='0 0 20 20'
              >
                <title>menu</title>
                <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
              </svg>
            </label>
            <input className='hidden' type='checkbox' id='menu-toggle' />

            <div className='order-1 md:order-2'>
              <a
                className='flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '
                href='/'
              >
                <svg
                  className='fill-current text-gray-800 mr-2'
                  xmlns='http://www.w3.org/2000/svg'
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                >
                  <path d='M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z' />
                </svg>
                SHOP RUNNER
              </a>
            </div>
          </div>
          <div className='flex gap-4'>
          <>
                    <div className='flex gap-4'>
                      <p className='cursor-pointer' onClick={() => setOpenCart(true)}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-8 h-8'
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
                          className='w-8 h-8' 
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
          </div>
        </div>
      </nav>

      <div className='carousel relative container mx-auto' style={{ maxWidth: 1600 }}>
        <div className='carousel-inner relative overflow-hidden w-full'>
          <input
            className='carousel-open'
            type='radio'
            id='carousel-1'
            name='carousel'
            aria-hidden='true'
            hidden
            defaultChecked='checked'
          />
          <div className='carousel-item absolute opacity-0' style={{ height: '50vh' }}>
            <div
              className='block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right'
              style={{
                backgroundImage:
                  'url("http://localhost:8080/api/v1/product/images/pexels-tree-of-life-seeds-1708680-3640733.jpg")'
              }}
            >
              <div className='container mx-auto'>
                <div className='flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide'>
                  <p className='text-black text-2xl my-4'>Run every day and the picture will zig zag</p>        
                </div>
              </div>
            </div>
          </div>
          <label
            htmlFor='carousel-3'
            className='prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto'
          >
            ‹
          </label>
          <label
            htmlFor='carousel-2'
            className='next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto'
          >
            ›
          </label>
          <input className='carousel-open' type='radio' id='carousel-2' name='carousel' aria-hidden='true' hidden />
          <div className='carousel-item absolute opacity-0 bg-cover bg-right' style={{ height: '50vh' }}>
            <div
              className='block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right'
              style={{
                backgroundImage:
                  'url("http://localhost:8080/api/v1/product/images/pexels-olly-3757957.jpg")'
              }}
            >
              <div className='container mx-auto'>
                <div className='flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide'>
                  <p className='text-black text-2xl my-4'>
                  
Treadmills simplify running.</p>
                  
                </div>
              </div>
            </div>
          </div>
          <label
            htmlFor='carousel-1'
            className='prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto'
          >
            ‹
          </label>
          <label
            htmlFor='carousel-3'
            className='next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto'
          >
            ›
          </label>
          <input className='carousel-open' type='radio' id='carousel-3' name='carousel' aria-hidden='true' hidden />
          <div className='carousel-item absolute opacity-0' style={{ height: '50vh' }}>
            <div
              className='block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-bottom'
              style={{
                backgroundImage:
                  'url("http://localhost:8080/api/v1/product/images/pexels-tima-miroshnichenko-5327545.jpg")'
              }}
            >
              <div className='container mx-auto'>
  <div className='flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide'>
    <p className='text-white text-2xl my-4'>
    The treadmill is perfect for indoor running and walking exercise</p>
  </div>
</div>
            </div>
          </div>
          <label
            htmlFor='carousel-2'
            className='prev control-3 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto'
          >
            ‹
          </label>
          <label
            htmlFor='carousel-1'
            className='next control-3 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto'
          >
            ›
          </label>
          <ol className='carousel-indicators'>
            <li className='inline-block mr-3'>
              <label
                htmlFor='carousel-1'
                className='carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900'
              >
                •
              </label>
            </li>
            <li className='inline-block mr-3'>
              <label
                htmlFor='carousel-2'
                className='carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900'
              >
                •
              </label>
            </li>
            <li className='inline-block mr-3'>
              <label
                htmlFor='carousel-3'
                className='carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900'
              >
                •
              </label>
            </li>
          </ol>
        </div>
      </div>

      <section className='bg-white py-8'>
        <div className='container mx-auto flex items-center flex-wrap pt-4 pb-12'>
          <nav id='store' className='w-full z-30 top-0 px-6 py-1'>
            <div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3'>
              <a
                className='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '
                href='#'
              >
                Store
              </a>
              <div className='flex items-center' id='store-nav-content'>
                <a id='clickable' className='pl-3 inline-block no-underline hover:text-black' href='#'>
                  <svg
                    className='fill-current hover:text-black'
                    xmlns='http://www.w3.org/2000/svg'
                    width={24}
                    height={24}
                    viewBox='0 0 24 24'
                  >
                    <path d='M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z' />
                  </svg>
                </a>
                <Tooltip place='bottom' style={{ borderRadius: '8px' }} anchorSelect='#clickable' clickable>
                  {category.length > 0 &&
                    category.map((item) => (
                      <div onClick={() => {
                        setPage(0)
                        setCate(item?.name)
                      }} className='w-52 py-1 cursor-pointer hover:bg-blue-gray-200 px-1 rounded-md' key={item?.id}>
                        {item?.name}
                      </div>
                    ))}
                </Tooltip>
                {search && (
                  <input
                    className='border ml-10 px-3 py-2  border-cyan-500 rounded-lg'
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder='Search product'
                    type='text'
                  />
                )}
                <a
                  className='pl-3 inline-block no-underline hover:text-black'
                  href='#'
                  onClick={() => setSearch(!search)}
                >
                  <svg
                    className='fill-current hover:text-black'
                    xmlns='http://www.w3.org/2000/svg'
                    width={24}
                    height={24}
                    viewBox='0 0 24 24'
                  >
                    <path d='M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z' />
                  </svg>
                </a>
              </div>
            </div>
          </nav>
          {product.length > 0 &&
            product.map((item) => {
              return (
                <div key={item?.id} className='w-full cursor-pointer md:w-1/3 xl:w-1/4 p-6 flex flex-col'>
                  <div onClick={() => navigate(`/detail/${item?.id}`)}>
                    <img className='hover:grow hover:shadow-lg' src={`${url}${item?.images[0]?.url}`} />
                    <div className='pt-3 flex items-center justify-between'>
                      <p className='pt-1 text-gray-900 font-semibold truncate'>{item?.name}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <p className='pt-1 text-gray-900 font-semibold'>{Math.ceil(item?.sumPrice)}$</p>
                      <p className='pt-1 text-white font-semibold px-2 py-1 rounded-xl text-xs bg-[#ff2c00]'>
                        -{item?.discount}%
                      </p>
                      <p className='pt-1 text-gray-900/40 line-through font-semibold'>{Math.ceil(item?.price)}$</p>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </section>

      <nav aria-label='Page navigation example' className='flex justify-center'>
        <ul class='inline-flex -space-x-px text-base h-10'>
          <li>
            <a
              href='#'
              class='flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-900 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              Previous
            </a>
          </li>
          {Array(+total)
            .fill(0)
            .map((item, index) => (
              <li key={index} onClick={() => setPage(index)}>
                <a
                  href='#'
                  class='flex items-center justify-center px-4 h-10 leading-tight text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  {index + 1}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  )
}

export default Product
