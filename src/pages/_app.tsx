import { ChakraProvider } from '@chakra-ui/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppType } from 'next/app'
import type { Session } from 'next-auth'
import { getSession, SessionProvider } from 'next-auth/react'

import { CloudinaryProvider } from '~/components/Cloudinary'
import { trpc } from '~/utils/trpc'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <CloudinaryProvider>
          <Component {...pageProps} />
        </CloudinaryProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    session: await getSession(ctx),
  }
}

export default trpc.withTRPC(MyApp)
