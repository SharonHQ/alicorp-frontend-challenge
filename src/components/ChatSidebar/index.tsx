"use client"

import { useState } from "react"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarInput, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MessageSquare, Plus, Trash2 } from "lucide-react"
import { ChatHistory } from "@/hooks/use-chat-history"

interface ChatSidebarProps {
  chatHistory: ChatHistory[]
  onNewChat: () => void
  onSelectChat: (chatId: string) => void
  onDeleteChat: (chatId: string) => void
}

export function ChatSidebar({ chatHistory, onNewChat, onSelectChat, onDeleteChat }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null)
  const [chatToDelete, setChatToDelete] = useState<string | null>(null)

  // Filtrar chats basado en la búsqueda
  const filteredChats = searchQuery 
    ? chatHistory.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chatHistory

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId)
    onSelectChat(chatId)
  }

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation() // Evitar que se seleccione el chat al hacer click en eliminar
    setChatToDelete(chatId)
  }

  const confirmDelete = () => {
    if (chatToDelete) {
      onDeleteChat(chatToDelete)
      if (selectedChatId === chatToDelete) {
        setSelectedChatId(null)
      }
      setChatToDelete(null)
    }
  }

  const cancelDelete = () => {
    setChatToDelete(null)
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `${minutes}m`
    } else if (hours < 24) {
      return `${hours}h`
    } else {
      return `${days}d`
    }
  }

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Chats</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onNewChat}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <SidebarInput
            placeholder="Buscar chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-2"
          />
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Historial de conversaciones</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredChats.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {searchQuery ? "No se encontraron chats" : "No hay chats aún"}
                    </p>
                    
                  </div>
                ) : (
                  filteredChats.map((chat) => (
                    <SidebarMenuItem 
                      key={chat.id}
                      onMouseEnter={() => setHoveredChatId(chat.id)}
                      onMouseLeave={() => setHoveredChatId(null)}
                    >
                      <div className="relative group">
                        <SidebarMenuButton
                          isActive={selectedChatId === chat.id}
                          onClick={() => handleChatSelect(chat.id)}
                          className="flex flex-col items-start gap-1 w-full"
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-medium truncate">{chat.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(chat.timestamp)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between w-full">
                            <span className="text-xs text-muted-foreground truncate">
                              {chat.lastMessage}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {chat.messageCount} msgs
                            </span>
                          </div>
                        </SidebarMenuButton>
                        {hoveredChatId === chat.id && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handleDeleteChat(e, chat.id)}
                                className="absolute top-1 right-1 h-6 w-6 p-0 opacity-70 hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground z-10"
                                title="Eliminar conversación"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar conversación?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Se eliminará permanentemente la conversación &quot;{chat.title}&quot; y todos sus mensajes.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={cancelDelete}>Cancelar</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={confirmDelete}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  )
}
