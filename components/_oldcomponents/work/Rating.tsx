type RatingPropTypes = {
    className?: string
    ratings: number[]
}

export default function Rating({ className, ratings }: RatingPropTypes) {
    const ratingRange = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]

    const getWorkRating = () => {
        if (ratings.length <= 0) return 0.0
        return ratings.reduce((a: any, b: any) => a + b) / ratings.length
    }

    let workRating = 0.0
    if (ratings.length > 0) workRating = ratings.reduce((a, b) => a + b) / ratings.length

    //   Rounds to the lowest 0.5
    const roundToLowerHalf = (rating: number) => {
        const isHalfStar = rating % 1 === 0 ? 0.0 : 0.5
        return Math.trunc(rating) + isHalfStar
    }

    const renderStars = () => {
        const isChecked = (rating: number) => roundToLowerHalf(workRating) === rating
        return ratingRange.map((range, index) => (
            <input
                key={index}
                type="radio"
                name="rating-10"
                className={`bg-primary mask mask-star mask-half-${
                    range % 1 === 0 ? "2" : "1"
                } hover:cursor-default ${range === 0 ? "hidden" : ""}`}
                disabled
                readOnly
                checked={isChecked(range)}
            />
        ))
    }

    return (
        <div className={`${className} flex space-x-2`}>
            <div className="text-lg">
                {workRating.toFixed(1)}
                {workRating}
                <span>({ratings.length})</span>
            </div>
            <div className="rating rating-half">{renderStars()}</div>
        </div>
    )
}
