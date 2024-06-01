import React from 'react'

const Login = () => {
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className="h-full p-6 w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
                <h1 className='text-3xl font-semibold text-gray-300 text-center'>
                    Login
                    <span className='text-blue-500'>My Chat App</span>
                </h1>
                <form >
                    <div>
                        <label className='label px-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                            <input  placeholder='Enter username' className='w-full input input-bordered h-10' type='text' />
                    </div>
                    <div>
                        <label className='label px-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                            <input placeholder='Enter password' className='w-full input input-bordered h-10' type='password' />
                    </div>
                    <a href="#" className='text-sm inline-block mt-2 hover:text-blue-400 hover:underline'>
                        {"Don't"} have an account?
                    </a>
                    <div>
                        <button className='btn btn-block btn-sm mt-2'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login