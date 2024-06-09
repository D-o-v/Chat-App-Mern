import React, { useState } from 'react'
import GenderCheckBoxComponent from './GenderCheckBoxComponent'
import { Link } from 'react-router-dom'
import useSignup from '../../hook/useSignup'

const SignUp = () => {
    const {loading, signup } = useSignup()
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
    })

    const handleGenderChange = (gender) => {
        setInputs({ ...inputs, gender: gender })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(inputs)
    }
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto  bg-slate-400 rounded-md'>
            <div className="h-full p-6 w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
                <h1 className='text-3xl font-semibold text-gray-300 text-center'>
                    Sign up
                    <span className='text-blue-500 ms-10'>My Chat App</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label px-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input
                            placeholder='Jane Doe'
                            className='w-full input input-bordered h-10'
                            type='text'
                            value={inputs?.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className='label px-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            placeholder='Janedoe'
                            className='w-full input input-bordered h-10'
                            type='text'
                            value={inputs?.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
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
                            value={inputs?.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className='label px-2'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input
                            placeholder='Enter password'
                            className='w-full input input-bordered h-10'
                            type='password'
                            value={inputs?.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>

                    <GenderCheckBoxComponent onCheckBoxChange={handleGenderChange} selectedGender={inputs.gender} />

                    <Link to="/login" className='text-sm inline-block mt-2 hover:text-blue-400 hover:underline'>
                        Already have an account?
                    </Link>
                    <div>
                        <button 
                        className='btn btn-block btn-sm mt-2'
                        disabled={loading}>
                            {!loading ?'Sign Up':<span className='loading loading-spinner'></span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp