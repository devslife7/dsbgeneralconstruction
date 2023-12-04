import Button from "@/components/ui/button"

type Props = {
    password: string
    setPassword: (e: string) => void
    closeModal: () => void
    handlePasswordSubmit: (e: any) => void
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
                className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />

            <div className="flex justify-end space-x-4 mt-7">
                <Button type="submit" variant="secondary">
                    Submit
                </Button>
                <Button onClick={closeModal} variant="danger">
                    Cancel
                </Button>
            </div>
        </form>
    )
}
