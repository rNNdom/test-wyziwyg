import React from 'react'
import { twMerge } from 'tailwind-merge'

type CardProps = {
  title?: string
  children: React.ReactNode
  className?: string
}

function Card({ title, children, className }: CardProps) {
  return (
    <div className={twMerge('bg-white shadow-md rounded-lg flex flex-col h-full border border-gray-200', className)}>
      <div className='p-4 flex-grow'>
        <h3 className='font-medium text-lg mb-2 text-center'>{title}</h3>
        {children}
      </div>
    </div>
  )
}

export default Card
