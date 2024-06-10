import React from 'react'
import SearchIput from './SearchIput.jsx'
import Conversations from './Conversations.jsx'
import LogoutButton from './LogoutButton.jsx'

const SiderBar = () => {
  return (
    <div className='shadow-xl rounded-sm h-[90vh] shadow-black  flex flex-col py-2 bg-slate-400'>
    {/* <div className='border-r border-slate-500 flex flex-col p-4'> */}
      <SearchIput />
      {/* <div className='divider px-3'></div> */}
      <Conversations />
      <LogoutButton />
    </div>
  )
}

export default SiderBar