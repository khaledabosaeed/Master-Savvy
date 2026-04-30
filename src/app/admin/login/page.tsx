import { Suspense } from "react"
import { AdminLoginForm } from "./LoginForm"

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-sm rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-sm text-zinc-400">
          Loading…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  )
}
