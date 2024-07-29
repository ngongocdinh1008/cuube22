'use client'

import { useContext, useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { AppContext } from '@/contexts/app.context'
import http from '@/utils/http'
import { url } from '@/constant/constant'
import { toast } from 'react-toastify'
import { redirect, useNavigate } from 'react-router-dom'

export default function ShopingCart() {
  const {
    openCart: open,
    setOpenCart: setOpen,
    profile,
    reload,
    setCart,
    cart,
    setPrice: setTotal
  } = useContext(AppContext)
  const [dataCart, setDataCart] = useState([])
  const [form, setForm] = useState([])
  const [price, setPrice] = useState(0)
  const [images, setImages] = useState([])
  async function fetchImage() {
    const data = await http.get(`/cart/get-items/${profile}`)
    setDataCart(data?.data?.itemsResponses || [])
    let dataImg = data?.data?.itemsResponses?.map((item) => item.images[0])
    setImages(dataImg || [])
  }
  const navigate = useNavigate()
  //devops
  useEffect(() => {
    fetchImage()
  }, [profile, reload])
  async function handlePrice(event, quantity = 0, price = 1, product) {
    if (event.target.checked) {
      let arr = [...cart]
      if (!arr.includes(product)) arr.push(product)
      setCart(arr)
      setPrice((prev) => prev + +quantity * +price)
      localStorage.setItem('cart', JSON.stringify(arr))
      localStorage.setItem('price', JSON.stringify(price + +quantity * +price))
    } else {
      let arr = [...cart]
      if (arr.includes(product)) arr.splice(arr.indexOf(product), 1)
      setCart(arr)
      setPrice((prev) => prev - +quantity * +price)
      localStorage.setItem('price', JSON.stringify(price - +quantity * +price))
      localStorage.setItem('cart', JSON.stringify(arr))
    }
  }
  console.log(cart, 'cart')
  async function handleCheckout() {
    if (price === 0) toast.error('Please choose a product')
    const res = await http.get(`/payment/vn-pay?amount=${price}&backCode=NCB`)
    // navigate(res?.data?.data?.paymentUrl || '')
    // console.log()
    window.location.href = res?.data?.data?.paymentUrl
  }
  return (
    <Dialog open={open} onClose={setOpen} className='relative z-40'>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0'
      />

      <div className='fixed inset-0 overflow-hidden'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
            <DialogPanel
              transition
              className='pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700'
            >
              <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                <div className='flex-1 overflow-y-auto px-10 py-6 sm:px-6'>
                  <div className='flex items-start justify-between'>
                    <DialogTitle className='text-lg font-medium text-gray-900'>Shopping cart</DialogTitle>
                    <div className='ml-3 flex h-7 items-center'>
                      <button
                        type='button'
                        onClick={() => setOpen(false)}
                        className='relative -m-2 p-2 text-gray-400 hover:text-gray-500'
                      >
                        <span className='absolute -inset-0.5' />
                        <span className='sr-only'>Close panel</span>
                        <XMarkIcon aria-hidden='true' className='h-6 w-6' />
                      </button>
                    </div>
                  </div>

                  <div className='mt-8'>
                    <div className='flow-root'>
                      <ul role='list' className='-my-6 divide-y divide-gray-200'>
                        {dataCart.map((product) => (
                          <li key={product.id} className='flex py-6'>
                            <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                              <img
                                alt={product.imageAlt}
                                src={`${url}${product?.images[0]?.url}`}
                                className='h-full w-full object-cover object-center'
                              />
                            </div>

                            <div className='ml-4 flex justify-between relative'>
                              <div>
                                <div className='flex justify-between text-base font-medium text-gray-900'>
                                  <h3>
                                    <a href={product.href}>{product.name}</a>
                                  </h3>
                                  <p className='ml-4'>{product.price}</p>
                                </div>
                                <p className='mt-1 text-sm text-gray-900'>{product?.product?.name}</p>
                                <p className='mt-1 text-sm text-gray-900'>Color: {product.color}</p>
                                <p className='mt-1 text-sm text-gray-900'>Size: {product.size}</p>
                                <p className='mt-1 text-sm text-gray-900'>Quantity: {product.quantity}</p>
                                <p className='mt-1 text-sm text-gray-900'>
                                  Price: ${Math.ceil(product?.product?.sumPrice)}
                                </p>
                              </div>
                              <div className='flex flex-1 items-end justify-between text-sm'>
                                <div className='flex'>
                                  <button
                                    type='button'
                                    onClick={async () => {
                                      await http.delete(`/cart/remove-all/${product.id}`)
                                      fetchImage()
                                    }}
                                    className='font-medium text-indigo-600 hover:text-indigo-500'
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                              <input
                                id='bordered-checkbox-2'
                                type='checkbox'
                                value=''
                                onChange={(e) =>
                                  handlePrice(e, product.quantity, Math.ceil(product?.product?.sumPrice), product.id)
                                }
                                name='bordered-checkbox'
                                class='w-4 absolute top-0 rounded-xl right-0 h-4 text-orange-300 bg-orange-300 border-gray-300  '
                              ></input>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                  <div className='flex justify-between text-base font-medium text-gray-900'>
                    <p>Subtotal</p>
                    <p>${price}</p>
                  </div>
                  <p className='mt-0.5 text-sm text-gray-500'>Shipping and taxes calculated at checkout.</p>
                  <div className='mt-6' onClick={() => handleCheckout()}>
                    <a
                      href='#'
                      className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                    >
                      Buy
                    </a>
                  </div>
                  <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                    <p>
                      or{' '}
                      <button
                        type='button'
                        onClick={() => setOpen(false)}
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                      >
                        Continue Shopping
                        <span aria-hidden='true'> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
