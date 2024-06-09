import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSockeContext } from '../../context/SockeContext'

const Conversation = ({conversation,emoji,lastIndex}) => {
const {onlineUsers} =useSockeContext()

const isOnline = onlineUsers.includes(conversation._id)
  const {selectedConversation,setSelectedConversation} =useConversation()

  const isSelected = selectedConversation?._id === conversation._id
  return (
    <>
    <div className='divider my-0 px-0 h-1'/>
    <div 
    className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-sky-400' :''}`}
    onClick={()=>setSelectedConversation(conversation)}
    >
      <div className={`avatar ${isOnline?'online':""}`}>
        <div className='w-12 rounded-full'>
          <img
             src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
            // src={conversation?.profilePic}
            alt="user avatar" />
        </div>
      </div>

      <div className='flex flex-col flex-1'>
        <div className='flex gap-3 justify-between'>
          <p className='font-bold text-gray-200'>{conversation?.fullName}</p>
          {/* <span className='text-xl'>{emoji}</span> */}
        </div>
      </div>
    </div>
    {/* {!lastIndex&&<div className='divider my-0 px-0 h-1'/>} */}
    </>
  )
}

export default Conversation