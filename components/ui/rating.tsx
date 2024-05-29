/*
  Display star rating in (readOnly || inputMode(!readOnly)).
  readOnly: provide ratings average and rating count to display
  inputMode: provide parent Rating State controls (i.e. setRatingParent={setRating} parentRating={rating})
*/
import { cn } from "@/lib/utils"
import { Star, StarHalf } from "@/public/icons/RatingStars"

type RatingProps = {
  className?: string
  readOnly?: boolean
  reverse?: boolean
  ratingCount?: number
  ratingAvg?: number
  size?: number
  setRatingParent?: (star: number) => void
  parentRating?: number
  onClick?: () => void
}

export default function Rating({
  className,
  readOnly,
  reverse,
  ratingCount = 0,
  ratingAvg = 0,
  size = 24,
  setRatingParent = () => {},
  parentRating = 0,
  onClick
}: RatingProps) {
  const handleStarClick = (star: number) => setRatingParent(star)
  const isClickedColor = (id: number) => (id <= parentRating ? "text-primary" : "text-white")

  const renderStars = () => {
    const numberOfStars = [5, 4, 3, 2, 1]
    const workRatingNoDecimal = Math.trunc(ratingAvg)

    return numberOfStars.map((star, idx) => {
      if (readOnly) {
        if (star > ratingAvg) {
          if (workRatingNoDecimal === star - 1 && ratingAvg % 1) {
            return <StarHalf key={idx} size={size} className="text-primary" />
          } else {
            return <Star key={idx} size={size} className="text-white" />
          }
        }
        return <Star key={idx} size={size} className="text-primary" />
      }

      return (
        <Star
          key={star}
          size={size}
          className={cn(
            "peer hover:cursor-pointer hover:text-primary-500 peer-hover:text-primary-500",
            isClickedColor(star)
          )}
          onClick={() => handleStarClick(star)}
        />
      )
    })
  }

  return (
    <div
      onClick={onClick}
      className={cn("flex flex-row-reverse text-lg text-gray-600", className, { "justify-end": reverse })}
    >
      <span className={cn("mb-[-3px] ml-2", { hidden: !reverse })}>{parentRating.toFixed(1)}</span>
      <div className={cn("mb-[-3px] ml-2", { hidden: reverse })}>
        {readOnly ? (
          <>
            <span>{ratingAvg}</span>
            <span>({ratingCount})</span>
          </>
        ) : (
          <span>{parentRating.toFixed(1)}</span>
        )}
      </div>
      {renderStars()}
    </div>
  )
}
