import React , {useState, useEffect}from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AuthLayout({children, authentication = true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(()=>{

        if(authStatus === false){
            navigate('/login')
        }
        function setLoaderDelay(){
            setLoader(false)
        }
        setTimeout(setLoaderDelay, 3000)
    }, [authStatus,navigate, authentication ])

  return( 
    <div className='h-full'>
        {loader?
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div> : 
        (
        <>{children}</>
    )
    }
    </div>
  )
}

