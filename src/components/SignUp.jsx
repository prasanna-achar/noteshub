import React, {useState} from 'react'
import {Input, Button, Logo} from './index'
import { login } from '../store/authSlice'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const {register, handleSubmit, formState: {errors}} = useForm()
    
    const create = async(data)=>{
        setError('')
        try {
            const createdUser = await authService.createAccount(data)
            

            if(userData){
                const userData = await authService.getCurrentUser();

                if(userData) {
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
        navigate('/')
    }

  return (
    <div
        className='flex flex-col items-center rounded-lg shadow-2xl shadow-gray-900 justify-center min-w-[60%] pb-10'
        >
            <div className={`mx-auto w-full justify-center`}>
                <span className="inline-block max-w-[100px]">
                    <Logo width="100%" color='text-black'/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>
                Create an Account</h2>
            <p className="mt-2 text-center text-base text-black"> 
                Already have an Account?
                <Link 
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline">
                    Login
                </Link>
    
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    
            <form onSubmit={handleSubmit(create)}
            className='mt-8'>
                <div className='space-y-5'>
                    <Input
                            label="Full Name"
                            type="text"
                            placeholder="Enter Your name"
                            {...register("name", {
                                required: "Name is required"
                            })}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your Email:"
                            {...register('email', {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                                        "Email address must be a valid address"
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter Password"
                            {...register('password', {
                                required: "Password is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^[a-zA-Z0-9]{8,12}$/.test(value) ||
                                        "Password must contain 8 to 12 characters"
                                }
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

                    <Button
                    type='submit'
                    className='w-full bg-blue-500 rounded-lg text-center'
                    >Sign Up</Button>
                </div>
            </form>
        </div>
  )
}

export default SignUp