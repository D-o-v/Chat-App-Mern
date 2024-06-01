import React from 'react'
import { IoSearchSharp } from "react-icons/io5";

const SearchIput = () => {
  return (
    <div className='flex items-center gap-2'>
      <input type="text" placeholder='Search...' className='input input-bordered rounded-full' />
      <button type='submit' className='btn btn-circle bg-blue-500 text-white'>

        <IoSearchSharp className='h-6 w-6 outline-none' />
      </button>
    </div>
  )
}

export default SearchIput