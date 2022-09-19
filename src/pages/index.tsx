import { trpc } from '../utils/trpc'
import { NextPageWithLayout } from './_app'

const IndexPage: NextPageWithLayout = () => {
  const pmhcQuery = trpc.pmhc.search.useQuery({ sequence: 'CING' })

  return (
    <>
      <h1>Lista de resultados</h1>
      <ul>
        {pmhcQuery.data?.items.map((pmhc) => (
          <li key={pmhc.complex_code}>{pmhc.sequence}</li>
        ))}
      </ul>
    </>
  )
}

export default IndexPage
