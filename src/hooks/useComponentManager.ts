import { useState } from 'react'

export function useComponentManager(pageId: string) {
  const [components, setComponents] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const savedComponents = localStorage.getItem(`customComponents_${pageId}`)
      return savedComponents ? JSON.parse(savedComponents) : []
    }
    return []
  })

  const saveComponent = (newComponentHtml: string) => {
    const updatedComponents = [...components, newComponentHtml]
    setComponents(updatedComponents)
    localStorage.setItem(`customComponents_${pageId}`, JSON.stringify(updatedComponents))
  }

  const updateComponents = (newComponents: string[]) => {
    setComponents(newComponents)
    localStorage.setItem(`customComponents_${pageId}`, JSON.stringify(newComponents))
  }

  return {
    components,
    saveComponent,
    updateComponents
  }
}
