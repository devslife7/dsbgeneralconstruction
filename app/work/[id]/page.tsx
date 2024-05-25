import BackButton from "@/components/work/ui/back-button"
import { BackArrowSVG } from "@/public/svgs"
import { redirect } from "next/navigation"

type WorkPageProps = {
  params: {
    id: string
  }
}

export default function WorkPage({ params: { id } }: WorkPageProps) {
  return (
    <div className="my-container">
      <BackButton />
      <div>WorkPage</div>
      <div>{id}</div>
    </div>
  )
}
