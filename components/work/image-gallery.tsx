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

  const renderVideo = (videoUrl: string, idx: number, size: string) => {
    return (
      <video
        src={videoUrl}
        width={400}
        height={200}
        className={cn("mx-auto rounded-lg", `${size === "large" ? "h-[500px]" : "h-[100px]"} w-full`)}
        autoPlay={size === "large"}
        playsInline={size === "large"}
        muted
        onClick={() => console.log("clicked image")}
      />
    )
  }

  const renderImage = (imageURL: string, idx: number, size: string) => {
    return (
      <Image
        src={imageURL}
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
    )
  }

  const renderSlides = (size: string) => {
    return gallery.map((url: any, idx: number) => (
      <SwiperSlide key={idx}>
        {url && !!url.match(/mp4|mov|webm|quicktime/)
          ? renderVideo(url, idx, size)
          : renderImage(url, idx, size)}
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
