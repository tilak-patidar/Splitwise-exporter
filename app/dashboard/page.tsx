'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Loader } from "@/components/ui/loader";

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
    },
  })

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader variant="primary"/>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white p-4">
      <div>
        <h1 className="text-2xl font-semibold font-geist-sans">
          Welcome, {session?.user?.name}
        </h1>
        {/* We'll add the dashboard content here */}
      </div>
    </main>
  )
}