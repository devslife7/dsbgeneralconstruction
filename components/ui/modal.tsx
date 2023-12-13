import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export function Modal({
  open,
  onOpenChange,
  children
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  )
}

function ModalContent({
  title,
  description,
  className,
  children
}: {
  title: string
  description?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <DialogContent className={cn("sm:max-w-md", className)}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      {children}
    </DialogContent>
  )
}

Modal.Trigger = DialogTrigger
Modal.Content = ModalContent
Modal.Title = DialogTitle
Modal.Description = DialogDescription
Modal.Footer = DialogFooter
Modal.Close = DialogClose
