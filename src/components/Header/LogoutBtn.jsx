import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () =>{
        authService.logout()
        .then(() => {
            dispatch(logout())
        });
    }

  return (
    <button 
    onClick={logoutHandler}
    className='inline-block px-6 py-2 duration-200 rounded-full'>
        <span className='shadow-2xl hover:shadow-blue-200 '>Logout</span>
    </button>
  )
}

export default LogoutBtn