import { getComingSoonVehicles } from '@/lib/vehicles-api'
import { getYearsUntilEligible } from '@/lib/eligibility'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Clock, Gauge, Settings } from 'lucide-react'
import { WaitlistForm } from '@/components/waitlist-form'

export const metadata = {
  title: 'Coming Soon — JDM Direct',
  description: 'JDM vehicles approaching US import eligibility. Track when they become available.',
}

export default async function ComingSoonPage() {
  const vehicles = await getComingSoonVehicles()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-600/30 rounded-full px-4 py-1.5 mb-4">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="text-blue-400 text-sm font-medium">Not Yet Import Eligible</span>
        </div>
        <h1 className="text-4xl font-black mb-4">Coming Soon</h1>
        <p className="text-neutral-400 text-lg max-w-xl mx-auto">
          These vehicles haven&apos;t hit the 25-year import threshold yet — but they&apos;re on their way.
          Track exactly when each one becomes eligible.
        </p>
      </div>

      {/* 25-year rule explainer */}
      <div className="bg-blue-950/30 border border-blue-800/30 rounded-2xl p-6 mb-12">
        <h2 className="font-bold text-blue-300 mb-2">Why 25 Years?</h2>
        <p className="text-sm text-neutral-400 leading-relaxed">
          US law (49 CFR 591.5) requires that foreign vehicles meet FMVSS safety standards unless they are
          25 or more years old. Once a vehicle crosses that threshold, it can be imported freely without modifications.
          This is why JDM icons like the R34 GT-R and FD RX-7 now command such high prices — they just became eligible.
        </p>
      </div>

      {/* Vehicle grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => {
          const yearsLeft = getYearsUntilEligible(vehicle.year)
          const eligibleYear = vehicle.year + 25

          return (
            <Card key={vehicle.id} className="overflow-hidden border-neutral-800 bg-neutral-900">
              {/* Image with overlay */}
              <div className="relative aspect-[16/10] bg-neutral-800 overflow-hidden">
                {vehicle.images && vehicle.images.length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={vehicle.images[0]}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover opacity-40"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-700">
                    <div className="text-5xl">🚗</div>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-black text-white">{yearsLeft}</div>
                    <div className="text-sm text-neutral-300">year{yearsLeft !== 1 ? 's' : ''} to go</div>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-blue-600 text-white text-xs">Eligible {eligibleYear}</Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                  {vehicle.grade && <span className="text-neutral-500 font-normal text-base"> {vehicle.grade}</span>}
                </h3>

                <div className="flex flex-wrap gap-2 text-sm text-neutral-500 mb-3">
                  <span className="flex items-center gap-1"><Gauge className="w-3 h-3" />{vehicle.mileage.toLocaleString()} km</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Settings className="w-3 h-3" />{vehicle.transmission}</span>
                </div>

                <p className="text-sm text-neutral-400 leading-relaxed mb-4 line-clamp-2">{vehicle.description}</p>

                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-lg font-bold">${vehicle.price.toLocaleString()}</div>
                    <div className="text-xs text-neutral-500">estimated price</div>
                  </div>
                  <span className="text-xs text-blue-400 font-semibold">Available {eligibleYear}</span>
                </div>
                <WaitlistForm
                  vehicleId={vehicle.id}
                  vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  eligibleYear={eligibleYear}
                />
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* CTA to eligible vehicles */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Buy Now?</h2>
        <p className="text-neutral-400 mb-6">Browse our full selection of import-eligible JDM vehicles available today.</p>
        <Link href="/vehicles">
          <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8">
            Browse Eligible Vehicles
          </Button>
        </Link>
      </div>
    </div>
  )
}
