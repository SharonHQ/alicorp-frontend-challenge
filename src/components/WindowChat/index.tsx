'use client'
import BubbleChat from "./BubbleChat"
import { useChat } from "@/hooks/use-chat"

interface WindowChatProps {
  chatState: ReturnType<typeof useChat>
}

const WindowChat = ({ chatState }: WindowChatProps) => {
  const { messages } = chatState

  return (
    <div className="w-full h-[calc(100vh-12rem)] flex flex-col overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <p>No hay mensajes aún. ¡Comienza una conversación!</p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <BubbleChat 
                message={message.content} 
                isUser={message.isUser}
                attachments={message.attachments}
              />
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default WindowChat