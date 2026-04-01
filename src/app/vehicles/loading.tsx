import { VehicleGridSkeleton } from '@/components/vehicle-card-skeleton'

export default function VehiclesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="h-10 bg-neutral-800 rounded w-72 animate-pulse mb-2" />
        <div className="h-4 bg-neutral-800 rounded w-96 animate-pulse" />
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl h-20 animate-pulse mb-8" />
      <VehicleGridSkeleton count={8} />
    </div>
  )
}
