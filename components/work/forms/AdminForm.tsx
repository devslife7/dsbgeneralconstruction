"use client"
import { Button } from "@/components/ui/button"
import { SubmitEvent } from "@/lib/validators/types"

type Props = {
  password: string
  setPassword: (e: string) => void
  closeModal: () => void
  handlePasswordSubmit: (e: SubmitEvent) => void
}

export default function AdminLoginForm({ password, setPassword, closeModal, handlePasswordSubmit }: Props) {
  return (
    <form onSubmit={handlePasswordSubmit}>
      <input
        id="password"
        type="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
      />

      <div className="mt-7 flex justify-end space-x-4">
        <Button type="submit" variant="secondary">
          Submit
        </Button>
        <Button onClick={closeModal} variant="destructive">
          Cancel
        </Button>
      </div>
    </form>
  )
}
