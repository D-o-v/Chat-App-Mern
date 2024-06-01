import React from 'react'
import GenderCheckBoxComponent from './GenderCheckBoxComponent'

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className="h-full p-6 w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
                <h1 className='text-3xl font-semibold text-gray-300 text-center'>
                   Sign up
                    <span className='text-blue-500'>My Chat App</span>
                </h1>
                <form >
                    <div>
                        <label className='label px-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                            <input  placeholder='Jane Doe' className='w-full input input-bordered h-10' type='text' />
                    </div>
                    <div>
                        <label className='label px-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                            <input  placeholder='Janedoe' className='w-full input input-bordered h-10' type='text' />
                    </div>
                    <div>
                        <label className='label px-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                            <input placeholder='Enter password' className='w-full input input-bordered h-10' type='password' />
                    </div>
                    <div>
                        <label className='label px-2'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                            <input placeholder='Enter password' className='w-full input input-bordered h-10' type='password' />
                    </div>
                    
                    <GenderCheckBoxComponent/>
                    
                    <a href="#" className='text-sm inline-block mt-2 hover:text-blue-400 hover:underline'>
                        Already have an account?
                    </a>
                    <div>
                        <button className='btn btn-block btn-sm mt-2'>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default SignUp