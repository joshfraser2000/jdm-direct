import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Shield, Ship, CreditCard, FileCheck, Search, Phone } from 'lucide-react'

export const metadata = {
  title: 'How It Works — JDM Direct',
  description: 'Learn how JDM Direct imports Japanese vehicles directly to US customers.',
}

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-4">How It Works</h1>
        <p className="text-neutral-400 text-xl max-w-2xl mx-auto">
          From Japan to your driveway — completely handled by us.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-12 mb-20">
        {[
          {
            icon: <Search className="w-8 h-8 text-red-500" />,
            step: '01',
            title: 'Browse Live JDM Inventory',
            desc: `Our inventory is sourced directly from Japanese auction houses and dealers via API. Every vehicle listed on JDM Direct is at least 25 years old, making it fully legal to import under the US 25-year exemption rule (49 CFR 591.5). You can filter by make, model, mileage, price, and more.`,
          },
          {
            icon: <CreditCard className="w-8 h-8 text-red-500" />,
            step: '02',
            title: 'Secure Full Payment via Stripe',
            desc: `When you find your vehicle, checkout is simple. We collect full payment upfront via Stripe to lock in that specific car. This secures your vehicle in Japan and kicks off the entire process immediately. Payment is encrypted and protected by Stripe's industry-leading security.`,
          },
          {
            icon: <FileCheck className="w-8 h-8 text-red-500" />,
            step: '03',
            title: 'We Source & Document',
            desc: `Once payment is confirmed, we purchase your vehicle from our Japan network partner and begin the export documentation process. This includes export certification, de-registration in Japan, and preparation of all US import documents (EPA Form 3520-1, DOT HS-7).`,
          },
          {
            icon: <Ship className="w-8 h-8 text-red-500" />,
            step: '04',
            title: 'RoRo Ocean Shipping',
            desc: `Your vehicle is loaded onto a Roll-on/Roll-off (RoRo) vessel — the same method used by automakers worldwide. It's the safest, most cost-effective way to ship cars internationally. Transit from Japan to the US West Coast typically takes 3–4 weeks.`,
          },
          {
            icon: <Shield className="w-8 h-8 text-red-500" />,
            step: '05',
            title: 'US Customs & Compliance',
            desc: `When your vehicle arrives at the US port, our customs broker handles clearance. Because the vehicle qualifies under the 25-year exemption, no FMVSS modifications are needed. We handle all EPA and DOT paperwork. You receive a clean title in your name.`,
          },
          {
            icon: <Phone className="w-8 h-8 text-red-500" />,
            step: '06',
            title: 'Port Pickup or Domestic Delivery',
            desc: `You can pick up your vehicle at the port (saves cost), or we can arrange a domestic shipper to your door. Either way, you'll have keys in hand within 60–90 days of placing your order — with full title and all import documentation.`,
          },
        ].map((step) => (
          <div key={step.step} className="flex gap-8 items-start">
            <div className="shrink-0">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800">
                {step.icon}
              </div>
            </div>
            <div>
              <div className="text-red-500 text-xs font-bold tracking-widest mb-1">{step.step}</div>
              <h2 className="text-2xl font-black mb-3">{step.title}</h2>
              <p className="text-neutral-400 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cost breakdown */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-black mb-6">Understanding Total Landed Cost</h2>
        <p className="text-neutral-400 mb-6">
          Every vehicle listing shows a transparent "Total Landed Cost" that includes:
        </p>
        <div className="space-y-3 text-sm">
          {[
            { label: 'Vehicle price', desc: 'The auction or dealer price in Japan, converted to USD' },
            { label: 'International shipping (RoRo)', desc: 'Ocean freight from Japan to nearest US port, typically $1,800–$2,200' },
            { label: 'Import duty (~2.5%)', desc: 'US import duty on vehicles from Japan under standard tariff schedule' },
            { label: 'Customs brokerage', desc: 'Included in the import processing fee' },
          ].map((item) => (
            <div key={item.label} className="flex gap-3 items-start">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
              <div>
                <span className="font-semibold text-white">{item.label}</span>
                <span className="text-neutral-500"> — {item.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-neutral-500 mt-6">
          Not included: state sales tax, state registration fees, domestic delivery (if applicable), and any local compliance inspections required by your state.
        </p>
      </div>

      {/* FAQ quick hits */}
      <div className="mb-16">
        <h2 className="text-2xl font-black mb-8">Common Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: 'Are these vehicles legal to drive in the US?',
              a: 'Yes. Vehicles 25+ years old are exempt from FMVSS requirements. They are street-legal in all 50 states, though some states (California, most notably) may have additional emissions requirements for older vehicles.',
            },
            {
              q: 'Are they right-hand drive?',
              a: 'Yes — all JDM vehicles are right-hand drive. This is legal in all US states. Many enthusiasts prefer RHD, and it adds to the authenticity of the JDM experience.',
            },
            {
              q: 'What if the vehicle is damaged in transit?',
              a: 'All vehicles are insured during ocean transit. In the rare event of damage, your vehicle is fully covered and we\'ll work with you on a resolution or refund.',
            },
            {
              q: 'Can I request a specific vehicle not listed?',
              a: 'Yes! Contact us with the make, model, year, and grade you\'re looking for and we\'ll source it from the Japan auction network.',
            },
          ].map((item) => (
            <div key={item.q} className="border-b border-neutral-800 pb-6">
              <h3 className="font-bold text-lg mb-2">{item.q}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Find Your JDM?</h2>
        <Link href="/vehicles">
          <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-6 h-auto text-lg">
            Browse Available Vehicles
          </Button>
        </Link>
      </div>
    </div>
  )
}
