import Image from "next/image"
import { PhotoProvider, PhotoView } from "react-photo-view"
import "react-photo-view/dist/react-photo-view.css"

export default function MediaViewer({ mediaURLS }: { mediaURLS: string[] }) {
  const renderVideo = (videoUrl: string) => {
    return (
      <PhotoView
        width={600}
        height={600}
        render={({ attrs }) => {
          return (
            <div {...attrs} className="flex items-center">
              <div className="mx-auto my-auto w-[400px] max-w-[400px]">
                <video width="400" height="350" src={videoUrl} controls autoPlay muted>
                  Sorry, your browser doesn&#39;t support HTML5 <code>video</code>
                </video>
              </div>
            </div>
          )
        }}
      >
        <video width="400" height="350" src={videoUrl} autoPlay muted>
          Sorry, your browser doesn&#39;t support HTML5 <code>video</code>
        </video>
      </PhotoView>
    )
  }

  const renderImage = (imageURL: any) => {
    return (
      <PhotoView src={imageURL}>
        <Image
          src={imageURL}
          alt="Work Image"
          width="0"
          height="0"
          sizes="500px 700px"
          className="h-auto w-full"
        />
      </PhotoView>
    )
  }

  return (
    <PhotoProvider>
      {mediaURLS.map((url: string, index: number) => (
        <div key={index} className="w-[30rem] lg:max-w-[24rem]">
          {url && !!url.match(/.mp4|.mov|.quicktime/) ? renderVideo(url) : renderImage(url)}
        </div>
      ))}
    </PhotoProvider>
  )
}
