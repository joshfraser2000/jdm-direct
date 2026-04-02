export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  grade?: string
  mileage: number // km
  engineDisplacement?: number // cc
  transmission: 'Automatic' | 'Manual' | 'CVT'
  drivetrain: 'FR' | 'FF' | 'AWD' | '4WD' | 'MR' | 'RR'
  fuelType: 'Gasoline' | 'Diesel' | 'Hybrid' | 'Electric'
  color: string
  bodyType: string
  steeringType: 'Right Hand Drive'
  auctionGrade?: string // e.g. "4", "4.5", "3.5"
  price: number // USD
  shippingEstimate: number // USD
  totalLandedCost: number // USD
  images: string[]
  description?: string
  features: string[]
  chassisNumber?: string   // e.g. "JZA80-0012345"
  engineCode?: string      // e.g. "2JZ-GTE"
  horsepower?: number      // PS (Japanese spec)
  torque?: number          // Nm
  doors?: number
  seats?: number
  location: string // Japanese port
  availableDate?: string
  stockNumber: string
  source: 'beforward' | 'goonet' | 'manual'
  isEligible: boolean // 25-year rule
  eligibilityDate?: string // when it becomes eligible
}

export interface Order {
  id: string
  vehicleId: string
  vehicleSnapshot: Vehicle
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: ShippingAddress
  stripePaymentIntentId: string
  stripeSessionId: string
  totalPaid: number
  status: OrderStatus
  notes?: string
  createdAt: string
  updatedAt: string
}

export type OrderStatus =
  | 'payment_pending'
  | 'payment_confirmed'
  | 'sourcing'
  | 'shipping_japan'
  | 'customs'
  | 'shipping_domestic'
  | 'delivered'
  | 'cancelled'

export interface ShippingAddress {
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface VehicleFilters {
  make?: string
  model?: string
  yearMin?: number
  yearMax?: number
  priceMin?: number
  priceMax?: number
  mileageMax?: number
  transmission?: string
  bodyType?: string
  sort?: 'price_asc' | 'price_desc' | 'year_desc' | 'mileage_asc'
}
