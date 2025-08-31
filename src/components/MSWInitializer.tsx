'use client'
import { useEffect, useRef } from 'react'

export function MSWInitializer() {
  const initialized = useRef(false)

  useEffect(() => {
    async function initMSW() {
      // Solo ejecutar en desarrollo
      if (process.env.NODE_ENV !== 'development') {
        return
      }

      // Evitar múltiples inicializaciones
      if (initialized.current) {
        return
      }

      try {
        const { worker } = await import('../mocks/browser')
        
        await worker.start({
          onUnhandledRequest: 'bypass',
        })
        
        initialized.current = true
        console.log('MSW: Worker iniciado correctamente')
        
      } catch (error) {
        console.error('MSW: Error al iniciar worker desde useEffect:', error)
      }
    }

    initMSW()
  }, [])

  return null
}
