'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Loader } from "@/components/ui/loader"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GroupDetailsPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
    }
  })

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader variant="primary" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Button
              variant="ghost"
              className="p-0 hover:bg-transparent"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold font-geist-sans">Group Details</h1>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* We'll add the group details content here */}
      </div>
    </main>
  )
}