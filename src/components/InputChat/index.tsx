'use client'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useChat } from "@/hooks/use-chat"

interface InputChatProps {
  chatState: ReturnType<typeof useChat>
}

export function InputChat({ chatState }: InputChatProps) {
  const { inputValue, setInputValue, sendMessage, isLoading } = chatState

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="grid w-full gap-2 mt-4">
      <Textarea 
        placeholder="Escribe tu mensaje aquí..." 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />
      <Button 
        onClick={sendMessage} 
        disabled={isLoading || !inputValue.trim()}
      >
        {isLoading ? 'Enviando...' : 'Enviar mensaje'}
      </Button>
    </div>
  )
}

