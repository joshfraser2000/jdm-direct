'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { VehicleFilters } from '@/lib/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCallback, useRef } from 'react'

interface VehicleFilterBarProps {
  makes: string[]
  currentFilters: VehicleFilters
}

export function VehicleFilterBar({ makes, currentFilters }: VehicleFilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const updateFilter = useCallback(
    (key: string, value: string | null | undefined) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== 'all') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`/vehicles?${params.toString()}`)
    },
    [router, searchParams],
  )

  const updateFilterDebounced = useCallback(
    (key: string, value: string | undefined) => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => updateFilter(key, value), 400)
    },
    [updateFilter],
  )

  const clearFilters = () => router.push('/vehicles')
  const hasFilters = Object.values(currentFilters).some(Boolean)

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 mb-8">
      <div className="flex flex-wrap gap-3 items-end">
        {/* Make */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-500 font-medium">Make</label>
          <Select value={currentFilters.make || 'all'} onValueChange={(v) => updateFilter('make', v)}>
            <SelectTrigger className="w-36 bg-neutral-800 border-neutral-700 text-white">
              <SelectValue placeholder="Any Make" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
              <SelectItem value="all">Any Make</SelectItem>
              {makes.map((make) => (
                <SelectItem key={make} value={make}>{make}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Transmission */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-500 font-medium">Transmission</label>
          <Select value={currentFilters.transmission || 'all'} onValueChange={(v) => updateFilter('transmission', v)}>
            <SelectTrigger className="w-36 bg-neutral-800 border-neutral-700 text-white">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="Automatic">Automatic</SelectItem>
              <SelectItem value="CVT">CVT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Max Price — debounced */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-500 font-medium">Max Price (USD)</label>
          <Input
            type="number"
            placeholder="e.g. 50000"
            defaultValue={currentFilters.priceMax}
            className="w-36 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600"
            onChange={(e) => updateFilterDebounced('priceMax', e.target.value || undefined)}
          />
        </div>

        {/* Max Mileage — debounced */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-500 font-medium">Max Mileage (km)</label>
          <Input
            type="number"
            placeholder="e.g. 100000"
            defaultValue={currentFilters.mileageMax}
            className="w-36 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600"
            onChange={(e) => updateFilterDebounced('mileageMax', e.target.value || undefined)}
          />
        </div>

        {/* Sort */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-500 font-medium">Sort By</label>
          <Select value={currentFilters.sort || 'default'} onValueChange={(v) => updateFilter('sort', v)}>
            <SelectTrigger className="w-40 bg-neutral-800 border-neutral-700 text-white">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="year_desc">Newest First</SelectItem>
              <SelectItem value="mileage_asc">Lowest Mileage</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasFilters && (
          <Button variant="ghost" onClick={clearFilters} className="text-neutral-400 hover:text-white self-end">
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  )
}
