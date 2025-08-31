"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Paperclip} from 'lucide-react';
import { cn } from "@/lib/utils"
import { useChat } from "@/hooks/use-chat"

interface SpeedDialProps {
  chatState: ReturnType<typeof useChat>
}

const SpeedDial = ({ chatState }: SpeedDialProps) => {
  const { addAttachment } = chatState
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      addAttachment(file);
      // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  return (
    <div className="">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept="image/*,.pdf,.mp4, .jpeg, .png, .jpg"
      />
      <Button
              size="icon"
              className={cn(
                "mb-4 rounded-full transition-all duration-200",
                "bg-transparent hover:bg-transparent text-accent-foreground cursor-pointer",
              )}
              onClick={() => fileInputRef.current?.click()}
              style={{
                animationDelay: "100ms"
              }}
            >
              <Paperclip className="w-5 h-5" />
      </Button>
    </div>
  )
}

export default SpeedDial