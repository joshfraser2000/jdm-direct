'use client'

import Link from 'next/link'
import { Vehicle } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gauge, Fuel, Settings, Calendar, Star } from 'lucide-react'

interface VehicleCardProps {
  vehicle: Vehicle
  comingSoon?: boolean
}

export function VehicleCard({ vehicle, comingSoon = false }: VehicleCardProps) {
  const hasImage = vehicle.images && vehicle.images.length > 0

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
      {/* Image */}
      <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={vehicle.images[0]}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-600">
            <div className="text-center">
              <div className="text-4xl mb-2">🚗</div>
              <div className="text-sm">Photo Coming Soon</div>
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {vehicle.auctionGrade && (
            <Badge className="bg-yellow-500 text-black font-bold text-xs">
              <Star className="w-3 h-3 mr-1" />
              Grade {vehicle.auctionGrade}
            </Badge>
          )}
          {comingSoon && (
            <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
              Eligible {vehicle.eligibilityDate}
            </Badge>
          )}
        </div>

        {comingSoon && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-lg font-bold">Coming Soon</div>
              <div className="text-sm opacity-80">Eligible in {vehicle.eligibilityDate}</div>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Title */}
        <div className="mb-3">
          <h3 className="font-bold text-lg leading-tight">
            {vehicle.year} {vehicle.make} {vehicle.model}
            {vehicle.grade && <span className="text-neutral-500 font-normal"> {vehicle.grade}</span>}
          </h3>
          <p className="text-sm text-neutral-500">Stock #{vehicle.stockNumber}</p>
        </div>

        {/* Specs row */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-neutral-600">
          <div className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-neutral-400" />
            {vehicle.mileage.toLocaleString()} km
          </div>
          <div className="flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5 text-neutral-400" />
            {vehicle.transmission}
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="w-3.5 h-3.5 text-neutral-400" />
            {vehicle.drivetrain}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            {vehicle.location.split(',')[0]}
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="text-2xl font-bold">${vehicle.price.toLocaleString()}</div>
          <div className="text-xs text-neutral-500">
            + ${vehicle.shippingEstimate.toLocaleString()} shipping ·{' '}
            <span className="font-medium text-neutral-700">
              ${vehicle.totalLandedCost.toLocaleString()} total landed
            </span>
          </div>
        </div>

        {/* CTA */}
        {comingSoon ? (
          <Button variant="outline" className="w-full" disabled>
            Not Yet Eligible for Import
          </Button>
        ) : (
          <Link href={`/vehicles/${vehicle.id}`}>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              View Details & Purchase
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
