import { ChakraProvider } from '@chakra-ui/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'

import { CloudinaryProvider } from '~/components/Cloudinary'
import { trpc } from '~/utils/trpc'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <CloudinaryProvider>
        <Component {...pageProps} />
      </CloudinaryProvider>
    </ChakraProvider>
  )
}

export default trpc.withTRPC(MyApp)
