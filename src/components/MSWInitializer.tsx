'use client'
import { useEffect } from 'react'

export function MSWInitializer() {
  useEffect(() => {
    async function initMSW() {
      try {
        const { worker } = await import('../mocks/browser')
        
        await worker.start({
          onUnhandledRequest: 'bypass',
        })
        
      } catch (error) {
        console.error('MSW: Error al iniciar worker desde useEffect:', error)
      }
    }

    initMSW()
  }, [])

  return null
}
