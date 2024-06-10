import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import useLogout  from '../../hook/useLogout.js'



const LogoutButton = () => {
  const { loading, logout } = useLogout()
  return (
    <div className='mt-auto mx-4 mb-4' >
      {!loading ? <BiLogOut className='h-6 w-6 text-white cursor-pointer' onClick={logout}/>
        : <span className='loading loading-spinner'></span>}
    </div>
  )
}

export default LogoutButton 	