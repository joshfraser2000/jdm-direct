import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, Ship, FileText, Mail } from 'lucide-react'

export const metadata = { title: 'Order Confirmed — JDM Direct' }

export default function OrderConfirmedPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>

      <h1 className="text-4xl font-black mb-4">Order Confirmed!</h1>
      <p className="text-neutral-400 text-lg mb-10">
        Your payment was received. Your JDM vehicle is now being sourced from Japan.
        You&apos;ll receive a confirmation email shortly with full order details.
      </p>

      {/* Timeline */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mb-10 text-left">
        <h2 className="font-bold text-lg mb-6 text-center">What Happens Next</h2>
        <div className="space-y-6">
          {[
            {
              icon: <Mail className="w-5 h-5 text-green-500" />,
              title: 'Confirmation Email',
              desc: 'You\'ll receive an order receipt and point of contact within 24 hours.',
              timing: 'Within 24 hours',
            },
            {
              icon: <FileText className="w-5 h-5 text-blue-500" />,
              title: 'Vehicle Sourcing & Documentation',
              desc: 'We secure your exact vehicle from our Japan network and begin export documentation.',
              timing: '1–2 weeks',
            },
            {
              icon: <Ship className="w-5 h-5 text-yellow-500" />,
              title: 'Ocean Freight (RoRo)',
              desc: 'Your vehicle loads onto a Roll-on/Roll-off vessel from Japan to your nearest US port.',
              timing: '3–4 weeks ocean transit',
            },
            {
              icon: <CheckCircle className="w-5 h-5 text-red-500" />,
              title: 'Customs, Title & Delivery',
              desc: 'We handle EPA/DOT compliance, customs clearance, and arrange final delivery or port pickup.',
              timing: '2–4 weeks',
            },
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 shrink-0 mt-0.5">
                {step.icon}
              </div>
              <div>
                <div className="font-semibold text-sm">{step.title}</div>
                <div className="text-neutral-400 text-sm mt-0.5">{step.desc}</div>
                <div className="text-xs text-neutral-600 mt-1">{step.timing}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/vehicles">
          <Button className="bg-red-600 hover:bg-red-700 text-white">Browse More Vehicles</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
