import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para almacenar nuestro valor
  // Pasa la función inicial al useState para que solo se ejecute una vez
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        const parsed = JSON.parse(item)
        // Convertir fechas de string a Date objects si es necesario
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].timestamp) {
          return parsed.map((item: any) => ({
            ...item,
            timestamp: new Date(item.timestamp)
          }))
        }
        return parsed
      }
      return initialValue
    } catch (error) {
      console.log(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Retorna una versión envuelta de la función setter de useState que persiste
  // el nuevo valor en localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Permite que value sea una función para que tengamos la misma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      // Guarda en localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.log(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue, setStoredValue])

  return [storedValue, setValue] as const
}
