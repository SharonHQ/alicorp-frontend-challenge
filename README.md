# ChatApp - Alicorp Frontend Challenge

Una aplicación de chat moderna construida con Next.js 15, React 19 y TypeScript. Esta aplicación incluye funcionalidades avanzadas como gestión de historial de conversaciones, adjuntos de archivos, temas claro/oscuro y una interfaz responsive.

## 🚀 Características

- **Chat en tiempo real** con interfaz moderna y responsive
- **Gestión de historial** de conversaciones con persistencia local
- **Sistema de adjuntos** de archivos e imágenes
- **Temas claro/oscuro** con detección automática del sistema
- **Interfaz responsive** optimizada para móviles y desktop
- **Mock Service Worker (MSW)** para simulación de API
- **Testing** con Vitest y React Testing Library
- **TypeScript** para type safety completo
- **Tailwind CSS** para estilos modernos
- **Radix UI** para componentes accesibles

## 📋 Prerrequisitos

- Node.js 18+ 
- npm, yarn o pnpm

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd alicorp-frontend-challenge
   ```

2. **Instalar dependencias**
   ```bash
   # Con npm
   npm install
   
   # Con yarn
   yarn install
   
   # Con pnpm (recomendado)
   pnpm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios

```
src/
├── app/                    # App Router de Next.js 15
│   ├── layout.tsx         # Layout principal con providers
│   ├── page.tsx           # Página principal de la aplicación
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── ChatSidebar/       # Sidebar con historial de chats
│   ├── Header/            # Header de la aplicación
│   ├── InputChat/         # Componente de entrada de mensajes
│   ├── WindowChat/        # Ventana principal del chat
│   ├── Theme/             # Sistema de temas
│   ├── ui/                # Componentes UI reutilizables
│   └── MSWInitializer.tsx # Inicializador de MSW
├── hooks/                 # Custom hooks
│   ├── use-chat.ts        # Lógica principal del chat
│   ├── use-chat-history.ts # Gestión del historial
│   ├── use-local-storage.ts # Persistencia local
│   ├── use-mobile.ts      # Detección de dispositivos móviles
│   └── use-theme.ts       # Gestión de temas
├── lib/                   # Utilidades y configuraciones
│   └── utils.ts           # Funciones utilitarias
├── mocks/                 # Configuración de MSW
│   ├── handlers.ts        # Handlers para simular API
│   ├── browser.ts         # Configuración para navegador
│   └── node.ts            # Configuración para Node.js
└── test/                  # Tests
    └── example.test.ts    # Tests de ejemplo
```

### Componentes Principales

#### 1. **ChatSidebar** (`src/components/ChatSidebar/`)
- Gestiona el historial de conversaciones
- Permite crear nuevos chats
- Funcionalidad de eliminación de chats
- Navegación entre conversaciones

#### 2. **WindowChat** (`src/components/WindowChat/`)
- Renderiza los mensajes del chat
- Maneja la visualización de adjuntos
- Componente BubbleChat para mensajes individuales

#### 3. **InputChat** (`src/components/InputChat/`)
- Entrada de texto para mensajes
- Sistema de adjuntos de archivos
- SpeedDial para acciones rápidas

#### 4. **Header** (`src/components/Header/`)
- Título de la aplicación
- Toggle de tema (claro/oscuro)
- Información de la sesión

### Hooks Personalizados

#### 1. **useChat** (`src/hooks/use-chat.ts`)
```typescript
interface Message {
  id: string
  content: string
  timestamp: Date
  isUser: boolean
  attachments?: FileAttachment[]
}
```
- Gestión del estado del chat actual
- Envío de mensajes con adjuntos
- Comunicación con la API

#### 2. **useChatHistory** (`src/hooks/use-chat-history.ts`)
- Persistencia de conversaciones en localStorage
- CRUD operations para chats
- Gestión de metadatos de conversaciones

#### 3. **useTheme** (`src/hooks/use-theme.ts`)
- Gestión del tema actual
- Sincronización con preferencias del sistema
- Persistencia de preferencias

### Sistema de Mocking (MSW)

La aplicación utiliza **Mock Service Worker** para simular respuestas de API:

```typescript
// src/mocks/handlers.ts
http.post('/api/chat', async ({ request }) => {
  const body = await request.json()
  // Simula respuestas basadas en el contenido del mensaje
  // Incluye adjuntos como el organigrama de Apple
})
```

**Respuestas simuladas:**
- "hola" → Saludo amigable
- "organigrama" → Adjunta imagen del organigrama
- "gracias" → Respuesta de agradecimiento
- "adios" → Despedida

## 🎨 Sistema de Temas

La aplicación implementa un sistema de temas completo:

- **Tema claro**: Colores claros y legibles
- **Tema oscuro**: Colores oscuros para reducir fatiga visual
- **Detección automática**: Se adapta a las preferencias del sistema
- **Persistencia**: Recuerda la preferencia del usuario

### Implementación
```typescript
// src/components/Theme/ThemeProvider.tsx
<ThemeProvider defaultTheme="system">
  {children}
</ThemeProvider>
```

## 📱 Responsive Design

La aplicación está optimizada para diferentes tamaños de pantalla:

- **Desktop**: Layout completo con sidebar visible
- **Tablet**: Sidebar colapsable
- **Mobile**: Interfaz adaptada para pantallas pequeñas

### Breakpoints utilizados:
- `sm:` (640px+)
- `md:` (768px+)
- `lg:` (1024px+)
- `xl:` (1280px+)

## 🧪 Testing

### Ejecutar tests
```bash
# Tests en modo watch
npm run test

# Tests con coverage
npm run coverage
```

### Configuración de testing
- **Vitest**: Framework de testing
- **React Testing Library**: Testing de componentes
- **jsdom**: Entorno de DOM para tests
- **MSW**: Mocking de APIs en tests

## 🚀 Scripts Disponibles

```json
{
  "dev": "next dev --turbopack",     // Desarrollo con Turbopack
  "build": "next build --turbopack", // Build de producción
  "start": "next start",             // Servidor de producción
  "lint": "eslint",                  // Linting del código
  "test": "vitest",                  // Ejecutar tests
  "coverage": "vitest run --coverage" // Tests con coverage
}
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15**: Framework React con App Router
- **React 19**: Biblioteca de UI
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Framework de estilos
- **Radix UI**: Componentes accesibles

### Desarrollo
- **ESLint**: Linting de código
- **Vitest**: Framework de testing
- **MSW**: Mocking de APIs
- **Turbopack**: Bundler rápido

### Utilidades
- **class-variance-authority**: Variantes de componentes
- **clsx**: Utilidad para clases CSS
- **lucide-react**: Iconos
- **tailwind-merge**: Merge de clases Tailwind

## 📦 Gestión de Estado

La aplicación utiliza una combinación de:

1. **React useState**: Estado local de componentes
2. **Custom Hooks**: Lógica reutilizable
3. **localStorage**: Persistencia de datos
4. **Context API**: Temas y configuración global

### Flujo de Datos
```
User Input → useChat → API (MSW) → Response → UI Update
                ↓
        useChatHistory → localStorage
```

## 🔧 Configuración Avanzada

### Variables de Entorno
Crear archivo `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Configuración de Next.js
```typescript
// next.config.ts
const nextConfig = {
  images: {
    domains: [], // Configurar dominios para imágenes
  },
}
```

## 🐛 Troubleshooting

### Problemas Comunes

1. **Error de MSW**
   ```bash
   # Limpiar cache
   rm -rf .next
   npm run dev
   ```

2. **Problemas de dependencias**
   ```bash
   # Limpiar node_modules
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Errores de TypeScript**
   ```bash
   # Verificar tipos
   npx tsc --noEmit
   ```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto es parte del Alicorp Frontend Challenge.

## 👥 Autores

Desarrollado como parte del desafío frontend de Alicorp.

---

**¡Disfruta usando ChatApp! 🚀**
