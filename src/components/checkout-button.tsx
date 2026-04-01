'use client'

import { useState } from 'react'
import { Vehicle } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Loader2 } from 'lucide-react'

interface CheckoutButtonProps {
  vehicle: Vehicle
}

export function CheckoutButton({ vehicle }: CheckoutButtonProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    line1: '',
    city: '',
    state: '',
    postalCode: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          customerEmail: form.email,
          shippingAddress: {
            name: form.name,
            line1: form.line1,
            city: form.city,
            state: form.state,
            postalCode: form.postalCode,
            country: 'US',
          },
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isFormValid =
    form.name && form.email && form.phone && form.line1 && form.city && form.state && form.postalCode

  return (
    <>
      <Button
        size="lg"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-6 h-auto"
        onClick={() => setOpen(true)}
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Purchase This Vehicle — ${vehicle.totalLandedCost.toLocaleString()}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-neutral-900 border-neutral-800 text-white max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Complete Your Purchase</DialogTitle>
            <p className="text-sm text-neutral-400 mt-1">
              {vehicle.year} {vehicle.make} {vehicle.model} — ${vehicle.totalLandedCost.toLocaleString()} total
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="text-xs text-neutral-400 block mb-1">Full Name</label>
              <Input name="name" value={form.name} onChange={handleChange} required
                placeholder="John Smith"
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600" />
            </div>
            <div>
              <label className="text-xs text-neutral-400 block mb-1">Email Address</label>
              <Input name="email" type="email" value={form.email} onChange={handleChange} required
                placeholder="john@example.com"
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600" />
            </div>
            <div>
              <label className="text-xs text-neutral-400 block mb-1">Phone Number</label>
              <Input name="phone" type="tel" value={form.phone} onChange={handleChange} required
                placeholder="+1 (555) 000-0000"
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600" />
            </div>
            <div>
              <label className="text-xs text-neutral-400 block mb-1">Street Address</label>
              <Input name="line1" value={form.line1} onChange={handleChange} required
                placeholder="123 Main St"
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <label className="text-xs text-neutral-400 block mb-1">City</label>
                <Input name="city" value={form.city} onChange={handleChange} required
                  placeholder="Los Angeles"
                  className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600" />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">State</label>
                <Input name="state" value={form.state} onChange={handleChange} required
                  placeholder="CA" maxLength={2}
                  className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600" />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">ZIP</label>
                <Input name="postalCode" value={form.postalCode} onChange={handleChange} required
                  placeholder="90001"
                  className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600" />
              </div>
            </div>

            <div className="bg-neutral-800 rounded-lg p-3 text-xs text-neutral-400">
              You will be redirected to Stripe for secure payment. Full amount is charged upfront to lock in your vehicle.
            </div>

            <Button type="submit" disabled={loading || !isFormValid}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 h-auto">
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
              ) : (
                <>Continue to Payment — ${vehicle.totalLandedCost.toLocaleString()}</>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
