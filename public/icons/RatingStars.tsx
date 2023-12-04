const primaryColor = "#ff9001"

type Props = {
  className?: string
  size?: number
  onClick?: (e: any) => void
}
const strokeWidth = 1.7

export function Star({ className, size = 0, onClick }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      viewBox="0 0 24 24"
      onClick={onClick}
      className={className}
      stroke={primaryColor}
      strokeWidth={strokeWidth}
    >
      <path
        fill="currentColor"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21L12 17.27Z"
      />
    </svg>
  )
}
export function StarHalf({ className, size = 0 }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} viewBox="0 0 24 24" className={className}>
      <path
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21L12 17.27Z"
      />
      <path fill="currentColor" d="M12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21L12 17.27V2Z" />
    </svg>
  )
}
