import { getWorkList } from "@/actions/work"
import AddWorkTrigger from "@/components/work/add-work-trigger"
import WorkList from "@/components/work/work-list"

export default async function page() {
  const gallery = await getWorkList()
  return (
    <div className="mx-auto mb-10 mt-5 lg:container lg:mt-10 lg:px-8">
      <div className="my-container mb-4">
        <h1 className="mb-10 hidden text-center text-4xl font-bold opacity-70 lg:mb-1 lg:block">Our Work</h1>{" "}
        {/* <Typography variant */}
        <p className="m-auto mb-2 hidden w-full text-center opacity-60 lg:block">
          You&#39;re invited to browse a selection of recently completed projects below.
        </p>
        <AddWorkTrigger />
      </div>

      <WorkList gallery={gallery} />
    </div>
  )
}
