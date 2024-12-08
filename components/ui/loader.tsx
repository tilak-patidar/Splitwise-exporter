// components/ui/loader-dots.tsx
import { cn } from "@/lib/utils"

interface LoaderDotsProps {
  variant?: 'primary' | 'white'
  size?: 'sm' | 'default'
}

export function Loader({ variant = 'primary', size = 'default' }: LoaderDotsProps) {
  const dotClasses = cn(
    "rounded-full animate-bounce-loader",
    {
      'bg-[#2EC4B6]': variant === 'primary',
      'bg-white': variant === 'white',
      'h-2 w-2': size === 'sm',
      'h-3 w-3': size === 'default'
    }
  )

  return (
    <div className="flex space-x-1.5">
      <div className={cn(dotClasses, "[animation-delay:-0.3s]")}></div>
      <div className={cn(dotClasses, "[animation-delay:-0.15s]")}></div>
      <div className={cn(dotClasses)}></div>
    </div>
  )
}