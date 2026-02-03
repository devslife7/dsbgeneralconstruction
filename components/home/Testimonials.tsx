import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"

// Generate avatar URL from name using UI Avatars API
const getAvatarUrl = (name: string) => {
  const encoded = encodeURIComponent(name)
  return `https://ui-avatars.com/api/?name=${encoded}&size=128&background=FF9001&color=ffffff&bold=true`
}

// Star rating component
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex justify-center gap-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={cn("h-5 w-5", i < rating ? "text-primary" : "text-gray-300")}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

// Quote icon component
const QuoteIcon = () => (
  <svg
    className="mx-auto mb-4 h-10 w-10 text-primary/30"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
)

export default function Testimonials() {
  const testimonialsData = [
    {
      quote:
        "We couldn't be more thrilled with our newly remodeled kitchen! The team was professional, attentive to our needs, and transformed our outdated space into a modern, functional masterpiece.",
      author: "Leslie Alexander",
      role: "Homeowner",
      rating: 5
    },
    {
      quote:
        "Our experience with this home remodeling service was nothing short of exceptional. They took the time to understand our vision and the result exceeded our expectations. Highly recommended!",
      author: "Jacob Jones",
      role: "Homeowner",
      rating: 5
    },
    {
      quote:
        "I am absolutely delighted with the bathroom renovation completed by this incredible team. The design process was collaborative, and they really listened to what I wanted.",
      author: "Jenny Wilson",
      role: "Interior Designer",
      rating: 5
    }
  ]

  return (
    <section className="my-container py-16 lg:py-24">
      {/* Section Header */}
      <div className="mb-12 text-center lg:mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 lg:text-5xl">
          What Our Clients Say
        </h2>
        <p className="mt-4 text-lg opacity-60">
          Trusted by homeowners across the Bay Area
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonialsData.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            quote={testimonial.quote}
            author={testimonial.author}
            role={testimonial.role}
            rating={testimonial.rating}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center lg:mt-16">
        <Link href="/work" className={cn(buttonVariants(), "font-light lg:text-lg")}>
          View Our Portfolio
        </Link>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  rating: number
}

const TestimonialCard = ({ quote, author, role, rating }: TestimonialCardProps) => (
  <div className="group relative flex flex-col rounded-lg bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
    {/* Quote Icon */}
    <QuoteIcon />

    {/* Rating */}
    <StarRating rating={rating} />

    {/* Quote Text */}
    <p className="mt-6 flex-1 text-center text-base leading-relaxed opacity-70 lg:text-lg">
      &ldquo;{quote}&rdquo;
    </p>

    {/* Author Info */}
    <div className="mt-6 flex items-center justify-center gap-4">
      <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-primary/20">
        <Image
          src={getAvatarUrl(author)}
          alt={author}
          width={56}
          height={56}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="text-left">
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-sm opacity-60">{role}</p>
      </div>
    </div>
  </div>
)
