import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    // Simular una respuesta del chatbot
    const responses = [
      "¡Hola! ¿En qué puedo ayudarte hoy?",
      "Entiendo tu pregunta. Déjame pensar en eso...",
      "Esa es una excelente pregunta. Te explico...",
      "Gracias por tu mensaje. Aquí tienes la información que necesitas.",
      "Me alegra que me hayas preguntado eso. La respuesta es...",
      "¡Interesante pregunta! Déjame darte una respuesta detallada.",
      "Perfecto, entiendo lo que necesitas. Aquí está la información.",
      "Excelente consulta. Te proporciono la respuesta que buscas."
    ]
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    return NextResponse.json({
      success: true,
      data: {
        response: randomResponse
      }
    })
  } catch (error) {
    console.error('Error en el endpoint de chat:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
