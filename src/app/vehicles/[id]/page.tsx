import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getVehicleById } from '@/lib/vehicles-api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CheckoutButton } from '@/components/checkout-button'
import { VehicleImageGallery } from '@/components/vehicle-image-gallery'
import { Star, Gauge, Settings, Fuel, Calendar, MapPin, FileText, Ship, Shield } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const vehicle = await getVehicleById(id)
  if (!vehicle) return { title: 'Vehicle Not Found' }
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jdmdirect.com'
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.grade ? ` ${vehicle.grade}` : ''} — JDM Direct`
  return {
    title,
    description: vehicle.description,
    openGraph: {
      title,
      description: vehicle.description,
      type: 'website',
      url: `${baseUrl}/vehicles/${vehicle.id}`,
      images: vehicle.images?.[0] ? [{ url: vehicle.images[0], width: 1280, height: 720, alt: title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: vehicle.description,
      images: vehicle.images?.[0] ? [vehicle.images[0]] : [],
    },
    alternates: { canonical: `${baseUrl}/vehicles/${vehicle.id}` },
  }
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { id } = await params
  const vehicle = await getVehicleById(id)

  if (!vehicle) notFound()
  if (!vehicle.isEligible) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">⏳</div>
        <h1 className="text-3xl font-black mb-4">Not Yet Import Eligible</h1>
        <p className="text-neutral-400 mb-8">
          This vehicle becomes eligible for US import in <strong className="text-white">{vehicle.eligibilityDate}</strong> under the 25-year rule.
        </p>
        <Link href="/coming-soon">
          <Button className="bg-blue-600 hover:bg-blue-700">View All Coming Soon</Button>
        </Link>
      </div>
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jdmdirect.com'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.grade ? ` ${vehicle.grade}` : ''}`,
    description: vehicle.description,
    image: vehicle.images ?? [],
    sku: vehicle.stockNumber,
    brand: { '@type': 'Brand', name: vehicle.make },
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/vehicles/${vehicle.id}`,
      priceCurrency: 'USD',
      price: vehicle.totalLandedCost,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/UsedCondition',
    },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Back */}
      <Link href="/vehicles" className="text-sm text-neutral-400 hover:text-white mb-6 inline-flex items-center gap-1">
        ← Back to vehicles
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
        {/* Images */}
        <div>
          <VehicleImageGallery
            images={vehicle.images ?? []}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          />
        </div>

        {/* Details */}
        <div>
          {/* Title & grade badges */}
          <div className="flex items-start gap-3 flex-wrap mb-2">
            {vehicle.auctionGrade && (
              <Badge className="bg-yellow-500 text-black font-bold">
                <Star className="w-3 h-3 mr-1" />
                Auction Grade {vehicle.auctionGrade}
              </Badge>
            )}
            <Badge variant="outline" className="border-green-600 text-green-500">25-Year Compliant</Badge>
          </div>

          <h1 className="text-4xl font-black leading-tight mb-1">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          {vehicle.grade && <p className="text-xl text-neutral-400 mb-4">{vehicle.grade}</p>}

          <p className="text-neutral-300 leading-relaxed mb-6">{vehicle.description}</p>

          {/* Quick specs */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { icon: <Gauge className="w-4 h-4" />, label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} km` },
              { icon: <Settings className="w-4 h-4" />, label: 'Transmission', value: vehicle.transmission },
              { icon: <Fuel className="w-4 h-4" />, label: 'Drivetrain', value: vehicle.drivetrain },
              { icon: <Calendar className="w-4 h-4" />, label: 'Year', value: vehicle.year.toString() },
              ...(vehicle.engineCode ? [{ icon: <Settings className="w-4 h-4" />, label: 'Engine', value: vehicle.engineCode }] : []),
              ...(vehicle.horsepower ? [{ icon: <Gauge className="w-4 h-4" />, label: 'Power', value: `${vehicle.horsepower} PS` }] : []),
              { icon: <MapPin className="w-4 h-4" />, label: 'Location', value: vehicle.location },
              { icon: <FileText className="w-4 h-4" />, label: 'Stock #', value: vehicle.stockNumber },
              ...(vehicle.chassisNumber ? [{ icon: <FileText className="w-4 h-4" />, label: 'Chassis #', value: vehicle.chassisNumber }] : []),
            ].map((spec) => (
              <div key={spec.label} className="bg-neutral-900 rounded-xl p-3 flex items-center gap-3">
                <span className="text-neutral-500">{spec.icon}</span>
                <div>
                  <div className="text-xs text-neutral-500">{spec.label}</div>
                  <div className="text-sm font-semibold">{spec.value}</div>
                </div>
              </div>
            ))}
          </div>

          <Separator className="bg-neutral-800 mb-6" />

          {/* Pricing breakdown */}
          <div className="bg-neutral-900 rounded-xl p-5 mb-6">
            <h3 className="font-bold mb-4 text-lg">Total Landed Cost Breakdown</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-400">Vehicle Price</span>
                <span className="font-semibold">${vehicle.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Ship className="w-3.5 h-3.5" /> RoRo Shipping (Japan → US)
                </span>
                <span className="font-semibold">${vehicle.shippingEstimate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Import Duty + Customs (~2.5%)</span>
                <span className="font-semibold">
                  ${(vehicle.totalLandedCost - vehicle.price - vehicle.shippingEstimate).toLocaleString()}
                </span>
              </div>
              <Separator className="bg-neutral-700" />
              <div className="flex justify-between text-base font-bold">
                <span>Total Landed Cost</span>
                <span className="text-red-400">${vehicle.totalLandedCost.toLocaleString()}</span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                * State registration, compliance inspection, and local delivery not included.
              </p>
            </div>
          </div>

          {/* Buy CTA */}
          <CheckoutButton vehicle={vehicle} />

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { icon: <Shield className="w-4 h-4 text-green-500" />, text: 'Secure Stripe Payment' },
              { icon: <FileText className="w-4 h-4 text-blue-500" />, text: 'Full Documentation' },
              { icon: <Ship className="w-4 h-4 text-yellow-500" />, text: 'RoRo Insured Shipping' },
            ].map((item) => (
              <div key={item.text} className="flex flex-col items-center text-center gap-1.5 bg-neutral-900 rounded-lg p-3">
                {item.icon}
                <span className="text-xs text-neutral-400">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      {vehicle.features && vehicle.features.length > 0 && (
        <div className="mt-14">
          <h2 className="text-2xl font-black mb-6">Features & Options</h2>
          <div className="flex flex-wrap gap-2">
            {vehicle.features.map((f) => (
              <Badge key={f} variant="secondary" className="bg-neutral-800 text-neutral-300 px-3 py-1.5 text-sm">
                {f}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Technical Specifications */}
      {(vehicle.engineCode || vehicle.horsepower || vehicle.torque || vehicle.chassisNumber || vehicle.doors || vehicle.seats) && (
        <div className="mt-14">
          <h2 className="text-2xl font-black mb-6">Technical Specifications</h2>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {[
                  vehicle.engineCode && { label: 'Engine Code', value: vehicle.engineCode },
                  vehicle.engineDisplacement && { label: 'Displacement', value: `${(vehicle.engineDisplacement / 1000).toFixed(1)}L (${vehicle.engineDisplacement}cc)` },
                  vehicle.horsepower && { label: 'Power Output', value: `${vehicle.horsepower} PS` },
                  vehicle.torque && { label: 'Torque', value: `${vehicle.torque} Nm` },
                  { label: 'Drivetrain', value: vehicle.drivetrain },
                  { label: 'Transmission', value: vehicle.transmission },
                  vehicle.doors && { label: 'Doors', value: vehicle.doors.toString() },
                  vehicle.seats && { label: 'Seats', value: vehicle.seats.toString() },
                  vehicle.color && { label: 'Exterior Color', value: vehicle.color },
                  vehicle.chassisNumber && { label: 'Chassis Number', value: vehicle.chassisNumber },
                  { label: 'Stock Number', value: vehicle.stockNumber },
                ].filter(Boolean).map((row, i) => {
                  const r = row as { label: string; value: string }
                  return (
                    <tr key={r.label} className={i % 2 === 0 ? 'bg-neutral-900' : 'bg-neutral-800/40'}>
                      <td className="px-6 py-3 text-neutral-400 w-1/3">{r.label}</td>
                      <td className="px-6 py-3 font-medium">{r.value}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Import info */}
      <div className="mt-14 bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4">About This Import</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-neutral-400">
          <div>
            <div className="font-semibold text-white mb-1">25-Year Rule Compliance</div>
            <p>Vehicles 25+ years old are exempt from FMVSS safety standards under 49 CFR 591.5, making them legally importable without modification.</p>
          </div>
          <div>
            <div className="font-semibold text-white mb-1">Shipping Method</div>
            <p>Roll-on/Roll-off (RoRo) vessels are used — the industry standard for car shipping. Your vehicle drives on and off the ship under its own power.</p>
          </div>
          <div>
            <div className="font-semibold text-white mb-1">Timeline</div>
            <p>Typical delivery is 60–90 days from payment. This includes sourcing in Japan, ocean transit (~3 weeks), customs clearance, and title processing.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
