"use client"
import emailjs from "@emailjs/browser"
import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "../ui/button"
import { SpinnerSVG } from "@/public/svgs"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { TextArea } from "../ui/textArea"
import { ContactFormSchema, ContactFormTypes } from "@/lib/validators/contact"

export default function ContactForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactFormTypes>({
    resolver: zodResolver(ContactFormSchema)
  })
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<ContactFormTypes> = async data => {
    setIsLoading(true)

    let formElement = document.createElement("form")
    formElement.innerHTML = `
          <input name="from_name" value="${data.name}" />
          <input name="from_email" value="${data.email}" />
          <input name="from_phone" value="${data.phone}" />
          <textarea name="from_message">${data.message}</textarea>
      `

    await emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formElement,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        res => {
          toast.success("Message sent successfully")
        },
        error => {
          console.log(error.text)
        }
      )

    setIsLoading(false)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl">
      <fieldset className="space-y-4" disabled={isLoading}>
        <Input placeholder="Name*" {...register("name")} errors={errors.name?.message} />
        <Input placeholder="Email*" {...register("email")} errors={errors.email?.message} />
        <Input placeholder="Phone (optional)" {...register("phone")} />
        <TextArea placeholder="Message*" rows={5} {...register("message")} errors={errors.message?.message} />
        <Button type="submit" className="flex" responsive>
          {isLoading ? <SpinnerSVG className="animate-spin text-2xl" /> : "Send"}
        </Button>
      </fieldset>
    </form>
  )
}
