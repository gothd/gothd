interface TimelineItemProps {
  title: string
  date: string
  summary: string
  link?: React.ReactNode
}

export default function TimelineItem ({
  title,
  date,
  summary,
  link
}: TimelineItemProps) {
  return (
    <div className='border-l-4 border-ruas-verde pl-4 space-y-1'>
      {link ? link : <h2>{title}</h2>}
      <p className='text-sm text-gray-600'>{date}</p>
      <p>{summary}</p>
    </div>
  )
}
