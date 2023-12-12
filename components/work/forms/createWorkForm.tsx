"use client";
import { useRef, useState } from "react";
import { addWork } from "@/actions/work";
import Image from "next/image";
import Button from "../../ui/button";
import { useFormStatus } from "react-dom";
import { PreviewMedia } from "@/lib/validators/types";
import { toast } from "sonner";
import { WorkSchema, WorkErrors } from "@/lib/validators/work";
import { Input } from "../../ui/input";
import { ACCEPTED_MEDIA_TYPES } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";

export default function CreateWorkForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [previewMediaObj, setPreviewMediaObj] = useState<
    PreviewMedia[] | undefined
  >(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [errors, setErrors] = useState<WorkErrors>({});

  const closerDialog = () => setOpenDialog(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr: FileList | null = e.target.files as FileList;
    let fileUrlArr: PreviewMedia[] = [];
    if (previewMediaObj) {
      setPreviewMediaObj(undefined);
      previewMediaObj.forEach((file) => {
        URL.revokeObjectURL(file.url);
      });
    }
    for (let i = 0; i < fileArr.length; i++) {
      fileUrlArr.push({
        type: fileArr[i].type,
        url: URL.createObjectURL(fileArr[i]),
      });
    }
    setPreviewMediaObj(fileUrlArr);
  };

  const formAction = async (formData: FormData) => {
    // client-side validation
    const parsedData = WorkSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      media: formData.getAll("media"),
    });

    if (!parsedData.success) {
      let errors: WorkErrors = {};
      parsedData.error.issues.forEach((issue) => {
        errors = { ...errors, [issue.path[0]]: issue.message };
      });
      console.log("errors: ", errors);
      console.log("parsedData: ", parsedData);
      setErrors(errors);
      return;
    } else setErrors({});

    const response = await addWork(formData);
    if (response.status === 406) {
      toast.error("Validation Error", { description: response.message });
      return;
    }
    if (response.status === 200) toast.success(response.message);
    if (response.status === 500) toast.error(response.message);

    // Reset Form
    closerDialog();
    setPreviewMediaObj(undefined);
    window.scrollTo(0, 0);
    ref.current?.reset();
  };

  return (
    <form action={formAction} ref={ref} className="flex w-full flex-col gap-6">
      <div>
        <Label>Title</Label>
        <Input
          type="text"
          name="title"
          onFocus={() => setErrors({ ...errors, title: "" })}
        />
        <span className="text-sm text-red-400">{errors.title}</span>
      </div>
      <div>
        <Label>Description</Label>
        <Input
          type="text"
          name="description"
          onFocus={() => setErrors({ ...errors, description: "" })}
        />
        <span className="text-sm text-red-400">{errors.description}</span>
      </div>

      <div>
        {previewMediaObj ? previewFile(previewMediaObj) : null}
        <input
          className="border-none text-sm outline-none"
          name="media"
          type="file"
          multiple
          accept={ACCEPTED_MEDIA_TYPES.join(", ")}
          onChange={handleChange}
          onFocus={() => setErrors({ ...errors, media: "" })}
        />
        <span className="block text-sm text-red-400">{errors.media}</span>
      </div>
      <Modal.Footer>
        <Modal.Close className="mr-5 opacity-70">Cancel</Modal.Close>
        <SubmitButton />
      </Modal.Footer>
    </form>
  );
}

// Submit button using pending state from useFormStatus
const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <div className="flex items-center justify-between">
      <Button aria-disabled={pending} disabled={pending} type="submit">
        {pending ? "Loading..." : "Submit"}
      </Button>
    </div>
  );
};

// Preview first file in array of selected items
const previewFile = (previewMediaObj: PreviewMedia[]) => {
  return (
    // <div className="gap-4 items-start pb-4 bg-red-100 overflow-auto w-[200px] h-[400px]">
    <div className="flex w-full flex-wrap items-start gap-1 pb-4">
      {previewMediaObj.map((file, idx) =>
        file.type.startsWith("image/") ? (
          <div
            key={idx}
            className="relative h-32 w-32 overflow-hidden rounded-lg"
          >
            <Image
              className="object-cover"
              src={file.url}
              alt="preview"
              priority={true}
              fill={true}
            />
          </div>
        ) : (
          <div
            key={idx}
            className="w-200 h-300 relative overflow-hidden rounded-lg"
          >
            <video
              className="object-cover"
              src={file.url}
              autoPlay
              loop
              muted
            />
          </div>
        ),
      )}
    </div>
  );
};
