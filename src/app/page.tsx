'use client'
import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header';
import { InputChat } from '@/components/InputChat';
import WindowChat from '@/components/WindowChat';
import { MSWInitializer } from '@/components/MSWInitializer';
import { useChat } from '@/hooks/use-chat';
import { useChatHistory } from '@/hooks/use-chat-history';
import { ChatSidebar } from '@/components/ChatSidebar';
import { 
  SidebarProvider,
  SidebarInset 
} from '@/components/ui/sidebar';

export default function Home() {
  const chatState = useChat()
  const { chatHistory, addChat, updateLastMessage, deleteChat, getChatMessages, updateChatMessages } = useChatHistory()
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  
  // Usar useRef para evitar re-renders innecesarios
  const addChatRef = useRef(addChat)
  const updateLastMessageRef = useRef(updateLastMessage)
  const updateChatMessagesRef = useRef(updateChatMessages)
  
  // Actualizar las referencias cuando cambian las funciones
  useEffect(() => {
    addChatRef.current = addChat
    updateLastMessageRef.current = updateLastMessage
    updateChatMessagesRef.current = updateChatMessages
  }, [addChat, updateLastMessage, updateChatMessages])
  
  const handleNewChat = () => {
    // Si hay un chat actual con mensajes, guardarlo antes de crear uno nuevo
    if (currentChatId && chatState.messages.length > 0) {
      const lastMessage = chatState.messages[chatState.messages.length - 1]
      if (lastMessage && lastMessage.content) {
        // Actualizar el último mensaje y todos los mensajes del chat actual
        updateLastMessageRef.current(currentChatId, lastMessage.content)
        updateChatMessagesRef.current(currentChatId, chatState.messages)
      }
    }
    
    // Limpiar el chat actual y crear uno nuevo
    chatState.clearChat()
    setCurrentChatId(null)
  }
  
  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId)
    
    // Cargar los mensajes del chat seleccionado
    const chatMessages = getChatMessages(chatId)
    if (chatMessages.length > 0) {
      // Limpiar mensajes actuales y cargar los del chat seleccionado
      chatState.clearChat()
      chatMessages.forEach(message => {
        chatState.addMessage(message.content, message.isUser, message.attachments)
      })
    } else {
      // Si no hay mensajes, limpiar el chat
      chatState.clearChat()
    }
  }

  // Crear automáticamente un chat cuando se envía el primer mensaje
  useEffect(() => {
    if (chatState.messages.length === 1 && !currentChatId) {
      const firstMessage = chatState.messages[0]
      if (firstMessage && firstMessage.content) {
        const chatData = {
          title: firstMessage.content.length > 30 
            ? firstMessage.content.substring(0, 30) + '...' 
            : firstMessage.content,
          lastMessage: firstMessage.content,
          messageCount: 1,
          messages: [firstMessage] // Guardar el primer mensaje
        }
        const chatId = addChatRef.current(chatData)
        setCurrentChatId(chatId)
      }
    }
  }, [chatState.messages.length, currentChatId])

  // Actualizar el historial cuando se envían mensajes
  useEffect(() => {
    if (currentChatId && chatState.messages.length > 0) {
      const lastMessage = chatState.messages[chatState.messages.length - 1]
      if (lastMessage && lastMessage.content) {
        // Actualizar el último mensaje
        updateLastMessageRef.current(currentChatId, lastMessage.content)
        // Actualizar todos los mensajes del chat
        updateChatMessagesRef.current(currentChatId, chatState.messages)
      }
    }
  }, [chatState.messages.length, currentChatId])
  
  return (
    <div className="h-screen bg-background">
      <MSWInitializer />
      <SidebarProvider>
        <div className="flex h-full w-full">
          <ChatSidebar 
            chatHistory={chatHistory}
            onNewChat={handleNewChat}
            onSelectChat={handleSelectChat}
            onDeleteChat={deleteChat}
          />
          <SidebarInset>
            <div className="flex flex-col h-full">
              <Header />
              <div className="flex flex-col flex-1 px-4 sm:px-8 lg:px-16">  
                <WindowChat chatState={chatState} />
                <InputChat chatState={chatState} />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
