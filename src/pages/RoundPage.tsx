import { useParams } from 'react-router-dom'

import { RoundView } from '../components'

export default function RoundPage() {
  const { id } = useParams<{ id: string }>()

  return <RoundView roundId={id} />
}
