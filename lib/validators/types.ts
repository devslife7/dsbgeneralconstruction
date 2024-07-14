type ChangeEvent = React.ChangeEvent<HTMLInputElement>
type SubmitEvent = React.FormEvent<HTMLFormElement>
type MouseEvent = React.MouseEvent<HTMLButtonElement>

export type { ChangeEvent, SubmitEvent, MouseEvent }

export type PreviewMedia = {
  type: string
  url: string
  size: number
  name: string
}

export type NavLinkType = {
  label: string
  href: string
}
