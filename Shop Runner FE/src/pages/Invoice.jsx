import { getRandomFiveDigitNumber } from '@/constant/constant'
import { AppContext } from '@/contexts/app.context'
import http from '@/utils/http'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Invoice() {
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    address: ''
  })
  const [bill, setBill] = useState()
  const {profile} = useContext(AppContext)
  const [data, setData] = useState({})

  let { id } = useParams()
  useEffect(() => {
    fetchProduct()
  }, [])
  const fetchProduct = async () => {
    const response = await http.put('/bill/get-bill', {
      userId: profile,
      billId: id,
      phoneNumber: profile.phoneNumber,
      name: profile.name,
      address: profile.address,
      productIds: JSON.parse(localStorage.getItem('cart'))
    })
    setBill(response.data)
    const response1 = await http.get(`users/get/${profile}`)
    setData(response1?.data)

  }
  console.log(data, 'dât')
  return (
    <div class='bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto'>
      <div class='flex items-center justify-between mb-8'>
        <div class='flex items-center'>
          <img class='h-8 w-8 mr-2' src='https://tailwindflex.com/public/images/logos/favicon-32x32.png' alt='Logo' />
          <div class='text-gray-700 font-semibold text-lg'>SHOP RUNNER</div>
        </div>
        <div class='text-gray-700'>
          <div class='font-bold text-xl mb-2'>INVOICE</div>
          <div class='text-sm'>Date: {new Date().toLocaleDateString()}</div>
          <div class='text-sm'>Invoice #: INV{getRandomFiveDigitNumber()}</div>
        </div>
      </div>
      <div class='border-b-2 border-gray-300 pb-8 mb-8'>
        <h2 class='text-2xl font-bold mb-4'>Bill To:</h2>
        <div class='text-gray-700 mb-2'>
        Name: 
          <input
            type='text'
            id='first_name'
            class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
            placeholder='John Doe'
            required
            name='name'
            disabled
            value={data?.name}
          />
        </div>
        <div class='text-gray-700 mb-2'>
        Phone: 
          <input
            type='text'
            id='first_name'
            class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
            placeholder='John Doe'
            required
            name='name'
            disabled
            value={data?.phoneNumber}
          />
        </div>
        <div class='text-gray-700 mb-2'>
        Email: 
          <input
            type='text'
            id='first_name'
            class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
            placeholder='John Doe'
            required
            name='name'
            disabled
            value={data?.email}
          />
        </div>
        <div class='text-gray-700 mb-2'>
        Amount: 
          <input
            type='text'
            id='first_name'
            class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
            placeholder='John Doe'
            required
            name='name'
            disabled
            value={bill?.amount}
          />
        </div>
        <div class='text-gray-700 mb-2'>
          Code bill
          <input
            type='text'
            id='first_name'
            class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
            placeholder='123 Main St.'
            required
            name='address'
            value={bill?.codeBill}
          />
        </div>
        
      </div>
      

      <div class='flex justify-end mb-8'>
        <Link to={'/product'} class='text-gray-700 mr-2 px-4 py-1 bg-blue-300 rounded-lg text-white'>Continue shopping</Link>
      </div>
    </div>
  )
}

export default Invoice
