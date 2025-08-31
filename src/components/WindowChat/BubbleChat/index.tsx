'use client'
import { Download, File } from 'lucide-react'
import Image from 'next/image'
import { FileAttachment } from '@/hooks/use-chat'

interface BubbleChatProps {
  message: string
  isUser: boolean
  attachments?: FileAttachment[]
}

const BubbleChat = ({ message, isUser, attachments }: BubbleChatProps) => {
  const handleDownload = (attachment: FileAttachment) => {
    if (attachment.url) {
      const link = document.createElement('a')
      link.href = attachment.url
      link.download = attachment.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
      isUser 
        ? 'bg-primary text-primary-foreground rounded-br-none ml-auto' 
        : 'bg-muted text-foreground rounded-bl-none'
    }`}>
      {/* Contenido del mensaje */}
      {message && (
        <p className="text-sm break-words mb-2">{message}</p>
      )}
      
      {/* Archivos adjuntos */}
      {attachments && attachments.length > 0 && (
        <div className="space-y-2">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="flex items-center gap-2 p-2 bg-background/50 rounded">
              {attachment.type.startsWith('image/') && (attachment.data || attachment.url) ? (
                <div>
                  <Image
                    src={attachment.data || attachment.url || ''}
                    alt={attachment.name}
                    width={64}
                    height={64}
                    className="object-cover rounded"
                    onError={(e) => {
                      console.error('Error loading image:', {
                        name: attachment.name,
                        src: attachment.data || attachment.url,
                        error: e
                      });
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', {
                        name: attachment.name,
                        src: attachment.data || attachment.url
                      });
                    }}
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-muted/50 rounded flex items-center justify-center">
                  <File className="w-8 h-8" />
                </div>
              )}
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-medium truncate">{attachment.name}</span>
                <span className="text-xs opacity-70">
                  {(attachment.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              {attachment.url && (
                <button
                  onClick={() => handleDownload(attachment)}
                  className="p-1 hover:bg-muted/50 rounded"
                  title="Descargar archivo"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BubbleChat