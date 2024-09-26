'use client'
import { useEffect, useState } from 'react'

export default function RenderHTML({ pageName }: { pageName: string }) {
  const [customComponentHtml, setCustomComponentHtml] = useState('')

  const fetchComponent = async () => {
    const res = await fetch(`http://localhost:3001/api/components/${pageName}`)
    const data = await res.json()
    setCustomComponentHtml(data)
    return data
  }

  useEffect(() => {
    fetchComponent()
  }, [])

  return (
    <div className='page'>
      <div dangerouslySetInnerHTML={{ __html: customComponentHtml || 'No custom component yet' }} />
    </div>
  )
}
