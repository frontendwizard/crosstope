/**
 * This file contains the root router of your tRPC-backend
 */
import { router } from '../trpc'
import { immunologicalBackgroundRouter } from './immunologicalBackground'
import { mhcAlleleRouter } from './mhcAllele'
import { pmhcRouter } from './pmhc'
import { structureTypeRouter } from './structureType'

export const appRouter = router({
  pmhc: pmhcRouter,
  mhcAllele: mhcAlleleRouter,
  structureType: structureTypeRouter,
  immunologicalBackground: immunologicalBackgroundRouter,
})

export type AppRouter = typeof appRouter
