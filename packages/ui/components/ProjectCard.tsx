import Card from './Card'

interface ProjectCardProps {
  title: string
  description: string
  image?: React.ReactNode
  link?: React.ReactNode
}

export default function ProjectCard ({
  title,
  description,
  image,
  link
}: ProjectCardProps) {
  return (
    <Card>
      {image}
      <div className='p-4 space-y-1'>
        {link ? link : <h2>{title}</h2>}
        <p className='text-sm text-gray-600'>{description}</p>
      </div>
    </Card>
  )
}
