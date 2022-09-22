/**
 * This file contains the root router of your tRPC-backend
 */
import { t } from '../trpc'
import { postRouter } from './post'
import { pmhcRouter } from './pmhc'
import { mhcAlleleRouter } from './mhcAllele'
import { structureTypeRouter } from './structureType'
import { immunologicalBackgroundRouter } from './immunologicalBackground'

export const appRouter = t.router({
  post: postRouter,
  pmhc: pmhcRouter,
  mhcAllele: mhcAlleleRouter,
  structureType: structureTypeRouter,
  immunologicalBackground: immunologicalBackgroundRouter,
})

export type AppRouter = typeof appRouter
