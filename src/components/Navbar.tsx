import { navigationBar } from '@/navigation'
import Link from 'next/link'
import React from 'react'
function Navbar() {
  return (
    <nav className='sticky z-10 top-0 border-b bg-white/30 backdrop-blur-md'>
      <div id='nav-container' className='max-w-5xl mx-auto px-4 sm:px-4 flex justify-between items-center py-4'>
        <Link href='/' className=''>
          <h4 className='text-2xl font-bold'>Inicio</h4>
        </Link>
        <ul className='flex flex-row gap-5'>
          {navigationBar.map((item) => {
            return (
              <li key={item.title}>
                <Link href={item.path} className='rounded-md bg-black text-white py-2 px-4 flex m-2 font-medium'>
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
