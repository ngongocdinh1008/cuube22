import React, { useEffect, useState } from 'react'
import ModalAdd from './ModalAdd'
import Dropdown from './Dropdown'
import ModalEdit from './ModalEdit'
import { Tooltip } from 'react-tooltip'
import http from '@/utils/http'

function Admin() {
  const [showAdd, setShowAdd] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState('')
  const [cate, setCate] = useState('Treadmill')
  const [category, setCategory] = useState([])
  const [total, setTotal] = useState(1)
  const [page, setPage] = useState(0)
  const [product, setProduct] = useState([])

  useEffect(() => {
    fetchProduct()
    fetchCategory()
  }, [keyword, cate, edit, page])
  const fetchCategory = async () => {
    const response = await http.get(`/categories`)
    setCategory(response?.data || [])
  }
  async function fetchProduct() {
    const response = await http.get(`/product?page=${page}&limit=8&keyword=${keyword}&category=${cate}`)
    setTotal(response?.data?.totalPages || 1)
    setProduct(response?.data?.productResponses || [])
  }
  return (
    <div>
      {/* Start block */}
      <section className='bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased'>
        <div className='mx-auto max-w-screen-xl px-4 lg:px-12'>
          {/* Start coding here */}
          <div className='bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden'>
            <div className='flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 p-4'>
              <div className='w-full md:w-1/2'>
                <form className='flex items-center'>
                  <label htmlFor='simple-search' className='sr-only'>
                    Search
                  </label>
                  <div className='relative w-full'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <svg
                        aria-hidden='true'
                        className='w-5 h-5 text-gray-500 dark:text-gray-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <input
                      type='text'
                      id='simple-search'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='Search'
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      required
                    />
                  </div>
                </form>
              </div>
              <a id='category' className='pl-3 inline-block no-underline hover:text-black' href='#'>
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

              <Tooltip place='right-end' style={{ borderRadius: '8px' }} anchorSelect='#category' clickable>
                {category.length > 0 &&
                  category.map((item) => (
                    <div
                      className='w-52 py-1 relative z-10 cursor-pointer hover:bg-blue-gray-200 px-1 rounded-md'
                      key={item?.id}
                      onClick={() => {
                        setPage(0)
                        setCate(item?.name)
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
              </Tooltip>
              <div className='w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 !ml-80 flex-shrink-0'>
                <button
                  type='button'
                  onClick={() => setShowAdd(true)}
                  id='createProductModalButton'
                  className='flex items-center justify-center text-dark bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
                >
                  <svg
                    className='h-3.5 w-3.5 mr-2'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                  >
                    <path
                      clipRule='evenodd'
                      fillRule='evenodd'
                      d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                    />
                  </svg>
                  Add product
                </button>
              </div>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-4 py-4'>
                      Product name
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Category
                    </th>

                    <th scope='col' className='px-4 py-3'>
                      Description
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Price
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Sum Price
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      <span className='sr-only'>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product?.map((product, index) => (
                    <tr className='border-b dark:border-gray-700' key={index}>
                      <th scope='row' className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-dark'>
                        {product?.name}
                      </th>
                      <td className='px-4 py-3'> {product?.category} </td>
                      <td className='px-4 py-3 max-w-[8rem] truncate'>{product?.description}</td>
                      <td className='px-4 py-3'>{product?.price}</td>
                      <td className='px-4 py-3'>{Math.ceil(product?.sumPrice)}</td>
                      <td className='px-4 py-3 flex items-center justify-end'>
                        <a
                          id='clickable'
                          className='inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100'
                          type='button'
                        >
                          <svg
                            className='w-5 h-5'
                            aria-hidden='true'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' />
                          </svg>
                        </a>
                        <Tooltip
                          style={{
                            backgroundColor: 'white'
                          }}
                          anchorSelect='#clickable'
                          clickable
                        >
                          <Dropdown setEdit={setEdit} id={product?.id} setId={setId} fetchProduct={fetchProduct} />
                        </Tooltip>
                        {/* {option && } */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <nav aria-label='Page navigation example' className='flex justify-center mt-10'>
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
                <li key={index} onClick={() => setPage(index + 1)}>
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
      </section>
      {/* End block */}
      {/* Create modal */}
      {showAdd && <ModalAdd setShowAdd={setShowAdd} />}
      {/* Update modal */}
      {edit && <ModalEdit setEdit={setEdit} id={id} />}
    </div>
  )
}

export default Admin
