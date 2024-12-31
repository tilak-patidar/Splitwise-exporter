import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const response = await fetch('https://secure.splitwise.com/api/v3.0/get_groups', {
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
      },
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching groups:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}