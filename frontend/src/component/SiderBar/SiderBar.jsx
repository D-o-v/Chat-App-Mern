import React from 'react'
import SearchIput from './SearchIput.jsx'
import Conversations from './Conversations.jsx'
import LogoutButton from './LogoutButton.jsx'

const SiderBar = () => {
  return (
    <div className='shadow-xl rounded-sm  shadow-black  flex flex-col p-4'>
    {/* <div className='border-r border-slate-500 flex flex-col p-4'> */}
      <SearchIput />
      <div className='divider px-3'></div>
      <Conversations />
      <LogoutButton/>
    </div>
  )
}

export default SiderBar