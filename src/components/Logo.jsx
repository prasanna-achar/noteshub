import React from 'react'

function Logo({width='100px', 
  color= 'text-white'
}) {
  return (
    <div className='flex items-center'>
      <img src="/NotespringLogo.png" alt=""  width={width}/>
      <h1 className='inline'><span className={`text-2xl ${color}`}>Notes Hub</span></h1>

    </div>
  )
}

export default Logo