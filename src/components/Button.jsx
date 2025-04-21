import React from 'react'

function Button({
   children, 
   type= 'button',
   bgColor= 'bg-blue-600',
   textColor = 'text-white',
   className = '',
   ...props
}) {
  return (
    <button className= {`px-4 py-2 rounded-lg hover:bg-blue-500 hover:cursor-pointer hover:shadow-2xl shadow-indigo-700 duration-200 transition-all ease-in-out ${bgColor} ${textColor} ${className}`}
    {...props}>
        {children}
    </button>
  )
}

export default Button