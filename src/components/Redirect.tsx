import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const Redirect = ({ to }: { to: string }) => {
  const router = useRouter()

  useEffect(() => {
    router.push(to)
  }, [to])

  return null
}
