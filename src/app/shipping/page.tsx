import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Ship, Clock, Shield, MapPin } from 'lucide-react'

export const metadata = {
  title: 'Shipping & Import — JDM Direct',
  description: 'How your JDM vehicle gets from Japan to your driveway. Full shipping cost and timeline breakdown.',
}

const PORT_REGIONS = [
  { port: 'Los Angeles / Long Beach, CA', region: 'West Coast, Southwest', transitTime: '18–22 days', notes: 'Fastest from Japan. Best for CA, NV, AZ, OR, WA.' },
  { port: 'Portland, OR', region: 'Pacific Northwest', transitTime: '18–22 days', notes: 'Good alternative to LA for PNW buyers.' },
  { port: 'Baltimore, MD', region: 'East Coast, Midwest', transitTime: '25–30 days', notes: 'Serves TX, FL, East Coast, and Midwest.' },
  { port: 'Savannah, GA', region: 'Southeast', transitTime: '25–30 days', notes: 'Best for Southeast US.' },
  { port: 'Honolulu, HI', region: 'Hawaii', transitTime: '14–18 days', notes: 'Additional inter-island freight may apply.' },
]

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-14">
        <h1 className="text-5xl font-black mb-4">Shipping & Import</h1>
        <p className="text-neutral-400 text-xl max-w-2xl mx-auto">
          From Japan to your door — every step, every cost, fully transparent.
        </p>
      </div>

      {/* Method */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mb-12">
        <div className="flex items-start gap-4">
          <Ship className="w-10 h-10 text-red-500 shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-black mb-3">Roll-on/Roll-off (RoRo) Shipping</h2>
            <p className="text-neutral-400 leading-relaxed mb-4">
              We exclusively use RoRo vessels — the same method Toyota, Honda, and Nissan use to ship new cars worldwide. Your vehicle
              drives onto the ship under its own power, is secured to the deck, and drives off at the US port. No containers, no
              cranes, no scratches.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { icon: <Shield className="w-5 h-5 text-green-500" />, title: 'Fully Insured', desc: 'Covered at full value during transit' },
                { icon: <Clock className="w-5 h-5 text-blue-500" />, title: '18–30 Day Transit', desc: 'Depending on destination port' },
                { icon: <MapPin className="w-5 h-5 text-yellow-500" />, title: '5 US Ports', desc: 'LA, Portland, Baltimore, Savannah, Honolulu' },
              ].map((item) => (
                <div key={item.title} className="bg-neutral-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">{item.icon}<span className="font-semibold text-sm">{item.title}</span></div>
                  <p className="text-neutral-400 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cost breakdown */}
      <div className="mb-12">
        <h2 className="text-2xl font-black mb-6">Total Cost Breakdown</h2>
        <div className="space-y-3">
          {[
            { item: 'Vehicle Price', desc: 'Auction or dealer price in Japan, shown on each listing', amount: 'Varies' },
            { item: 'International Shipping (RoRo)', desc: 'Japan to your nearest US port. Standard cars: ~$1,800. SUVs/trucks: ~$2,200', amount: '$1,800–$2,200' },
            { item: 'US Import Duty', desc: 'Standard tariff for passenger vehicles from Japan: 2.5% of vehicle value', amount: '~2.5%' },
            { item: 'Customs Brokerage', desc: 'Included in import processing fee — we handle all paperwork', amount: 'Included' },
            { item: 'Port Handling / Unloading', desc: 'Terminal fees at the US port', amount: '~$300–$500' },
            { item: 'Domestic Delivery (optional)', desc: 'Trucking from port to your door. Varies by distance. Free to skip — pick up at port.', amount: '$500–$1,500' },
          ].map((row) => (
            <div key={row.item} className="flex items-start justify-between gap-4 border-b border-neutral-800 pb-3">
              <div>
                <div className="font-semibold text-sm">{row.item}</div>
                <div className="text-neutral-500 text-xs mt-0.5">{row.desc}</div>
              </div>
              <div className="text-sm font-bold text-right shrink-0">{row.amount}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-neutral-600 mt-4">
          Not included: state sales tax, state registration fees, and any local compliance inspections.
          Prices shown are estimates — exact costs shown on each vehicle listing.
        </p>
      </div>

      {/* Port table */}
      <div className="mb-12">
        <h2 className="text-2xl font-black mb-6">US Destination Ports</h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-900 text-neutral-400 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3">Port</th>
                <th className="text-left px-4 py-3">Best For</th>
                <th className="text-left px-4 py-3">Transit Time</th>
                <th className="text-left px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {PORT_REGIONS.map((p, i) => (
                <tr key={p.port} className={`border-t border-neutral-800 ${i % 2 === 0 ? 'bg-neutral-950' : 'bg-neutral-900/50'}`}>
                  <td className="px-4 py-3 font-medium">{p.port}</td>
                  <td className="px-4 py-3 text-neutral-400">{p.region}</td>
                  <td className="px-4 py-3 text-neutral-300">{p.transitTime}</td>
                  <td className="px-4 py-3 text-neutral-500 text-xs">{p.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-12">
        <h2 className="text-2xl font-black mb-6">End-to-End Timeline</h2>
        <div className="space-y-4">
          {[
            { phase: 'Days 1–3', title: 'Order & Payment', desc: 'You pay. We immediately secure your vehicle from our Japan network and begin export documentation.' },
            { phase: 'Days 4–14', title: 'Japan Export Prep', desc: 'De-registration, export certification, pre-shipment inspection. Vehicle prepared for loading.' },
            { phase: 'Days 15–45', title: 'Ocean Transit', desc: 'Vehicle loaded onto RoRo vessel. 18–30 days depending on destination port.' },
            { phase: 'Days 46–60', title: 'Customs & Title', desc: 'Vehicle arrives at US port. EPA/DOT clearance, customs exam, US title issued in your name.' },
            { phase: 'Days 61–90', title: 'Delivery', desc: 'Vehicle released from port. Domestic trucking to your door, or port pickup — your choice.' },
          ].map((step) => (
            <div key={step.phase} className="flex gap-4 items-start">
              <div className="shrink-0 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs font-bold text-red-500 whitespace-nowrap">
                {step.phase}
              </div>
              <div>
                <div className="font-semibold text-sm">{step.title}</div>
                <div className="text-neutral-400 text-sm mt-0.5">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Ready to import your JDM?</h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/vehicles">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8">Browse Vehicles</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 px-8">
              Ask a Question
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
