import React from 'react'
import SiderBar from '../../component/SiderBar/SiderBar'
import MessageContainer from '../../component/Messages/MessageContainer'
import useConversation from '../../zustand/useConversation'

const Home = () => {
  const {selectedConversation} =useConversation()
  return (
    <div className='flex flex-col sm:flex-row sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20'>
      {!selectedConversation&&<SiderBar />}
      {selectedConversation&&<MessageContainer />}
    </div>
  )
}

export default Home