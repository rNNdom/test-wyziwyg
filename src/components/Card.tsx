import React from 'react'
import { twMerge } from 'tailwind-merge'

type CardProps = {
  title?: string
  children: React.ReactNode
  className?: string
}

function Card({ title, children, className }: CardProps) {
  return (
    <div className={twMerge('bg-white shadow-md rounded-lg flex flex-grow p-4 flex-col h-full border border-gray-200', className)}>
      <h3 className='font-medium text-lg mb-2 text-center'>{title}</h3>
      {children}
    </div>
  )
}

export default Card
