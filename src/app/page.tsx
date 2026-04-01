import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { VehicleCard } from '@/components/vehicle-card'
import { getFeaturedVehicles } from '@/lib/vehicles-api'
import { Shield, Ship, CreditCard, FileCheck } from 'lucide-react'

export default async function HomePage() {
  const featured = await getFeaturedVehicles()

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-black to-neutral-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 text-sm font-medium">Live JDM Inventory from Japan</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
              Drive the Car<br />
              <span className="text-red-500">Japan Built.</span><br />
              <span className="text-neutral-300">You Bought.</span>
            </h1>
            <p className="text-neutral-400 text-xl leading-relaxed mb-10 max-w-2xl">
              Authentic JDM icons — Supra, GT-R, NSX, RX-7 — imported directly from Japan to your door.
              Every vehicle is 25-year rule compliant, fully documented, and competitively priced.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/vehicles">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-6 h-auto">
                  Browse All Vehicles
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 text-lg px-8 py-6 h-auto">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-neutral-800 bg-neutral-900/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '200+', label: 'Vehicles in Stock' },
                { value: '100%', label: '25-Year Compliant' },
                { value: '$0', label: 'Hidden Fees' },
                { value: '60–90', label: 'Days to Delivery' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-sm text-neutral-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black">Featured Vehicles</h2>
            <p className="text-neutral-400 mt-1">Highest-graded, ready-to-import picks</p>
          </div>
          <Link href="/vehicles">
            <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800">
              View All →
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-neutral-900 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black">How JDM Direct Works</h2>
            <p className="text-neutral-400 mt-2 text-lg">Zero hassle. We handle everything from Japan to your driveway.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-red-500" />,
                step: '01',
                title: 'Browse & Select',
                desc: 'Filter our live inventory from Japanese auction houses. Every vehicle is 25-year compliant and auction-graded.',
              },
              {
                icon: <CreditCard className="w-8 h-8 text-red-500" />,
                step: '02',
                title: 'Secure Purchase',
                desc: 'Pay securely via Stripe. Full price upfront locks your vehicle. We source it immediately from our Japan network.',
              },
              {
                icon: <Ship className="w-8 h-8 text-red-500" />,
                step: '03',
                title: 'We Ship It',
                desc: 'Your vehicle is loaded on an RoRo vessel (the cheapest, safest method) from Japan to a US port near you.',
              },
              {
                icon: <FileCheck className="w-8 h-8 text-red-500" />,
                step: '04',
                title: 'Title & Delivery',
                desc: 'We handle customs, EPA/DOT documentation, and state title registration. Keys in hand in 60–90 days.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-800 mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="text-red-500 text-xs font-bold tracking-widest mb-2">{item.step}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/how-it-works">
              <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800">
                Learn More About the Import Process
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Coming soon teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-950/60 to-neutral-900 border border-blue-800/30 rounded-2xl p-10 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-600/30 rounded-full px-4 py-1.5 mb-4">
            <span className="text-blue-400 text-sm font-medium">Coming Soon</span>
          </div>
          <h2 className="text-3xl font-black mb-3">Newer Models on the Horizon</h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto mb-8">
            R35 GT-R, GR Supra, FK8 Civic Type R — they&apos;re not import-eligible yet, but you can track
            exactly when they will be.
          </p>
          <Link href="/coming-soon">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8">
              View Coming Soon Vehicles
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
