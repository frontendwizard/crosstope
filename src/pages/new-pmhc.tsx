import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'

import { PmhcForm } from '~/components/PmhcForm'
import { Redirect } from '~/components/Redirect'

const NewPmhcPage: NextPage = () => {
  const { status } = useSession()
  if (status === 'loading') {
    return <div>Loading...</div>
  }
  if (status === 'unauthenticated') {
    return <Redirect to="/" />
  }
  return <PmhcForm />
}

export default NewPmhcPage
