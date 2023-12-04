/*
  Display star rating in (readOnly || inputMode(!readOnly)).
  readOnly: provide ratings Array
  inputMode: provide parent Rating State controls (i.e. setRatingParent={setRating} parentRating={rating})
*/
import { cn } from "@/lib/utils"
import { Star, StarHalf } from "@/public/icons/RatingStars"

type Props = {
    className?: string
    readOnly?: boolean
    ratings?: number[]
    size?: number
    setRatingParent?: (star: number) => void
    parentRating?: number
}

export default function MyRating({
    className,
    readOnly = true,
    ratings = [],
    size = 25,
    setRatingParent = () => {},
    parentRating = 0,
}: Props) {
    const getWorkRating = () => {
        if (ratings.length <= 0) return 0
        return ratings.reduce((a, b) => a + b, 0) / ratings.length
    }

    const handleStarClick = (star: number) => {
        setRatingParent(star)
    }

    const isClickedColor = (id: number) => {
        return id <= parentRating ? "text-primary" : "text-white"
    }

    const renderStars = (readOnlyMode: boolean) => {
        const ratingAverage = getWorkRating()
        const ratingNoDecimal = Math.trunc(getWorkRating())

        return [5, 4, 3, 2, 1].map((star, idx) => {
            if (readOnlyMode) {
                if (star > ratingAverage) {
                    if (ratingNoDecimal === star - 1 && ratingAverage % 1) {
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
                        "peer peer-hover:text-primary-500 hover:text-primary-500 hover:cursor-pointer",
                        isClickedColor(star)
                    )}
                    onClick={() => handleStarClick(star)}
                />
            )
        })
    }

    return (
        <div className={cn("flex flex-row-reverse text-lg", className)}>
            {renderStars(readOnly)}
            {!readOnly && <span className="mr-1 text-gray-700 ">{parentRating.toFixed(1)}</span>}
            {readOnly && (
                <>
                    <span className="mr-1 text-gray-700">({ratings.length})</span>
                    <span className="mr-1 text-gray-700">{getWorkRating().toFixed(1)}</span>
                </>
            )}
        </div>
    )
}
