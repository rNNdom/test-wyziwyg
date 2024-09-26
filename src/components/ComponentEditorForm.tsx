'use client'

import React, { useState } from 'react'
import Button from './Button'
import Card from './Card'
import ReactDOMServer from 'react-dom/server'

type ComponentEditorFormProps = {
  onSave: (html: string) => void
  setOpen: () => void
}

export default function ComponentEditorForm({ onSave, setOpen }: ComponentEditorFormProps) {
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
    <Card className='component-editor flex w-1/2 mx-auto flex-col bg-gray-100 border-gray-300 gap-2'>
      <div className='flex flex-col gap-2 w-2/3 mx-auto '>
        <span className='flex flex-col gap-2'>
          <p>Seleccione el componente:</p>
          <select className='border border-gray-300 rounded-md p-2' value={selectedComponent} onChange={(e) => setSelectedComponent(e.target.value)}>
            <option value='button'>Button</option>
            <option value='card'>Card</option>
          </select>
        </span>

        <InputForm name='Color' type='color' value={color} onChange={(e) => setColor(e.target.value)} />
        <InputForm name='Text' value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className='flex flex-col gap-2 w-2/3 mx-auto border rounded-sm border-gray-300 p-2 bg-white'>
        <p>Previsualización:</p>
        <div className='flex justify-center' dangerouslySetInnerHTML={{ __html: renderComponentToHtml() }} />
      </div>
      <span className='flex flex-row gap-2 mx-auto w-2/3 justify-center'>
        <Button onClick={setOpen}>Close</Button>
        <Button onClick={saveComponent}>Save Component</Button>
      </span>
    </Card>
  )
}

type InputFormProps = {
  name: string
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
const InputForm = ({ name, ...props }: InputFormProps) => {
  return (
    <label className='flex flex-col gap-2 '>
      <p>{name}: </p>
      <input type='text' name='name' className='border border-gray-400 rounded-md p-1 ' {...props} />
    </label>
  )
}
