"use client"
import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "../ui/my-button"
import { SpinnerSVG } from "@/public/svgs"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { ContactFormSchema, ContactFormTypes } from "@/lib/validators/contact"
// import { Textarea } from "../ui/textarea"
import { sendContactEmail } from "@/actions/contact"

export default function ContactForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactFormTypes>({
    resolver: zodResolver(ContactFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange"
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="space-y-4" disabled={isLoading}>
        <div>
          <Input
            placeholder="Name*"
            {...register("name")}
            error={errors.name}
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email*"
            {...register("email")}
            error={errors.email}
          />
        </div>
        <div>
          <Input
            type="tel"
            placeholder="Phone (optional)"
            {...register("phone")}
            error={errors.phone}
          />
        </div>
        <div>
          {/* <Textarea
            placeholder="Message*"
            rows={5}
            {...register("message")}
            error={errors.message}
          /> */}
        </div>
      </fieldset>
      <Button type="submit" className="flex mt-4" responsive disabled={isLoading}>
        {isLoading ? <SpinnerSVG className="animate-spin text-2xl" /> : "Send"}
      </Button>
    </form>
  )
}
