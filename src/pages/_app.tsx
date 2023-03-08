import { ChakraProvider } from '@chakra-ui/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'

import { trpc } from '~/utils/trpc'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default trpc.withTRPC(MyApp)
