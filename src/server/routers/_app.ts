/**
 * This file contains the root router of your tRPC-backend
 */
import { router } from '../trpc'
import { pmhcRouter } from './pmhc'
import { mhcAlleleRouter } from './mhcAllele'
import { structureTypeRouter } from './structureType'
import { immunologicalBackgroundRouter } from './immunologicalBackground'

export const appRouter = router({
  pmhc: pmhcRouter,
  mhcAllele: mhcAlleleRouter,
  structureType: structureTypeRouter,
  immunologicalBackground: immunologicalBackgroundRouter,
})

export type AppRouter = typeof appRouter
