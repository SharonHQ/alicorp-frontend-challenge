import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
export function InputChat() {
  return (
    <div className="grid w-full gap-2 mt-4">
      <Textarea placeholder="Escribe tu mensaje aquí..." />
      <Button>Enviar mensaje</Button>
    </div>
  )
}

