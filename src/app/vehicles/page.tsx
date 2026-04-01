import { Suspense } from 'react'
import { getEligibleVehicles, getAvailableMakes } from '@/lib/vehicles-api'
import { VehicleCard } from '@/components/vehicle-card'
import { VehicleFilters } from '@/lib/types'
import { VehicleFilterBar } from '@/components/vehicle-filter-bar'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export const metadata = {
  title: 'Browse JDM Vehicles — JDM Direct',
  description: 'Shop our full inventory of import-eligible Japanese Domestic Market vehicles.',
}

export default async function VehiclesPage({ searchParams }: PageProps) {
  const params = await searchParams

  const filters: VehicleFilters = {
    make: params.make,
    model: params.model,
    yearMin: params.yearMin ? parseInt(params.yearMin) : undefined,
    yearMax: params.yearMax ? parseInt(params.yearMax) : undefined,
    priceMin: params.priceMin ? parseInt(params.priceMin) : undefined,
    priceMax: params.priceMax ? parseInt(params.priceMax) : undefined,
    mileageMax: params.mileageMax ? parseInt(params.mileageMax) : undefined,
    transmission: params.transmission,
    sort: params.sort as VehicleFilters['sort'],
  }

  const [vehicles, makes] = await Promise.all([
    getEligibleVehicles(filters),
    getAvailableMakes(),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2">Import-Eligible JDM Vehicles</h1>
        <p className="text-neutral-400">
          All vehicles below are 25+ years old and legally importable to the United States.
        </p>
      </div>

      <Suspense fallback={null}>
        <VehicleFilterBar makes={makes} currentFilters={filters} />
      </Suspense>

      {vehicles.length === 0 ? (
        <div className="text-center py-20 text-neutral-400">
          <div className="text-5xl mb-4">🔍</div>
          <div className="text-xl font-semibold mb-2">No vehicles match your filters</div>
          <div className="text-sm">Try adjusting your search criteria.</div>
        </div>
      ) : (
        <>
          <div className="text-sm text-neutral-500 mb-6">{vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''} found</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
