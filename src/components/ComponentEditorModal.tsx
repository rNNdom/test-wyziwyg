import React from 'react'
import ComponentEditorForm from './ComponentEditorForm'
import Button from './Button'

type ComponentEditorModalProps = {
  isOpen: boolean
  onSave: (html: string) => void
  setOpen: () => void
}

export default function ComponentEditorModal({ isOpen, onSave, setOpen }: ComponentEditorModalProps) {
  if (!isOpen) return null

  return (
    <div className='modal'>
      <div className='modal-content'>
        <Button onClick={setOpen}>Close</Button>
        <ComponentEditorForm onSave={onSave} />
      </div>
    </div>
  )
}
