'use client'
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import { useComponentManager } from '../hooks/useComponentManager'
import Card from './Card'
import ComponentEditorModal from './ComponentEditorModal'
import Button from './Button'

type ComponentManagerProps = {
  pageId: string
}

export default function ComponentManager({ pageId }: ComponentManagerProps) {
  const { components, saveComponent, updateComponents } = useComponentManager(pageId)
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  // Handle drag and drop reorder
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = components.findIndex((_, index) => `component-${index}` === active.id)
      const newIndex = components.findIndex((_, index) => `component-${index}` === over.id)

      // Reorder components array
      const reorderedComponents = arrayMove(components, oldIndex, newIndex)

      // Update the components array and persist the new order
      updateComponents(reorderedComponents)
    }
  }

  return (
    <div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={components.map((_, index) => `component-${index}`)} strategy={verticalListSortingStrategy}>
          {components.map((html, index) => (
            <SortableComponent key={`component-${index}`} id={`component-${index}`} html={html} />
          ))}
        </SortableContext>
      </DndContext>

      {/* Button to open the editor */}
      <span className='flex justify-center'>
        <Button onClick={() => setIsEditorOpen(true)}>Add New Component</Button>
      </span>
      {/* Modal for editing components */}
      <ComponentEditorModal
        isOpen={isEditorOpen}
        onSave={(html) => {
          saveComponent(html)
          setIsEditorOpen(false)
        }}
        setOpen={() => setIsEditorOpen(!isEditorOpen)}
      />
    </div>
  )
}

type SortableComponentProps = {
  id: string
  html: string
}
function SortableComponent({ id, html }: SortableComponentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    padding: 16,
    margin: '0 0 8px 0',
    backgroundColor: '#ffffff',
    opacity: isDragging ? 0.3 : 1 // Optional: Reduce opacity when dragging
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card title={`Custom Component`}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Card>
    </div>
  )
}
