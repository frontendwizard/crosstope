/**
 * This file contains the root router of your tRPC-backend
 */
import { t } from '../trpc'
import { healthRouter } from './health'
import { postRouter } from './post'
import { pmhcRouter } from './pmhc'

export const appRouter = t.router({
  post: postRouter,
  health: healthRouter,
  pmhc: pmhcRouter,
})

export type AppRouter = typeof appRouter
