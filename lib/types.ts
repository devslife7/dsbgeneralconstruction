export type Review = {
  id: number
  name: string
  comment: string
  rating: number
  workId: number
}

export type Work = {
  id: number
  title: string
  description: string
  media: string[]
  rating: number
  Review: Review[]
}
export type WorkFormType = {
  title: string
  description: string
  media: File[]
}
export type WorkErrors = {
  media?: string
  title?: string
  description?: string
}

export type PreviewMedia = {
  type: string
  url: string
}

export type NavLink = {
  label: string
  href: string
}
