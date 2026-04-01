'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Bell, Loader2, CheckCircle } from 'lucide-react'

interface WaitlistFormProps {
  vehicleId: string
  vehicleName: string
  eligibleYear: number
}

export function WaitlistForm({ vehicleId, vehicleName, eligibleYear }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, vehicleId, vehicleName, eligibleYear }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-500 text-sm py-2">
        <CheckCircle className="w-4 h-4" />
        <span>You&apos;re on the list! We&apos;ll email you in {eligibleYear}.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="your@email.com"
        className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600 text-sm h-9"
      />
      <Button type="submit" disabled={status === 'loading'} size="sm"
        className="bg-blue-600 hover:bg-blue-700 text-white shrink-0 h-9">
        {status === 'loading' ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <><Bell className="w-3 h-3 mr-1" />Notify Me</>
        )}
      </Button>
    </form>
  )
}
