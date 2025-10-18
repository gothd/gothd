import Image from 'next/image'
import LogoMonograma from '@ruasvivas/assets/images/monograma.png'

export type Props =
  | {
      type: 'wordmark'
    }
  | {
      type: 'monograma'
      width: number
    }

export default function Logo ({ ...props }: Props) {
  const width = props.type === 'monograma' ? props.width || 48 : 48
  return props.type === 'wordmark' ? (
    <div className='font-display text-center font-bold underline-offset-2 underline'>
      <span className='text-primary'>Ruas</span>{' '}
      <span className='text-secondary'>Vivas</span>
    </div>
  ) : (
    <Image src={LogoMonograma} alt='Logo' width={width} />
  )
}
