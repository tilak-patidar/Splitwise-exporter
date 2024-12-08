'use client'

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { useState, useEffect, useRef } from "react"
import { useSearchParams } from 'next/navigation'
import { toast } from "sonner"

export function LoginButton() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const toastShown = useRef(false)

  useEffect(() => {
    const error = searchParams.get('error')

    if (error && !toastShown.current) {
      toastShown.current = true

      switch (error) {
        case 'Callback':
          toast.error('Authorization cancelled by user')
          break
        case 'OAuthSignin':
          toast.error('Could not connect to Splitwise')
          break
        case 'OAuthCallback':
          toast.error('Error connecting to Splitwise')
          break
        default:
          toast.error('An error occurred during authorization')
      }

      if (window.history.replaceState) {
        window.history.replaceState({}, document.title, '/')
      }
      setIsLoading(false)
    }
  }, [searchParams])

  const handleLogin = async () => {
    toastShown.current = false
    setIsLoading(true)
    try {
      await signIn('splitwise', {
        callbackUrl: '/dashboard',
        redirect: true,
      })
    } catch (error) {
      setIsLoading(false)
      toast.error('Failed to initiate Splitwise login')
      console.error('Login error:', error)
    }
  }

  return (
    <Button
      className="w-full bg-[#2EC4B6] h-12 font-geist-sans text-white font-semibold text-[15px]
                 transition-all duration-300
                 hover:bg-[#2EC4B6]/90
                 focus:outline-none
                 disabled:opacity-70 disabled:cursor-default disabled:pointer-events-none
                 disabled:hover:bg-[#2EC4B6]"
      size="lg"
      onClick={handleLogin}
      disabled={isLoading}
      aria-disabled={isLoading}
    >
      {isLoading ? "Connecting..." : "Connect with Splitwise"}
    </Button>
  )
}