import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'

import { DraftsList } from '~/components/DraftsList'
import { Redirect } from '~/components/Redirect'

const DraftsPage: NextPage = () => {
  const { data, status } = useSession()
  if (status === 'loading') {
    return <div>Loading...</div>
  }
  if (status === 'unauthenticated' || data?.user.role !== 'admin') {
    return <Redirect to="/" />
  }
  return <DraftsList />
}

export default DraftsPage
