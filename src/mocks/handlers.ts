import { http, HttpResponse } from 'msw'

export const handlers = [
  // Handler
  http.post('/api/chat', async ({ request }) => {
    
    const body = await request.json() as { message: string }
    const { message } = body
    
    // Delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mocks
    let response = 'Gracias por tu mensaje ⭐️ '
    
    if (message.toLowerCase().includes('hola')) {
      response = '¡Hola! 👋 ¿En qué puedo ayudarte hoy?'
    } else if (message.toLowerCase().includes('ayuda')) {
      response = 'En qué puedo ayudarte 🚀'
    } else if (message.toLowerCase().includes('gracias')) {
      response = 'Me alegra poder ayudarte 😊'
    } else if (message.toLowerCase().includes('adios')) {
      response = '¡Hasta luego! 🤗'
    }
    
    return HttpResponse.json({
      success: true,
      data: {
        originalMessage: message,
        response: response,
        timestamp: new Date().toISOString(),
        messageId: `msg_${Date.now()}`
      }
    })
  }),

]