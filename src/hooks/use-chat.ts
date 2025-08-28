'use client'
import { useState } from 'react'

export interface Message {
  id: string
  content: string
  timestamp: Date
  isUser: boolean
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const addMessage = (content: string, isUser: boolean = true) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      isUser
    }
    setMessages(prev => [...prev, newMessage])
  }

  const sendMessage = async () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage = inputValue.trim()
      addMessage(userMessage, true)
      setInputValue('')
      setIsLoading(true)

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        })

        if (response.ok) {
          const data = await response.json()
          addMessage(data.data.response, false)
        } else {
          addMessage('Lo siento, hubo un error al procesar tu mensaje.', false)
        }
      } catch (error) {
        console.error('Error al enviar el mensaje:', error)
        addMessage('Lo siento, hubo un error de conexión.', false)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return {
    messages,
    inputValue,
    setInputValue,
    addMessage,
    sendMessage,
    clearChat,
    isLoading
  }
}
