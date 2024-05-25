"use client"
// Import Swiper React components
import { Navigation, Pagination, FreeMode, Thumbs } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"

// Import Swiper styles
import "swiper/css"
import "swiper/css/bundle"
import "swiper/css/pagination"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import React, { useRef, useState } from "react"

export default function ImageGallery({ gallery }: { gallery: any }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  console.log("thumbsSwiper", thumbsSwiper)

  const renderSlides = () => {
    return gallery.map((url: any, idx: number) => (
      <SwiperSlide key={idx} aria-activedescendant="opacity-0">
        <Image
          src={url}
          alt={`Image ${idx + 1}`}
          width={400}
          height={400}
          className="m-auto object-cover"
          priority={idx === 0}
        />
      </SwiperSlide>
    ))
  }
  return (
    <>
      <Swiper
        className="mb-2 rounded-lg"
        loop
        style={
          {
            "--swiper-navigation-color": "#fff",
            color: "#fff"
          } as React.CSSProperties
        }
        navigation
        pagination={{ clickable: true, type: "fraction" }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
      >
        {renderSlides()}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        slideActiveClass="bg-primary"
        loop
        freeMode
        watchSlidesProgress
        spaceBetween={10}
        slidesPerView={4}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper rounded-lg transition-all duration-300 ease-in-out"
      >
        {renderSlides()}
      </Swiper>
    </>
  )
}
