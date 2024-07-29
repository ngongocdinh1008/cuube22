import http from '@/utils/http'
import React, { useEffect, useState } from 'react'

function ModalAdd({ setShowAdd }) {
  const [color, setColor] = useState([])
  const [size, setSize] = useState([])
  const [form, setForm] = useState({})
  const [category, setCategory] = useState([])
  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }
  useEffect(() => {
    fetchCategory()
    async function fetchCategory() {
      const response = await http.get(`/categories`)
      setCategory(response?.data || [])
    }
  }, [])

  const handleKeyDown = (event, prop) => {
    if (prop === 'size') {
      if (event.key === 'Enter') {
        const value = event.target.value
        setSize((prev) => [...prev, value])
        event.target.value = ''
        event.preventDefault()
      }
    }
    if (prop === 'color')
      if (event.key === 'Enter') {
        const value = event.target.value
        setColor((prev) => [...prev, value])
        event.target.value = ''
        event.preventDefault()
      }
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    await http.post('product', {
      ...form,
      colors: color,
      sizes: size,
      price: +form.price,
      discount: +form.discount
    })
    setShowAdd(false)
  }
  return (
    <div
      id='createProductModal'
      tabIndex={-1}
      aria-hidden='true'
      className=' overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'
    >
      <div className='relative p-4 w-full max-w-2xl max-h-full'>
        {/* Modal content */}
        <div className='relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
          {/* Modal header */}
          <div className='flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600'>
            <h3 className='text-lg font-semibold text-gray-900 '>Add Product</h3>
            <button
              type='button'
              onClick={() => setShowAdd(false)}
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-dark'
              data-modal-target='createProductModal'
              data-modal-toggle='createProductModal'
            >
              <svg
                aria-hidden='true'
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <form action='#' onSubmit={handleSubmit}>
            <div className='grid gap-4 mb-4 sm:grid-cols-2'>
              <div>
                <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='Type product name'
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor='brand' className='block mb-2 text-sm font-medium text-gray-900 '>
                  Price
                </label>
                <input
                  type='text'
                  name='price'
                  id='brand'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                  placeholder='$1550'
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor='price' className='block mb-2 text-sm font-medium text-gray-900 '>
                  Discount
                </label>
                <input
                  name='discount'
                  id='price'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                  placeholder='15%'
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor='price' className='block mb-2 text-sm font-medium text-gray-900 '>
                  Sizes
                </label>
                <input
                  onKeyDown={(event) => handleKeyDown(event, 'size')}
                  name='price'
                  id='price'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                  placeholder='S'
                />
                <div>
                  <div className='flex text-xs gap-1 mt-2 ml-2 '>
                    {size.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                    <button type='button' onClick={() => setSize([])}>
                      <svg
                        aria-hidden='true'
                        className='w-4 h-4'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor='price' className='block mb-2 text-sm font-medium text-gray-900 '>
                  Colors
                </label>
                <input
                  onKeyDown={(event) => handleKeyDown(event, 'color')}
                  name='price'
                  id='price'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                  placeholder='Red'
                />
                <div className='flex text-xs gap-1 mt-2 ml-2 '>
                  {color.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                  <button type='button'>
                    <svg
                    onClick={() => setColor([])}
                      aria-hidden='true'
                      className='w-4 h-4'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor='category' className='block mb-2 text-sm font-medium text-gray-900 '>
                  Category
                </label>
                <select
                  id='category'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 '
                  name='category_id'
                  onChange={handleChange}
                >
                  <option selected>Select category</option>
                  {category.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='sm:col-span-2'>
                <label htmlFor='description' className='block mb-2 text-sm font-medium text-gray-900 '>
                  Description
                </label>
                <textarea
                  id='description'
                  rows={4}
                  name='description'
                  className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 '
                  placeholder='Write product description here'
                  defaultValue={''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type='submit'
              className='text-dark inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
              <svg
                className='mr-1 -ml-1 w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                  clipRule='evenodd'
                />
              </svg>
              Add new product
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ModalAdd
