import { http, HttpResponse } from 'msw'

interface FileAttachment {
  id: string
  name: string
  type: string
  size: number
  url?: string
  data?: string
}

export const handlers = [
  // Handler
  http.post('/api/chat', async ({ request }) => {
    
    const body = await request.json() as { message: string, attachments?: FileAttachment[] }
    const { message, attachments } = body
    
    // Delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mocks
    let response = 'Gracias por tu mensaje ⭐️ '
    let responseAttachments: FileAttachment[] = []
    
    if (message.toLowerCase().includes('hola')) {
      response = '¡Hola! 👋 ¿En qué puedo ayudarte hoy?'
    } else if (message.toLowerCase().includes('organigrama')) {
      response = 'Aqui tienes el organigrama de la empresa 🚀'
      responseAttachments = [
        {
          id: `att_${Date.now()}`,
          name: 'organigramas.png',
          type: 'image/png',
          size: 102400, // 100KB
          url: '/organigramas.png',
          data: '/organigramas.png'
        }
      ]
    } else if (message.toLowerCase().includes('misión')) {
      response = 'Nuestra misión es ser la mejor empresa de software.'
    } else if (message.toLowerCase().includes('Visión')) {
      response = 'Ser la mejor empresa de software.'
    } else if (message.toLowerCase().includes('servicios')) {
      response = 'Servicios que ofrecemos: Desarrollo de software, Consultoría, Implementación, Mantenimiento, Soporte técnico, Capacitación, Asesoría.'
    } else if (message.toLowerCase().includes('proyectos')) {
      response = 'Proyecto que estamos desarrollando: Sistema de gestión de clientes.'
    }
    return HttpResponse.json({
      success: true,
      data: {
        originalMessage: message,
        response: response,
        responseAttachments: responseAttachments,
        timestamp: new Date().toISOString(),
        messageId: `msg_${Date.now()}`
      }
    })
  }),

]