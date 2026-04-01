'use client'

import { useState } from 'react'

interface VehicleImageGalleryProps {
  images: string[]
  alt: string
}

function ImageWithFallback({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center text-neutral-600 text-center bg-neutral-900">
        <div>
          <div className="text-6xl mb-3">🚗</div>
          <div className="text-sm">Photo Coming Soon</div>
        </div>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}

export function VehicleImageGallery({ images, alt }: VehicleImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/3] bg-neutral-900 rounded-2xl flex items-center justify-center text-neutral-600 text-center">
        <div>
          <div className="text-6xl mb-3">🚗</div>
          <div className="text-sm">Photo Coming Soon</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="aspect-[4/3] bg-neutral-900 rounded-2xl overflow-hidden mb-3">
        <ImageWithFallback
          src={images[activeIndex]}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-2">
          {images.slice(0, 3).map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`aspect-[4/3] bg-neutral-900 rounded-lg overflow-hidden border-2 transition-colors ${
                activeIndex === i ? 'border-red-500' : 'border-transparent'
              }`}
            >
              <ImageWithFallback src={img} alt={`${alt} view ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
