import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"
import { useRouter } from 'next/navigation'

interface GroupCardProps {
  id: number
  name: string
  membersCount: number
  totalBalance: number
  yourBalance: number
}

export function GroupCard({ id, name, membersCount, totalBalance, yourBalance }: GroupCardProps) {
  const router = useRouter()

  return (
    <Card
      className="bg-white rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer"
      onClick={() => router.push(`/dashboard/groups/${id}`)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h3 className="text-lg font-medium font-geist-sans">{name}</h3>
            <div className="flex items-center mt-1 text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              <span className="text-sm">{membersCount} members</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-baseline border-b border-gray-100 pb-4">
            <p className="text-sm text-gray-500">Remaining to settle</p>
            <p className="text-lg font-medium">${totalBalance.toFixed(2)}</p>
          </div>

          <div className="flex justify-between items-baseline pt-1">
            <p className="text-sm text-gray-500">Your status</p>
            <p className={`text-lg font-semibold ${
              yourBalance > 0
                ? 'text-emerald-600'
                : yourBalance < 0
                  ? 'text-red-600'
                  : 'text-gray-600'
            }`}>
              {yourBalance === 0
                ? "You're all settled"
                : yourBalance > 0
                  ? `You are owed $${Math.abs(yourBalance).toFixed(2)}`
                  : `You owe $${Math.abs(yourBalance).toFixed(2)}`
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}