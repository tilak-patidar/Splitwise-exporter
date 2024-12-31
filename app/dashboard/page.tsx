interface Balance {
  currency_code: string;
  amount: string;
}

interface Member {
  id: number;
  first_name: string;
  last_name: string | null;
  balance: Balance[];
  email: string;
}

interface Group {
  id: number;
  name: string;
  members: Member[];
  simplified_debts: Array<{
    from: number;
    to: number;
    amount: string;
    currency_code: string;
  }>;
  group_type: string;
}

'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Loader } from "@/components/ui/loader"
import { ProfileDropdown } from "./ProfileDropdown"
import { GroupCard } from "./GroupCard"
import { getGroups } from "@/lib/splitwise"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function DashboardPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
    }
  })

  const [groups, setGroups] = useState<Group[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchGroups() {
      try {
        const fetchedGroups = await getGroups()
        setGroups(fetchedGroups)
      } catch (error) {
        toast.error('Failed to fetch groups')
        console.error('Error fetching groups:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (status === "authenticated") {
      fetchGroups()
    }
  }, [status])

  const calculateUserBalance = (group: Group) => {
    const userMember = group.members.find(
      member => member.email === session?.user?.email
    )

    if (!userMember?.balance.length) return 0

    return parseFloat(userMember.balance[0]?.amount || "0")
  }

  const calculateGroupBalance = (group: Group) => {
    return group.members.reduce((total, member) => {
      const balance = member.balance[0]?.amount ? Math.abs(parseFloat(member.balance[0].amount)) : 0
      return total + balance
    }, 0) / 2
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader variant="primary" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold font-geist-sans text-[#2EC4B6]">SplitwiseSync</h1>
            <ProfileDropdown userName={session?.user?.name} />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold font-geist-sans">Your Groups</h2>
          <p className="text-gray-600 mt-1">
            {groups.length > 0
              ? `Manage expenses across ${groups.length} groups`
              : "No groups found"}
          </p>
        </div>

        {groups.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                id={group.id}
                name={group.name}
                membersCount={group.members.length}
                totalBalance={calculateGroupBalance(group)}
                yourBalance={calculateUserBalance(group)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No groups found. Create or join a group to get started.</p>
          </div>
        )}
      </div>
    </main>
  )
}