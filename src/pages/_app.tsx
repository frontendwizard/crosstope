import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
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
