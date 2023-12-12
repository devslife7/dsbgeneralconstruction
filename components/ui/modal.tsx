type Props = {
  closeModal?: () => void
  isModalOpen?: boolean
  title?: string
  children?: React.ReactNode
}

export function Modal({
  closeModal,
  isModalOpen,
  title = "Title",
  children = <div>Modal Content</div>,
}: Props) {
  return <dialog>My Modal here</dialog>
}
