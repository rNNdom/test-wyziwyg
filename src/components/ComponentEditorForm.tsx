'use client'

import React, { useState } from 'react'
import Button from './Button'
import Card from './Card'
import ReactDOMServer from 'react-dom/server'

type ComponentEditorFormProps = {
  onSave: (html: string) => void
}

export default function ComponentEditorForm({ onSave }: ComponentEditorFormProps) {
  const [selectedComponent, setSelectedComponent] = useState('')
  const [color, setColor] = useState('#ff0000')
  const [text, setText] = useState('Texto personalizado')

  // Generate the selected component as static HTML
  const renderComponentToHtml = () => {
    let component
    switch (selectedComponent) {
      case 'button':
        component = (
          <Button
            style={{
              padding: '10px',
              backgroundColor: color
            }}
          >
            {text}
          </Button>
        )
        break
      case 'card':
        component = <Card title={text}>{text}</Card>
        break
      default:
        component = null
    }

    // Convert the React component to HTML
    return ReactDOMServer.renderToStaticMarkup(component)
  }

  const saveComponent = () => {
    const componentHtml = renderComponentToHtml()
    onSave(componentHtml) // Pass the generated HTML back to the parent
  }

  return (
    <div className='component-editor'>
      <select className='border border-gray-300 rounded-md p-2' value={selectedComponent} onChange={(e) => setSelectedComponent(e.target.value)}>
        <option value='button'>Button</option>
        <option value='card'>Card</option>
      </select>
      <input className='border border-gray-300 rounded-md p-2' type='color' value={color} onChange={(e) => setColor(e.target.value)} />
      <input className='border border-gray-300 rounded-md p-2' type='text' value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={saveComponent}>Save Component</Button>
    </div>
  )
}
