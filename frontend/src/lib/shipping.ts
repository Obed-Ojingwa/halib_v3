export type FulfilmentMethod = 'postal' | 'local' | 'collection' | 'digital'
export type DeliveryZone = 'Zone 1' | 'Zone 2' | 'Zone 3'

const ZONE_1_PREFIXES = [
  'E', 'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC',
]
const ZONE_2_PREFIXES = [
  'BR', 'CR', 'DA', 'HA', 'IG', 'KT', 'RM', 'SE', 'SM', 'SW', 'TW', 'UB', 'WD',
]
const LOCAL_POSTCODE_PREFIXES = [
  ...ZONE_1_PREFIXES,
  ...ZONE_2_PREFIXES,
]

export interface ShippingQuote {
  method: FulfilmentMethod
  postcode?: string
  zone?: DeliveryZone
  fee: number
  available: boolean
  message?: string
}

export function normalizePostcode(value: string | undefined | null): string {
  if (!value) return ''
  return value.trim().toUpperCase().replace(/\s+/g, ' ')
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

export function isLocalDeliveryAllowed(postcode: string): boolean {
  const outward = getOutwardCode(postcode)
  if (!outward) return false
  const prefix = outward.replace(/\d.*$/, '')
  return LOCAL_POSTCODE_PREFIXES.includes(prefix)
}

export function getShippingFee(method: FulfilmentMethod, postcode?: string): number {
  const normalizedPostcode = normalizePostcode(postcode)

  if (method === 'collection' || method === 'digital') {
    return 0
  }

  const zone = getDeliveryZone(normalizedPostcode)
  if (!zone) {
    return 0
  }

  if (method === 'local') {
    if (zone === 'Zone 1') return 8
    if (zone === 'Zone 2') return 12
    return 0
  }

  if (method === 'postal') {
    if (zone === 'Zone 1') return 9
    if (zone === 'Zone 2') return 14
    return 18
  }

  return 0
}

export function getShippingQuote(method: FulfilmentMethod, postcode?: string): ShippingQuote {
  const normalizedPostcode = normalizePostcode(postcode)
  const quote: ShippingQuote = {
    method,
    postcode: normalizedPostcode || undefined,
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

  if (!normalizedPostcode) {
    quote.available = false
    quote.message = 'Enter a UK postcode to calculate shipping.'
    return quote
  }

  const zone = getDeliveryZone(normalizedPostcode)
  if (!zone) {
    quote.available = false
    quote.message = 'Please enter a valid UK postcode.'
    return quote
  }

  quote.zone = zone
  quote.fee = getShippingFee(method, normalizedPostcode)

  if (method === 'local' && quote.fee === 0) {
    quote.available = false
    quote.message = 'Local hand delivery is not available for this postcode.'
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
