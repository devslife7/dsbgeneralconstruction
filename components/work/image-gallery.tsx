"use client"
// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import KitchenBg from "@/public/images/kitchen-bg.webp"
import Image from "next/image"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

export default function ImageGallery({ gallery }: { gallery: any }) {
  const renderSlides = () => {
    return gallery.map((url: any, idx: number) => (
      <SwiperSlide key={idx}>
        <Image src={url} alt={`Image ${idx + 1}`} width={400} height={400} className="m-auto object-cover" />
      </SwiperSlide>
    ))
  }
  return (
    <Swiper
      className="text-white"
      navigation
      color={"#fff"}
      pagination={{ clickable: true, type: "fraction" }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={swiper => console.log(swiper)}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
    >
      {renderSlides()}
    </Swiper>
  )
}
