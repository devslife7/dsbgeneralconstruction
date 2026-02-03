"use client"
import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "../ui/my-button"
import { SpinnerSVG } from "@/public/svgs"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { ContactFormSchema, ContactFormTypes } from "@/lib/validators/contact"
import { Textarea } from "../ui/textarea"
import { sendContactEmail } from "@/actions/contact"

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

    try {
      const result = await sendContactEmail(data)

      if (result.success) {
        toast.success(result.message)
        reset()
      } else {
        toast.error(result.message)
      }
    } catch (error: any) {
      console.error("Contact form error:", error)
      toast.error("Failed to send message. Please try again or contact us directly.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl">
      <fieldset className="space-y-4" disabled={isLoading}>
        <Input
          placeholder="Name*"
          {...register("name")}

          // errors={errors.name?.message}
        />
        <Input
          placeholder="Email*"
          {...register("email")}

          // errors={errors.email?.message}
        />
        <Input placeholder="Phone (optional)" {...register("phone")} />
        <Textarea
          placeholder="Message*"
          rows={5}
          {...register("message")}

          // errors={errors.message?.message}
        />
        <Button type="submit" className="flex" responsive>
          {isLoading ? <SpinnerSVG className="animate-spin text-2xl" /> : "Send"}
        </Button>
      </fieldset>
    </form>
  )
}
