import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('')
    const login = async(data) =>{
        setError('');
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData){
                    dispatch(authLogin(userData))
                }
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }


  return (
    <div
    className='flex flex-col items-center justify-center w-full'
    >
        <div className={`mx-auto w-full justify-center`}>
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" color='text-black'/>
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>
            Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black"> 
            Don&apos;t have any account?&nbsp;
            <Link 
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline">
                Sign Up
            </Link>

        </p>
        {error && <p className="text-xl text-red-600 mt-8 text-center">{errors}</p>}

        <form onSubmit={handleSubmit(login)}
        className='mt-8'>
            <div className='space-y-5'>
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
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}

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
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}

            
                <Button
                type='submit'
                className='w-full text-center'
                >Log In</Button>
            </div>
        </form>
    </div>
  )
}

export default Login