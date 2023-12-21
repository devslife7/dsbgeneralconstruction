"use client"
import emailjs from "@emailjs/browser"
import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { ZodType, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "../ui/button"
import { SpinnerSVG } from "@/public/svgs"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { TextArea } from "../ui/textArea"

type FormTypes = {
  name: string
  email: string
  phone?: string
  message: string
}

const schema: ZodType<FormTypes> = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(3, { message: "Name must contain at least 3 character(s)" })
    .max(20),
  email: z.string().email(),
  phone: z.string(),
  message: z.string().max(50).nonempty({ message: "Message is required" })
})

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  message: ""
}

export default function ContactForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormTypes>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<FormTypes> = data => {
    setIsLoading(true)
    // set timer for 3 seconds
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Message sent successfully")
      reset(defaultValues)
    }, 3000)

    // let formData = document.createElement("form")
    // formData.innerHTML = `
    //         <input name="from_name" value="${data.name}" />
    //         <input name="from_email" value="${data.email}" />
    //         <input name="from_phone" value="${data.phone}" />
    //         <textarea name="from_message">${data.message}</textarea>
    //     `
    // emailjs.sendForm("service_drybrep", "template_y49hums", formData, "hpeVPBIjR0dTtIqex").then(
    //   result => {
    //     setIsLoading(false)
    //     toast.success("Message sent successfully")
    //     reset(defaultValues)
    //   },
    //   error => {
    //     console.log(error.text)
    //   }
    // )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl">
      <fieldset className="space-y-4" disabled={isLoading}>
        <Input placeholder="Name*" {...register("name")} errors={errors.name?.message} />
        <Input placeholder="Email*" {...register("email")} errors={errors.email?.message} />
        <Input placeholder="Phone (optional)" {...register("phone")} />
        <TextArea placeholder="Message*" rows={5} {...register("message")} errors={errors.message?.message} />
        <Button type="submit" className="flex">
          {isLoading ? <SpinnerSVG className="animate-spin text-2xl" /> : "Send"}
        </Button>
      </fieldset>
    </form>
  )
}
