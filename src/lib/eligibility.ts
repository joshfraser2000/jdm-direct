// US 25-Year Import Rule: Vehicles must be at least 25 years old
// to be imported without meeting FMVSS safety standards.

const ELIGIBLE_AGE = 25

export function getEligibilityYear(): number {
  return new Date().getFullYear() - ELIGIBLE_AGE
}

export function isVehicleEligible(year: number): boolean {
  return year <= getEligibilityYear()
}

export function getEligibilityDate(year: number): string {
  if (isVehicleEligible(year)) return 'Eligible Now'
  const eligibleYear = year + ELIGIBLE_AGE
  return `${eligibleYear}`
}

export function getYearsUntilEligible(year: number): number {
  if (isVehicleEligible(year)) return 0
  return year + ELIGIBLE_AGE - new Date().getFullYear()
}
