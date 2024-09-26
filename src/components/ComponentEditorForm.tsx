'use client'
import React, { useState } from 'react'
import Button from './Button'
import Card from './Card'
import ReactDOMServer from 'react-dom/server'

function Component() {
  const [selectedComponent, setSelectedComponent] = useState('')
  const [color, setColor] = useState('#ff0000')
  const [text, setText] = useState('Texto personalizado')

  // Manejadores de cambio
  const handleComponentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponent(event.target.value)
  }

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value)
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  // Function to render the selected component into HTML
  const renderComponentToHtml = () => {
    const componentToRender = renderComponent() // Render the component using the current state
    return ReactDOMServer.renderToStaticMarkup(componentToRender) // Convert it to HTML
  }

  // Save the component as HTML in JSON
  const saveComponent = async () => {
    const componentHtml = renderComponentToHtml()

    const componentData = {
      html: componentHtml // Save the entire rendered HTML
    }
    console.log(componentData)
  }

  // Renderizar el componente basado en la selección del dropdown
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'button':
        return (
          <Button
            style={{
              padding: '10px',
              backgroundColor: color
            }}
          >
            {text}
          </Button>
        )
      case 'card':
        return <Card title={text}>{text}</Card>
      default:
        return null
    }
  }

  return (
    <div className='w-full max flex flex-col p-2 gap-2'>
      <div className='flex flex-col gap-2'>
        <label>Selecciona el componente: </label>
        <select className='border border-gray-300 rounded-md p-2' value={selectedComponent} onChange={handleComponentChange}>
          <option value='button'>Botón</option>
          <option value='card'>Card</option>
        </select>
      </div>
      <InputForm name='Color' type='color' value={color} onChange={handleColorChange} />
      <InputForm name='Texto' value={text} onChange={handleTextChange} />
      <div className='my-8 gap-2 flex flex-col'>
        <p>Previsualización:</p>
        <Card className='p-2 flex items-center justify-center border-gray-300'>{renderComponent()}</Card>
      </div>

      <Button className='mt-4 flex justify-center' onClick={saveComponent}>
        Guardar Componente
      </Button>
    </div>
  )
}

type InputFormProps = {
  name: string
} & React.HTMLProps<HTMLInputElement>
const InputForm = ({ name, ...props }: InputFormProps) => {
  return (
    <label className='flex flex-col gap-2'>
      <p>{name}: </p>
      <input type='text' name='name' className='border border-gray-400 rounded-md p-1' {...props} />
    </label>
  )
}

export default Component
