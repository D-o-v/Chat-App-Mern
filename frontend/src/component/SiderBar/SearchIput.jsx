import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useGetCoversation from '../../hook/useGetCoversation';
import useConversation from '../../zustand/useConversation';
import toast from 'react-hot-toast';

const SearchIput = () => {
  const [search, setSearch] = useState('');
  const { conversations } = useGetCoversation()
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      toast.error('Please enter atleast three characters')
    }
    const foundConversation = conversations.find((conversation) => conversation?.fullName.toLowerCase().includes(search.toLowerCase()))
    if (foundConversation) {
      setSelectedConversation(foundConversation)
      setSearch('')
    }else{
      toast.error('No user found with the search name ' + search)
      setSearch('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input
        type="text" placeholder='Search...'
        className='input input-bordered rounded-full'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className='btn btn-circle bg-blue-500 text-white'>

        <IoSearchSharp className='h-6 w-6 outline-none' />
      </button>
    </form>
  )
}

export default SearchIput