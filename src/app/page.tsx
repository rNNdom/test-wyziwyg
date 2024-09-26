import Card from '@/components/Card'
import ComponentManager from '@/components/ComponentManager'
import { TableDemo } from '@/components/TableTest'

export default function HomePage() {
  return (
    <div className='flex flex-col gap-10'>
      <h1 className='font-bold text-2xl'>Main Page</h1>
      <Card>
        <TableDemo />
      </Card>
      <ComponentManager pageId='home' />
    </div>
  )
}
