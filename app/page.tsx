'use client'

import { LoginCard } from "@/components/auth/loginCard"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Loader } from "@/components/ui/loader"

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader variant="primary" />
      </div>
    )
  }

  if (session) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-4">
      <LoginCard />
    </main>
  )
}