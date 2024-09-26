import Card from '@/components/Card'
import ComponentEditorForm from '@/components/ComponentEditorForm'
import RenderHTML from '@/components/RenderHTML'
import { TableDemo } from '@/components/TableTest'

export default function Home() {
  return (
    <div className='flex items-center gap-10 h-[100vh]'>
      <Card title='Main Page' className='w-5/6 h-5/6'>
        <RenderHTML pageName='mainpage' />
        <TableDemo />
      </Card>
      <Card title='Editor de Componentes' className='w-2/5 h-5/6'>
        <ComponentEditorForm />
      </Card>
    </div>
  )
}
