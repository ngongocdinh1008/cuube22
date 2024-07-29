import http from '@/utils/http'
import React, { useEffect } from 'react'

function Dropdown({ setEdit, id, setId, fetchProduct }) {
  async function handleDelete() {
    await http.delete(`product/${id}`)
    fetchProduct()
  }

  return (
    <div
      id='apple-imac-27-dropdown'
      className=' z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
    >
      <ul className='py-1 text-sm' aria-labelledby='apple-imac-27-dropdown-button'>
        <li>
          <button
            type='button'
            onClick={() => {
              setEdit(true)
              setId(id)
            }}
            className='flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-dark text-gray-700 dark:text-gray-200'
          >
            <svg
              className='w-4 h-4 mr-2'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
              />
            </svg>
            Edit
          </button>
        </li>
        <li>
          <button
            type='button'
            onClick={() => {
              handleDelete()
            }}
            className='flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-dark text-gray-700 dark:text-gray-200'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4 mr-2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
              />
            </svg>
            Delete
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Dropdown
