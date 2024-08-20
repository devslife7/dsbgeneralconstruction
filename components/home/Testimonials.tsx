export default function Testimonials() {
  const testimonialsData = [
    {
      quote:
        "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.",
      author: "Leslie Alexander",
      role: "Freelance React Developer",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      quote:
        "Simply the best. Better than all the rest. I'd recommend this product to beginners and advanced users.",
      author: "Jacob Jones",
      role: "Digital Marketer",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      quote:
        "I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish.",
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
      <div className="flex-wrap justify-center space-x-6 sm:flex">
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
      <div className="mt-8 text-center">
        <a href="#" className="text-indigo-600 underline">
          Check all 215 reviews
        </a>
      </div>
    </div>
  )
}

// A simple testimonial component
const Testimonial = ({ quote, author, role, imageUrl }: any) => (
  <div className="relative mb-6 rounded-xl border border-gray-200 bg-white p-6 text-center shadow-lg">
    <div className="absolute -top-4 left-1/2 h-12 w-12 -translate-x-1/2 transform overflow-hidden rounded-full border-2 border-white shadow-md">
      <img src={imageUrl} alt={author} className="h-full w-full object-cover" />
    </div>
    <div className="mt-8">
      <p className="mb-4 text-lg text-gray-600">"{quote}"</p>
      <p className="font-bold text-gray-900">{author}</p>
      <p className="text-gray-500">{role}</p>
    </div>
  </div>
)
