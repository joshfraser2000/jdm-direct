export function VehicleCardSkeleton() {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-neutral-800" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-neutral-800 rounded w-3/4" />
        <div className="h-3 bg-neutral-800 rounded w-1/3" />
        <div className="grid grid-cols-2 gap-2 mt-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-3 bg-neutral-800 rounded" />
          ))}
        </div>
        <div className="h-6 bg-neutral-800 rounded w-1/2 mt-2" />
        <div className="h-10 bg-neutral-800 rounded mt-1" />
      </div>
    </div>
  )
}

export function VehicleGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <VehicleCardSkeleton key={i} />
      ))}
    </div>
  )
}
