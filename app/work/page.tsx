import { Suspense } from "react";
import Gallery from "@/components/work/gallery";
import CreateWorkForm from "@/components/work/forms/createWorkForm";
import AddWorkInterface from "@/components/work/addWorkInterface";

export default function page() {
  return (
    <>
      <AddWorkInterface />
      <Suspense fallback={<div>Loading...</div>}>
        <Gallery />
      </Suspense>
    </>
  );
}
