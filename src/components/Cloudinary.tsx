import { Cloudinary } from '@cloudinary/url-gen'
import { createContext, useContext } from 'react'

const CloudinaryContext = createContext<Cloudinary | null>(null)

export function CloudinaryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'frontendwizard',
    },
  })
  return (
    <CloudinaryContext.Provider value={cloudinary}>
      {children}
    </CloudinaryContext.Provider>
  )
}

export function useCloudinary() {
  const cloudinary = useContext(CloudinaryContext)
  if (!cloudinary) {
    throw new Error('Cloudinary context not found')
  }
  return cloudinary
}
