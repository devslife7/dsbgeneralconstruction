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
import { Modal } from "../ui/modal"
import Button from "../ui/button"

export default function ImageGallery({ urlList }: { urlList: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)

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
        onClick={() => size === "large" && setOpenModal(true)}
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
        onClick={() => size === "large" && setOpenModal(true)}
      />
    )
  }

  const renderSlides = (size: string) => {
    return urlList.map((url: any, idx: number) => (
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
      <div className={cn({ hidden: urlList.length === 1 })}>
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
        {renderFullGallery(urlList, openModal, setOpenModal)}
      </div>
    </>
  )
}

const renderFullGallery = (urlList: string[], open: boolean, onOpenChange: (open: boolean) => void) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content title="Full Gallery" className="h-screen overflow-auto">
        {urlList.map((url: string, idx: number) =>
          url && !!url.match(/mp4|mov|webm|quicktime/) ? (
            <video
              key={idx}
              src={url}
              width={400}
              height={400}
              className="mx-auto"
              autoPlay
              playsInline
              muted
              controls
            />
          ) : (
            <Image
              key={idx}
              src={url}
              alt={`Image ${idx + 1}`}
              width={400}
              height={400}
              className="mx-auto"
              priority={idx === 0}
            />
          )
        )}
        <Button variant="danger" onClick={() => onOpenChange(false)}>
          Close
        </Button>
      </Modal.Content>
    </Modal>
  )
}
