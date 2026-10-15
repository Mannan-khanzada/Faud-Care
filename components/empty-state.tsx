import { WhatsAppButton } from './whatsapp-button'

export function EmptyState({
  message,
  whatsappMessage,
}: {
  message: string
  whatsappMessage?: string
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 rounded-2xl border border-dashed border-border bg-card/60 px-8 py-14 text-center">
      <p className="text-pretty leading-relaxed text-muted-foreground">
        {message}
      </p>
      <WhatsAppButton variant="primary" message={whatsappMessage} />
    </div>
  )
}
