import { url } from '@/constant/constant'
import { AppContext } from '@/contexts/app.context'
import http from '@/utils/http'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function ProductDetail() {
  const [product, setProduct] = useState([])
  const { profile, setReload } = useContext(AppContext)
  const [colors, setColor] = useState('')
  const [sizes, setSize] = useState('')
  const [images, setImages] = useState([])
  const [imagePrv, setImagePrv] = useState(`${url}${images[0]?.url}`)

  let { id } = useParams()
  useEffect(() => {
    fetchProduct()
  }, [])
  const [value, setValue] = useState(1)
  const fetchProduct = async () => {
    const response = await http.get(`/product/${id}`)
    setImages(response?.data?.images)
    setImagePrv(`${url}${response?.data?.images[0]?.url}`)
    setProduct(response?.data || {})
  }
  async function handleAddCart() {
    const response = await http.post(`/cart`, {
      productId: id,
      quantity: value,
      userId: profile,
      size: sizes,
      color: colors
    })
    setReload(true)
    toast('Add cart success')
  }
  async function handleCheckout() {
    if (+product?.sumPrice === 0) toast.error('Please choose a product')
    const res = await http.get(`/payment/vn-pay?amount=${value * +product?.sumPrice}&backCode=NCB`)
    window.location.href = res?.data?.data?.paymentUrl
  }
  return (
    <div className='bg-white'>
      <div className='pt-6'>
        <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl gap-6 lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          {/* <div className='flex gap-8'> */}
          <div className='hidden lg:flex flex-col justify-center gap-3 col-span-1 '>
            <div className='rounded-lg'>
              <img
               src={imagePrv}
                alt='Model wearing plain black basic tee.'
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div className='grid-cols-4 grid gap-2 justify-center'>
              {images?.slice(0, 4).map((item, i) => (
                <div  onClick={() => setImagePrv(`${url}${item?.url}`)} className='aspect-h-2 aspect-w-3 col-span-1 overflow-hidden rounded-lg'>
                  <img
                    src={`${url}${item?.url}`}
                    alt='Model wearing plain black basic tee.'
                    className='h-full w-full object-cover object-center'
                  />
                </div>
              ))}
            </div>
            <div>
              <h3 className='sr-only'>Description</h3>
              <div className='space-y-6'>
                <p className='text-xl font-bold text-gray-900'>{product?.description} </p>
              </div>
            </div>
          </div>
          <div className='mt-4 lg:row-span-3 col-span-1 lg:mt-0'>
            <h2 className='sr-only'>Product information</h2>
            <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
              <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>{product?.name}</h1>
            </div>
            <p className='text-3xl tracking-tight text-gray-900 mt-4'>{product?.sumPrice}$</p>
            <div className='mt-6'>
              <h3 className='sr-only'>Reviews</h3>
              <div className='flex items-center'>
                <div className='flex items-center'>
                  {/* Active: "text-gray-900", Default: "text-gray-200" */}
                  <svg
                    className='h-5 w-5 flex-shrink-0 text-gray-900'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <svg
                    className='h-5 w-5 flex-shrink-0 text-gray-900'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <svg
                    className='h-5 w-5 flex-shrink-0 text-gray-900'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <svg
                    className='h-5 w-5 flex-shrink-0 text-gray-900'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <svg
                    className='h-5 w-5 flex-shrink-0 text-gray-200'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <p className='sr-only'>4 out of 5 stars</p>
                <a href='#' className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'>
                  {(useMemo(() => Math.floor(Math.random() * 1000) + 1), [])} reviews
                </a>
              </div>
            </div>
            <form className='mt-10'>
              <div>
                <h3 className='text-sm font-medium text-gray-900'>Color</h3>
                <fieldset aria-label='Choose a size' className='mt-4'>
                  <div className='grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4'>
                    {product?.colors?.slice(0, 5).map((color, index) => {
                      if (color?.name === colors)
                        return (
                          <label
                            key={index}
                            className='group relative flex cursor-pointer items-center justify-center rounded-md border bg-gray-900 px-4 py-3 text-sm font-medium uppercase text-white shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 hover:text-gray-900'
                          >
                            <input type='radio' name='size-choice' defaultValue='XS' className='sr-only' />
                            <span>{color?.name}</span>

                            <span className='pointer-events-none absolute -inset-px rounded-md' aria-hidden='true' />
                          </label>
                        )
                      return (
                        <label
                          key={index}
                          onClick={() => setColor(color?.name)}
                          className='group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 hover:text-gray-900'
                        >
                          <input type='radio' name='size-choice' defaultValue='XS' className='sr-only' />
                          <span>{color?.name}</span>

                          <span className='pointer-events-none absolute -inset-px rounded-md' aria-hidden='true' />
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
              </div>
              <div className='mt-10'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-sm font-medium text-gray-900'>Size</h3>
                  <a href='#' className='text-sm font-medium text-indigo-600 hover:text-indigo-500'>
                    Size guide
                  </a>
                </div>
                <fieldset aria-label='Choose a size' className='mt-4'>
                  <div className='grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4'>
                    {product?.sizes?.slice(0, 5).map((color, index) => {
                      if (color?.name === sizes)
                        return (
                          <label
                            key={index}
                            className='group relative flex cursor-pointer items-center justify-center rounded-md border bg-gray-900 px-4 py-3 text-sm font-medium uppercase text-white shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 hover:text-gray-900'
                          >
                            <input type='radio' name='size-choice' defaultValue='XS' className='sr-only' />
                            <span>{color?.name}</span>

                            <span className='pointer-events-none absolute -inset-px rounded-md' aria-hidden='true' />
                          </label>
                        )
                      return (
                        <label
                          onClick={() => setSize(color?.name)}
                          key={index}
                          className='group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 '
                        >
                          <input type='radio' name='size-choice' defaultValue='XS' className='sr-only' />
                          <span>{color?.name}</span>

                          <span className='pointer-events-none absolute -inset-px rounded-md' aria-hidden='true' />
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
              </div>

              <div className='relative flex items-center max-w-[8rem] mt-8'>
                <button
                  type='button'
                  onClick={() => setValue(value - 1)}
                  id='decrement-button'
                  data-input-counter-decrement='quantity-input'
                  className='bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none'
                >
                  <svg
                    className='w-3 h-3 text-gray-900 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 18 2'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M1 1h16'
                    />
                  </svg>
                </button>
                <input
                  type='text'
                  id='quantity-input'
                  data-input-counter
                  aria-describedby='helper-text-explanation'
                  className='bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder={999}
                  value={value}
                />
                <button
                  type='button'
                  onClick={() => setValue(value + 1)}
                  id='increment-button'
                  data-input-counter-increment='quantity-input'
                  className='bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none'
                >
                  <svg
                    className='w-3 h-3 text-gray-900 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 18 18'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 1v16M1 9h16'
                    />
                  </svg>
                </button>
              </div>

              <div className='flex gap-4'>
                <button
                  type='button'
                  className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  onClick={handleCheckout}
                >
                  Buy
                </button>
                <button
                  type='button'
                  onClick={handleAddCart}
                  className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Add to cart
                </button>
              </div>
            </form>
          </div>
          {/* </div> */}
        </div>
        {/* Product info */}
        <div className='col-span-1'>
          <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-4'>
            <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6'>
              {/* Description and details */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
