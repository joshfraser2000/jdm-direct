'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Vehicle } from '@/lib/types'

interface VehicleCardProps {
  vehicle: Vehicle
  comingSoon?: boolean
}

function CardImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ background: '#111', color: '#555', fontSize: '0.8rem' }}>
        <span className="rpm-heading tracking-widest">PHOTO COMING SOON</span>
      </div>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="w-full h-full object-cover" onError={() => setFailed(true)} />
  )
}

export function VehicleCard({ vehicle, comingSoon = false }: VehicleCardProps) {
  const hasImage = vehicle.images && vehicle.images.length > 0

  const cardInner = (
    <div className="vehicle-card-rpm rounded-sm relative" style={{ position: 'relative' }}>
      {/* Image */}
      <div className="card-img-wrap" style={{ aspectRatio: '16/10', background: '#111' }}>
        {hasImage ? (
          <CardImage
            src={vehicle.images[0]}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ color: '#555' }}>
            <span className="rpm-heading tracking-widest text-xs">PHOTO COMING SOON</span>
          </div>
        )}

        {/* Hover overlay with CTA */}
        {!comingSoon && (
          <div className="card-overlay">
            <span className="btn-rpm px-6 py-2 text-xs">View Details</span>
          </div>
        )}

        {/* Coming soon overlay */}
        {comingSoon && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: 'rgba(1,1,1,0.65)' }}
          >
            <span className="rpm-heading font-bold tracking-widest" style={{ color: '#fefefe', fontSize: '0.9rem' }}>COMING SOON</span>
            <span className="rpm-heading font-light tracking-widest mt-1" style={{ color: '#aaa', fontSize: '0.7rem' }}>
              ELIGIBLE {vehicle.eligibilityDate}
            </span>
          </div>
        )}

        {/* Auction grade badge */}
        {vehicle.auctionGrade && (
          <div
            className="absolute top-2 left-2 rpm-heading font-bold text-xs px-2 py-0.5"
            style={{ background: '#d31f26', color: '#fefefe', letterSpacing: '0.05em' }}
          >
            GRADE {vehicle.auctionGrade}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3
          className="rpm-heading font-medium tracking-widest leading-tight mb-1"
          style={{ color: '#fefefe', fontSize: '0.85rem' }}
        >
          {vehicle.year} {vehicle.make} {vehicle.model}
          {vehicle.grade && (
            <span style={{ color: '#777', fontWeight: 300 }}> {vehicle.grade}</span>
          )}
        </h3>

        <p className="rpm-heading font-light tracking-widest mb-3" style={{ color: '#d31f26', fontSize: '0.7rem' }}>
          JDM Direct
        </p>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4" style={{ fontSize: '0.72rem' }}>
          <div>
            <dt className="rpm-heading font-light tracking-widest" style={{ color: '#777', fontSize: '0.6rem' }}>MILEAGE</dt>
            <dd style={{ color: '#aaa' }}>{vehicle.mileage.toLocaleString()} km</dd>
          </div>
          <div>
            <dt className="rpm-heading font-light tracking-widest" style={{ color: '#777', fontSize: '0.6rem' }}>TRANS</dt>
            <dd style={{ color: '#aaa' }}>{vehicle.transmission}</dd>
          </div>
          <div>
            <dt className="rpm-heading font-light tracking-widest" style={{ color: '#777', fontSize: '0.6rem' }}>DRIVE</dt>
            <dd style={{ color: '#aaa' }}>{vehicle.drivetrain}</dd>
          </div>
          <div>
            <dt className="rpm-heading font-light tracking-widest" style={{ color: '#777', fontSize: '0.6rem' }}>LOCATION</dt>
            <dd style={{ color: '#aaa' }}>{vehicle.location.split(',')[0]}</dd>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <div
              className="rpm-heading font-medium tracking-widest"
              style={{ color: '#aaa', fontSize: '1.3rem' }}
            >
              ${vehicle.price.toLocaleString()}
            </div>
            <div style={{ color: '#555', fontSize: '0.65rem' }}>
              ${vehicle.totalLandedCost.toLocaleString()} total landed
            </div>
          </div>

          {comingSoon && (
            <span
              className="rpm-heading font-light tracking-widest text-xs px-3 py-1"
              style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#777', borderRadius: '0.35rem' }}
            >
              {vehicle.eligibilityDate}
            </span>
          )}
        </div>
      </div>
    </div>
  )

  if (comingSoon) return cardInner

  return (
    <Link href={`/vehicles/${vehicle.id}`} className="block">
      {cardInner}
    </Link>
  )
}
