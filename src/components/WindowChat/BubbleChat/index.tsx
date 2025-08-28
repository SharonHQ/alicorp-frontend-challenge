'use client'

const BubbleChat = ({ message, isUser }: { message: string, isUser: boolean }) => {
  return (
    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
      isUser 
        ? 'bg-primary text-primary-foreground rounded-br-none ml-auto' 
        : 'bg-muted text-foreground rounded-bl-none'
    }`}>
      <p className="text-sm break-words">{message}</p>
    </div>
  )
}

export default BubbleChat