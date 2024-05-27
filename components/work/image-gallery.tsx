"use client"
import React, { useState } from "react"
// Import Swiper React components
import { Navigation, Pagination, FreeMode, Thumbs } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import { cn } from "@/lib/utils"

export default function ImageGallery({ gallery }: { gallery: any }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  const renderSlides = (size: string) => {
    return gallery.map((url: any, idx: number) => (
      <SwiperSlide key={idx}>
        <Image
          src={url}
          alt={`Image ${idx + 1}`}
          width={400}
          height={400}
          className={cn(
            "mx-auto rounded-lg object-cover",
            `${size === "large" ? "h-[500px]" : "h-[100px]"} w-[400px]`
          )}
          priority={idx === 0}
          onClick={() => console.log("clicked image")}
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
        {renderSlides("large")}
      </Swiper>
      <div className={cn({ hidden: gallery.length === 1 })}>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop
          freeMode
          watchSlidesProgress
          spaceBetween={10}
          slidesPerView={4}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper  rounded-lg transition-all duration-300 ease-in-out"
        >
          {renderSlides("small")}
        </Swiper>
      </div>
    </>
  )
}
