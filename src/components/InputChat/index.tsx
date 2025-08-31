'use client'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useChat } from "@/hooks/use-chat"
import { Send, X, File } from 'lucide-react';
import SpeedDial from "./SpeedDial"

interface InputChatProps {
  chatState: ReturnType<typeof useChat>
}

export function InputChat({ chatState }: InputChatProps) {
  const { 
    inputValue, 
    setInputValue, 
    sendMessage, 
    isLoading, 
    attachments, 
    removeAttachment 
  } = chatState

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex w-full rounded-md border gap-2 mt-4 border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content">
      <SpeedDial chatState={chatState} />
      <div className="flex flex-col flex-1 min-h-0">
        <Textarea 
          placeholder="Escribe tu mensaje aquí..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="border-0 focus-visible:ring-0 focus-visible:border-0 resize-none"
        />
        {/* Archivos adjuntos dentro del input */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 p-2 border-t bg-muted/20">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center gap-2 p-2 bg-background border rounded-md"
              >
                {attachment.type.startsWith('image/') && attachment.data ? (
                  <img
                    src={attachment.data}
                    alt={attachment.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                    <File className="w-6 h-6" />
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">{attachment.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {(attachment.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAttachment(attachment.id)}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button 
        onClick={sendMessage} 
        disabled={isLoading || (!inputValue.trim() && attachments.length === 0)}
        className="rounded-full w-10 h-10 mt-2 mr-2"
      >
        {isLoading ? '...' : <Send className="w-4 h-4" />}
      </Button>
    </div>
  )
}

