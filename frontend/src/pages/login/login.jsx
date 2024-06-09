import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hook/useLogin'
const Login = () => {
    const {loading,login} =useLogin()
    const [username,setUsername] =useState('')
    const [password,setPassword] =useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        await login({username,password})
    }
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto bg-slate-400 rounded-md'>
            <div className="h-full p-6 w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
                <h1 className='text-3xl font-semibold text-gray-300 text-center '>
                    Login
                    <span className='text-blue-500 ms-10'>My Chat App</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label px-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                            <input  
                            placeholder='Enter username' 
                            className='w-full input input-bordered h-10' 
                            type='text' 
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            />
                    </div>
                    <div>
                        <label className='label px-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                            <input 
                            placeholder='Enter password' 
                            className='w-full input input-bordered h-10' 
                            type='password' 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                    </div>
                    <Link to="/signup" className='text-sm inline-block mt-2 hover:text-blue-400 hover:underline'>
                        {"Don't"} have an account?
                    </Link>
                    <div>
                    <button 
                        className='btn btn-block btn-sm mt-2'
                        disabled={loading ||!username||!password}>
                            {!loading ?'Login':<span className='loading loading-spinner'></span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login