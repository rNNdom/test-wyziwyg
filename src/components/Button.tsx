import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  className?: string
}

function Button({ children, className = '', style, ...rest }: ButtonProps) {
  return (
    <button className={`rounded-md bg-black text-white py-2 px-4 flex m-2 font-semibold ${className}`} style={style} {...rest}>
      {children}
    </button>
  )
}

export default Button
