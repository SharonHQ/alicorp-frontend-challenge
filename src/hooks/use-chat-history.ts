import { useCallback, useState } from 'react'
import { Message } from './use-chat'

export interface ChatHistory {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
  messageCount: number
  messages?: Message[] // Mensajes del chat
}

export function useChatHistory() {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])

  // Función para generar ID único
  const generateUniqueId = () => {
    return `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Función para agregar un nuevo chat al historial
  const addChat = useCallback((chat: Omit<ChatHistory, 'id' | 'timestamp'>) => {
    const newChat: ChatHistory = {
      ...chat,
      id: generateUniqueId(),
      timestamp: new Date()
    }
    setChatHistory(prev => [newChat, ...prev])
    return newChat.id
  }, [])

  // Función para actualizar un chat existente
  const updateChat = useCallback((chatId: string, updates: Partial<ChatHistory>) => {
    setChatHistory(prev => 
      prev.map(chat => 
        chat.id === chatId 
          ? { ...chat, ...updates, timestamp: new Date() }
          : chat
      )
    )
  }, [])

  // Función para actualizar el último mensaje de un chat
  const updateLastMessage = useCallback((chatId: string, lastMessage: string) => {
    setChatHistory(prev => 
      prev.map(chat => 
        chat.id === chatId 
          ? { 
              ...chat, 
              lastMessage, 
              messageCount: chat.messageCount + 1,
              timestamp: new Date() 
            }
          : chat
      )
    )
  }, [])

  // Función para eliminar un chat
  const deleteChat = useCallback((chatId: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId))
  }, [])

  // Función para obtener un chat específico
  const getChat = (chatId: string) => {
    return chatHistory.find(chat => chat.id === chatId)
  }

  // Función para obtener los mensajes de un chat
  const getChatMessages = (chatId: string) => {
    const chat = chatHistory.find(chat => chat.id === chatId)
    return chat?.messages || []
  }

  // Función para actualizar los mensajes de un chat
  const updateChatMessages = (chatId: string, messages: Message[]) => {
    setChatHistory(prev => 
      prev.map(chat => 
        chat.id === chatId 
          ? { ...chat, messages, messageCount: messages.length }
          : chat
      )
    )
  }

  // Función para limpiar todo el historial
  const clearHistory = useCallback(() => {
    setChatHistory([])
  }, [])

  // Función para buscar chats
  const searchChats = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return chatHistory.filter(chat =>
      chat.title.toLowerCase().includes(lowercaseQuery) ||
      chat.lastMessage.toLowerCase().includes(lowercaseQuery)
    )
  }, [chatHistory])

  return {
    chatHistory,
    addChat,
    updateChat,
    updateLastMessage,
    deleteChat,
    getChat,
    getChatMessages,
    updateChatMessages,
    clearHistory,
    searchChats
  }
}
