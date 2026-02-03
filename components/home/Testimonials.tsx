import Image from "next/image"

export default function Testimonials() {
  const testimonialsData = [
    {
      quote:
        "We couldn’t be more thrilled with our newly remodeled kitchen! The team was professional, attentive to our needs, and transformed our outdated space into a modern, functional.",
      author: "Leslie Alexander",
      role: "Home Owner",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      quote:
        "Our experience with this home remodeling service was nothing short of exceptional. They took the time to understand our vision for a more open and inviting living space, and the result exceeded our expectations. Highly recommended!",
      author: "Jacob Jones",
      role: "Digital Marketer",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      quote:
        "I am absolutely delighted with the bathroom renovation completed by this incredible team. The design process was collaborative, and they really listened to what I wanted.",
      author: "Jenny Wilson",
      role: "Graphic Designer",
      imageUrl: "https://via.placeholder.com/150"
    }
  ]

  return (
    <div className="my-container py-12">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-800">What our happy clients say about us</h2>
        <p className="mt-2 text-gray-500">215 people have reviewed DSBGeneral.</p>
      </div>
      {/* <div className="justify-center space-x-6 sm:flex"> */}
      <div className="my-10 justify-center gap-8 lg:flex lg:justify-evenly">
        {testimonialsData.map((testimonial, index) => (
          <Testimonial
            key={index}
            quote={testimonial.quote}
            author={testimonial.author}
            role={testimonial.role}
            imageUrl={testimonial.imageUrl}
          />
        ))}
      </div>
      <div className="mt-8 text-center text-lg">
        <a href="#" className="font-semibold underline">
          Check all 215 reviews
        </a>
      </div>
    </div>
  )
}

// A simple testimonial component
const Testimonial = ({ quote, author, role, imageUrl }: any) => (
  <div className="relative mb-6  border border-gray-200 bg-white p-6 text-center ">
    <div className="absolute -top-4 left-1/2 h-12 w-12 -translate-x-1/2 transform overflow-hidden rounded-full border-2 border-white shadow-md">
      <Image src={imageUrl} alt={author} width={48} height={48} className="h-full w-full object-cover" />
    </div>
    <div className="mt-8">
      <p className="mb-4 text-lg text-gray-600">&ldquo;{quote}&rdquo;</p>
      <p className="font-bold text-gray-900">{author}</p>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  </div>
)
