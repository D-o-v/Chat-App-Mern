import React from 'react'
import SiderBar from '../../component/SiderBar/SiderBar'
import MessageContainer from '../../component/Messages/MessageContainer'

const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <SiderBar />
      <MessageContainer />
    </div>
  )
}

export default Home