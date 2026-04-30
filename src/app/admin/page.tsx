"use client"

import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import TranslationEditor from "@/components/admin/TranslationEditor"

export default function AdminDashboardPage() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.replace("/admin/login")
    router.refresh()
  }

  return <TranslationEditor onSignOut={handleSignOut} />
  
}
