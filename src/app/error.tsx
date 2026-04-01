'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // In production: send to Sentry or similar
    console.error('Global error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-5xl mb-6">⚠️</div>
      <h2 className="text-2xl font-black mb-3">Something went wrong</h2>
      <p className="text-neutral-400 mb-8 max-w-md">
        We hit an unexpected error. Your data is safe — please try again or contact us if the problem persists.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset} className="bg-red-600 hover:bg-red-700 text-white">
          Try Again
        </Button>
        <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800" onClick={() => window.location.href = '/'}>
          Go Home
        </Button>
      </div>
    </div>
  )
}
