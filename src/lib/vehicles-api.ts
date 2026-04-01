// Vehicle data adapter — abstracts away the data source.
// Currently uses mock data. Swap fetchFromBeForward() when you have API credentials.
// BeForward dealer API: https://www.beforward.jp/contact/dealer-registration/

import { Vehicle, VehicleFilters } from './types'
import { MOCK_VEHICLES } from './mock-vehicles'
import { isVehicleEligible } from './eligibility'

// ─── BeForward API (activate once you have credentials) ─────────────────────
// async function fetchFromBeForward(): Promise<Vehicle[]> {
//   const res = await fetch(`${process.env.BEFORWARD_API_BASE}/stock/list`, {
//     headers: {
//       'Authorization': `Bearer ${process.env.BEFORWARD_API_KEY}`,
//       'Content-Type': 'application/json',
//     },
//     next: { revalidate: 3600 }, // cache 1 hour
//   })
//   if (!res.ok) throw new Error('BeForward API error')
//   const data = await res.json()
//   return data.vehicles.map(mapBeForwardVehicle)
// }
//
// function mapBeForwardVehicle(v: any): Vehicle {
//   const year = parseInt(v.manufacture_year)
//   const price = parseFloat(v.price_usd)
//   return {
//     id: v.stock_id,
//     make: v.maker_name,
//     model: v.model_name,
//     year,
//     grade: v.grade,
//     mileage: parseInt(v.mileage),
//     engineDisplacement: parseInt(v.displacement),
//     transmission: mapTransmission(v.transmission),
//     drivetrain: v.drive_type,
//     fuelType: v.fuel_type,
//     color: v.color,
//     bodyType: v.body_type,
//     steeringType: 'Right Hand Drive',
//     auctionGrade: v.auction_grade,
//     price,
//     shippingEstimate: estimateShipping(v.body_type),
//     totalLandedCost: price + estimateShipping(v.body_type) + Math.round(price * 0.025),
//     images: v.images || [],
//     features: v.features || [],
//     location: v.location || 'Japan',
//     stockNumber: v.stock_no,
//     source: 'beforward',
//     isEligible: isVehicleEligible(year),
//     eligibilityDate: getEligibilityDate(year),
//   }
// }

async function getAllVehicles(): Promise<Vehicle[]> {
  // TODO: replace with fetchFromBeForward() once API credentials are set
  return MOCK_VEHICLES
}

export async function getEligibleVehicles(filters?: VehicleFilters): Promise<Vehicle[]> {
  const all = await getAllVehicles()
  let vehicles = all.filter((v) => v.isEligible)
  return applyFilters(vehicles, filters)
}

export async function getComingSoonVehicles(): Promise<Vehicle[]> {
  const all = await getAllVehicles()
  return all
    .filter((v) => !v.isEligible)
    .sort((a, b) => a.year - b.year) // closest to eligible first
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const all = await getAllVehicles()
  return all.find((v) => v.id === id) ?? null
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  const eligible = await getEligibleVehicles()
  // Feature top auction-graded vehicles
  return eligible
    .filter((v) => v.auctionGrade && parseFloat(v.auctionGrade) >= 4)
    .slice(0, 4)
}

export async function getAvailableMakes(): Promise<string[]> {
  const eligible = await getEligibleVehicles()
  return [...new Set(eligible.map((v) => v.make))].sort()
}

function applyFilters(vehicles: Vehicle[], filters?: VehicleFilters): Vehicle[] {
  if (!filters) return vehicles

  let result = [...vehicles]

  if (filters.make) result = result.filter((v) => v.make === filters.make)
  if (filters.model) result = result.filter((v) => v.model.toLowerCase().includes(filters.model!.toLowerCase()))
  if (filters.yearMin) result = result.filter((v) => v.year >= filters.yearMin!)
  if (filters.yearMax) result = result.filter((v) => v.year <= filters.yearMax!)
  if (filters.priceMin) result = result.filter((v) => v.price >= filters.priceMin!)
  if (filters.priceMax) result = result.filter((v) => v.price <= filters.priceMax!)
  if (filters.mileageMax) result = result.filter((v) => v.mileage <= filters.mileageMax!)
  if (filters.transmission) result = result.filter((v) => v.transmission === filters.transmission)
  if (filters.bodyType) result = result.filter((v) => v.bodyType === filters.bodyType)

  switch (filters.sort) {
    case 'price_asc': result.sort((a, b) => a.price - b.price); break
    case 'price_desc': result.sort((a, b) => b.price - a.price); break
    case 'year_desc': result.sort((a, b) => b.year - a.year); break
    case 'mileage_asc': result.sort((a, b) => a.mileage - b.mileage); break
  }

  return result
}
