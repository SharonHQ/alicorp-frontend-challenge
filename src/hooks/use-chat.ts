'use client'
import { useState } from 'react'

export interface FileAttachment {
  id: string
  name: string
  type: string
  size: number
  url?: string
  data?: string // Para archivos pequeños como imágenes
}

export interface Message {
  id: string
  content: string
  timestamp: Date
  isUser: boolean
  attachments?: FileAttachment[]
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [attachments, setAttachments] = useState<FileAttachment[]>([])

  // Función para generar ID único
  const generateUniqueId = () => {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  const addMessage = (content: string, isUser: boolean = true, messageAttachments?: FileAttachment[]) => {
    const newMessage: Message = {
      id: generateUniqueId(),
      content,
      timestamp: new Date(),
      isUser,
      attachments: messageAttachments
    }
    console.log('Adding message with attachments:', messageAttachments)
    setMessages(prev => [...prev, newMessage])
  }

  const addAttachment = (file: File): FileAttachment => {
    const attachment: FileAttachment = {
      id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: file.type,
      size: file.size
    }

    // Convertimos las imagenes a base64 para renderizarlas
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target?.result as string
        setAttachments(prev => prev.map(att => 
          att.id === attachment.id ? { ...att, data } : att
        ))
      }
      reader.readAsDataURL(file)
    } else {
      // Para otros archivos, creamos una URL temporal
      attachment.url = URL.createObjectURL(file)
    }

    setAttachments(prev => [...prev, attachment])
    return attachment
  }

  const removeAttachment = (attachmentId: string) => {
    setAttachments(prev => {
      const attachment = prev.find(att => att.id === attachmentId)
      if (attachment?.url) {
        URL.revokeObjectURL(attachment.url)
      }
      return prev.filter(att => att.id !== attachmentId)
    })
  }

  const clearAttachments = () => {
    attachments.forEach(att => {
      if (att.url) {
        URL.revokeObjectURL(att.url)
      }
    })
    setAttachments([])
  }

  const sendMessage = async () => {
    if ((inputValue.trim() || attachments.length > 0) && !isLoading) {
      const userMessage = inputValue.trim()
      const messageAttachments = [...attachments]
      
      addMessage(userMessage, true, messageAttachments)
      setInputValue('')
      clearAttachments()
      setIsLoading(true)

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            message: userMessage,
            attachments: messageAttachments.map(att => ({
              name: att.name,
              type: att.type,
              size: att.size,
              data: att.data // Solo para imágenes
            }))
          }),
        })

        if (response.ok) {
          const data = await response.json()
          // Manejar attachments en la respuesta si existen
          const responseAttachments = data.data.responseAttachments || []
          console.log('Received response attachments:', responseAttachments)
          addMessage(data.data.response, false, responseAttachments)
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
    clearAttachments()
  }

  return {
    messages,
    inputValue,
    setInputValue,
    addMessage,
    sendMessage,
    clearChat,
    isLoading,
    attachments,
    addAttachment,
    removeAttachment,
    clearAttachments
  }
}
