import React from 'react'

function Button({children, type = 'button', bgColor= 'bg-blue', textColor= 'text-white', className='', ...props}) {
  return (
    <button type={type} className={`px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 ${bgColor} ${textColor} ${className} `} {...props} >
        {children}
    </button>
  )
}

export default Button