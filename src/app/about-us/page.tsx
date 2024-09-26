import ComponentManager from '@/components/ComponentManager'

export default function AboutPage() {
  return (
    <div>
      <h1 className='font-bold text-2xl'>About us</h1>

      <ComponentManager pageId='about' />
    </div>
  )
}
