import Card from './Card'

interface CityCardProps {
  name: string
  state: string
  date: string
  image?: React.ReactNode // image element passed from app
  link?: React.ReactNode // link element passed from app
}

export default function CityCard ({
  name,
  state,
  date,
  image,
  link
}: CityCardProps) {
  return (
    <Card>
      {image}
      <div className='p-4 space-y-1'>
        {link ? link : <h2>{name}</h2>}
        <p className='text-sm text-gray-600'>
          {state} — {date}
        </p>
      </div>
    </Card>
  )
}
