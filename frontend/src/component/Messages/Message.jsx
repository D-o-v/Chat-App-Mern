import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation'
import { extractTime } from '../../utils/extractTime'

const Message = ({ message }) => {

  const {authUser} = useAuthContext()
  const {selectedConversation} = useConversation()

  const isMessageFromMe = message.senderId === authUser._id
  const chatClassName = isMessageFromMe ?'chat-end':'chat-start'
  const chatProfilePicture = isMessageFromMe ?authUser?.profilePic:selectedConversation?.profilePic
  const bubbleChatBackground = isMessageFromMe ?'bg-blue-500':''
  const formattedTime =extractTime(message?.createdAt)
  const shakeClass = message.shouldShake? 'shake':''

  // function convertTo12HourFormatWithDate(isoString) {
  //   const date = new Date(isoString);

  //   // Extract date components
  //   const day = date.getUTCDate();
  //   const month = date.getUTCMonth() + 1; // Months are zero-based
  //   const year = date.getUTCFullYear();

  //   // Extract time components
  //   let hours = date.getUTCHours();
  //   const minutes = date.getUTCMinutes();
  //   const ampm = hours >= 12 ? 'PM' : 'AM';
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // the hour '0' should be '12'
  //   const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  //   // Format date and time
  //   const formattedDate = day + '/' + month + '/' + year;
  //   const formattedTime = hours + ':' + minutesStr + ' ' + ampm;

  //   return formattedDate + ' ' + formattedTime;
  // }

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={"https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"}
          // <img src={chatProfilePicture} 
            alt="Tailwind CSS chat bubble component"
          />
        </div>
      </div>
      <div className={`chat-bubble ${ bubbleChatBackground} ${shakeClass} text-white pb-2`}>{message?.message}</div>
      {/* <div className="chat-footer opacity-50 items-center gap-1 flex text-xs">{convertTo12HourFormatWithDate(message?.createdAt)}</div> */}
      <div className="chat-footer opacity-50 items-center gap-1 flex text-xs">{formattedTime}</div>
    </div>
  )
}

export default Message