import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import http from '@/utils/http'

function User() {
  const [showAdd, setShowAdd] = useState(false)
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState('')
  const [total, setTotal] = useState(1)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState(false)
  const [product, setProduct] = useState([])
  const [keyword, setKeyword] = useState('')
  useEffect(() => {
    fetchCategory()
  }, [page, keyword])
  async function fetchCategory() {
    const response = await http.get(`/users?page=${page}&limit=10&keyword=${keyword}`)
    setTotal(response?.data?.totalPages || 1)
    setProduct(response?.data?.userResponses || [])
  }
  async function handleDelete(id) {
    await http.post(`/users/block/${id}`)
    fetchCategory()
  }
  return (
    <div>
      {/* Start block */}
      <section className='bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased'>
        <div className='mx-auto max-w-screen-xl px-4 lg:px-12'>
          {/* Start coding here */}
          <div className='bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden'>
            <div className='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4'>
              <div className='w-full flex justify-center '>
                <form className='flex items-center justify-center'>
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
                      onChange={(e) => setKeyword(e.target.value)}
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-4 py-4'>
                      User name
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Email
                    </th>

                    <th scope='col' className='px-4 py-3'>
                      Phone number
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Role
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      <span className='sr-only'>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product?.map((product, index) => {
                    if (product?.role === 'ADMIN') return null
                    return (
                      <tr className='border-b dark:border-gray-700' key={index}>
                        <th
                          scope='row'
                          className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-dark'
                        >
                          {product?.name}
                        </th>
                        <td className='px-4 py-3'> {product?.email} </td>
                        <td className='px-4 py-3 max-w-[12rem] truncate'>{product?.phoneNumber}</td>
                        <td className='px-4 py-3'>{product?.role}</td>
                        <td className='px-4 py-3 flex items-center justify-end'>
                          <button
                            type='button'
                            data-modal-target='deleteModal'
                            data-modal-toggle='deleteModal'
                            className='flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600  dark:hover:text-red-400'
                            onClick={() => handleDelete(product?.id)}
                          >
                            {product?.active ? (
                              <p className='text-green-300'>Active</p>
                            ) : (
                              <p className='text-red-500'>Inactive</p>
                            )}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
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

export default User
