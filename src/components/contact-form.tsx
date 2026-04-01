'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle, Loader2 } from 'lucide-react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setState('success')
      } else {
        const data = await res.json()
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
        setState('error')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
        <p className="text-neutral-400">We&apos;ll get back to you within a few hours. Check your spam folder if you don&apos;t hear from us.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-xs text-neutral-400 block mb-1.5">Your Name</label>
          <Input name="name" value={form.name} onChange={handleChange} required
            placeholder="John Smith"
            className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600" />
        </div>
        <div>
          <label className="text-xs text-neutral-400 block mb-1.5">Email Address</label>
          <Input name="email" type="email" value={form.email} onChange={handleChange} required
            placeholder="john@example.com"
            className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600" />
        </div>
      </div>

      <div>
        <label className="text-xs text-neutral-400 block mb-1.5">What can we help with?</label>
        <Select value={form.subject} onValueChange={(v) => setForm((p) => ({ ...p, subject: v ?? '' }))}>
          <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
            <SelectItem value="vehicle_request">Request a specific vehicle</SelectItem>
            <SelectItem value="order_status">Order status / update</SelectItem>
            <SelectItem value="shipping_quote">Shipping cost estimate</SelectItem>
            <SelectItem value="import_question">Import / legal question</SelectItem>
            <SelectItem value="general">General question</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-xs text-neutral-400 block mb-1.5">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell us what you're looking for or ask your question here..."
          className="w-full rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />
      </div>

      {state === 'error' && (
        <div className="bg-red-950/40 border border-red-800 rounded-lg p-3 text-red-400 text-sm">
          {errorMsg}
        </div>
      )}

      <Button type="submit" disabled={state === 'loading' || !form.subject}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 h-auto">
        {state === 'loading' ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  )
}
