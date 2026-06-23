export type FulfilmentMethod = 'postal' | 'local' | 'collection' | 'digital'
export type DeliveryZone = 'Zone 1' | 'Zone 2' | 'Zone 3'

export const ZONE_OPTIONS = [
  {
    value: 'Zone 1' as DeliveryZone,
    label: 'Zone 1 — Local inner',
    description: 'E, IG, RM',
  },
  {
    value: 'Zone 2' as DeliveryZone,
    label: 'Zone 2 — Greater London',
    description: 'EC, N, NW, SE, SW, W, WC',
  },
  {
    value: 'Zone 3' as DeliveryZone,
    label: 'Zone 3 — Outer',
    description: 'BR, CR, DA, EN, HA, KT, SM, TW, UB, WD',
  },
  {
    value: 'Zone 4' as DeliveryZone,
    label: 'Zone 4 — Extended',
    description: 'AL, CM, CO, GU, ME, RH, SG, SL, SS, TN',
  },
]

const ZONE_1_PREFIXES = [ 'E', 'IG', 'RM' ]
const ZONE_2_PREFIXES = [ 'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC' ]
const ZONE_3_PREFIXES = [ 'BR', 'CR', 'DA', 'EN', 'HA', 'KT', 'SM', 'TW', 'UB', 'WD' ]
const ZONE_4_PREFIXES = [ 'AL', 'CM', 'CO', 'GU', 'ME', 'RH', 'SG', 'SL', 'SS', 'TN' ]
const LOCAL_POSTCODE_PREFIXES = [ ...ZONE_1_PREFIXES, ...ZONE_2_PREFIXES, ...ZONE_3_PREFIXES, ...ZONE_4_PREFIXES ]

export interface ShippingQuote {
  method: FulfilmentMethod
  zone?: DeliveryZone
  fee: number
  available: boolean
  message?: string
}

export function normalizePostcode(value: string | undefined | null): string {
  if (!value) return ''
  return value.trim().toUpperCase().replace(/\s+/g, ' ')
}

export function normalizeZone(value: string | undefined | null): DeliveryZone | null {
  if (!value) return null
  const normalized = value.trim().toLowerCase()
  if (normalized === 'zone 1' || normalized === 'zone1') return 'Zone 1'
  if (normalized === 'zone 2' || normalized === 'zone2') return 'Zone 2'
  if (normalized === 'zone 3' || normalized === 'zone3') return 'Zone 3'
  return null
}

export function getOutwardCode(postcode: string): string | null {
  const normalized = normalizePostcode(postcode)
  if (!normalized) return null
  return normalized.split(' ')[0] || null
}

export function getDeliveryZone(postcode: string): DeliveryZone | null {
  const outward = getOutwardCode(postcode)
  if (!outward) return null

  const prefix = outward.replace(/\d.*$/, '')
  if (ZONE_1_PREFIXES.includes(prefix)) return 'Zone 1'
  if (ZONE_2_PREFIXES.includes(prefix)) return 'Zone 2'
  if (/^[A-Z]{1,2}$/.test(prefix) || /^[A-Z]{1,2}\d/.test(outward)) return 'Zone 3'
  return null
}

export function resolveDeliveryZone(value: string | undefined | null): DeliveryZone | null {
  if (!value) return null
  const zone = normalizeZone(value)
  if (zone) return zone
  return getDeliveryZone(value)
}

export function isLocalDeliveryAllowed(postcodeOrZone: string): boolean {
  const zone = resolveDeliveryZone(postcodeOrZone)
  if (zone) {
    return zone !== 'Zone 3'
  }
  const outward = getOutwardCode(postcodeOrZone)
  if (!outward) return false
  const prefix = outward.replace(/\d.*$/, '')
  return LOCAL_POSTCODE_PREFIXES.includes(prefix)
}

export function getShippingFee(method: FulfilmentMethod, postcodeOrZone?: string): number {
  if (method === 'collection' || method === 'digital') {
    return 0
  }

  // Postal is a flat UK-wide fee for eligible postal products
  if (method === 'postal') {
    return 7.95
  }

  const zone = resolveDeliveryZone(postcodeOrZone)
  if (!zone) {
    return 0
  }

  if (method === 'local') {
    if (zone === 'Zone 1') return 15
    if (zone === 'Zone 2') return 25
    if (zone === 'Zone 3') return 45
    if (zone === 'Zone 4') return 65
    return 0
  }

  return 0
}

export function getShippingQuote(method: FulfilmentMethod, postcodeOrZone?: string): ShippingQuote {
  const quote: ShippingQuote = {
    method,
    fee: 0,
    available: true,
  }

  if (method === 'collection') {
    quote.message = 'Pick up in person from our bakery.'
    return quote
  }

  if (method === 'digital') {
    quote.message = 'Instant digital fulfilment with no delivery fee.'
    return quote
  }

  if (!postcodeOrZone) {
    quote.available = false
    quote.message = 'Select a delivery zone to calculate shipping.'
    return quote
  }

  const zone = resolveDeliveryZone(postcodeOrZone)
  if (!zone) {
    quote.available = false
    quote.message = 'Select a valid delivery zone.'
    return quote
  }

  quote.zone = zone
  quote.fee = getShippingFee(method, zone)

  if (method === 'local' && quote.fee === 0) {
    quote.available = false
    quote.message = 'Unfortunately, hand delivery is not currently available in your area. Please contact Haliberry Cake & Catering for a bespoke quotation.'
    return quote
  }

  quote.message = `Delivery ${method === 'local' ? 'fee' : 'postage fee'} for ${zone}.`
  return quote
}

export function getFulfilmentLabel(method: FulfilmentMethod): string {
  switch (method) {
    case 'postal': return 'UK postal delivery'
    case 'local': return 'Local hand delivery'
    case 'collection': return 'Collection'
    case 'digital': return 'Digital fulfilment'
  }
}
