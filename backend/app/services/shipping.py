import re
from typing import Literal, Optional, Tuple

FulfilmentMethod = Literal['postal', 'local', 'collection', 'digital']
DeliveryZone = Literal['Zone 1', 'Zone 2', 'Zone 3']

ZONE_1_PREFIXES = {
    'E', 'IG', 'RM',
}
ZONE_2_PREFIXES = {
    'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC',
}
ZONE_3_PREFIXES = {
    'BR', 'CR', 'DA', 'EN', 'HA', 'KT', 'SM', 'TW', 'UB', 'WD',
}
ZONE_4_PREFIXES = {
    'AL', 'CM', 'CO', 'GU', 'ME', 'RH', 'SG', 'SL', 'SS', 'TN',
}

_POSTCODE_RE = re.compile(r'^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$', re.IGNORECASE)


def normalize_postcode(value: str | None) -> str:
    if not value:
        return ''
    return ' '.join(value.strip().upper().split())


def get_outward_code(postcode: str) -> Optional[str]:
    normalized = normalize_postcode(postcode)
    if not normalized:
        return None

    return normalized.split(' ')[0]


def is_valid_uk_postcode(postcode: str) -> bool:
    return bool(_POSTCODE_RE.match(postcode.strip()))


def get_delivery_zone(postcode: str) -> Optional[DeliveryZone]:
    if not is_valid_uk_postcode(postcode):
        return None

    outward = get_outward_code(postcode)
    if not outward:
        return None

    prefix = outward.replace(r"\d.*$", '')
    prefix = re.sub(r'\d.*$', '', outward)

    if prefix in ZONE_1_PREFIXES:
        return 'Zone 1'
    if prefix in ZONE_2_PREFIXES:
        return 'Zone 2'
    if prefix in ZONE_3_PREFIXES:
        return 'Zone 3'
    if prefix in ZONE_4_PREFIXES:
        return 'Zone 4'

    return 'Zone 3'


def resolve_zone(value: str | None) -> Optional[DeliveryZone]:
    if not value:
        return None

    normalized = value.strip().title()
    if normalized in {'Zone 1', 'Zone 2', 'Zone 3'}:
        return normalized  # type: ignore[return-value]

    return get_delivery_zone(value)


def get_shipping_fee(method: FulfilmentMethod, postcode_or_zone: str | None) -> float:
    if method in {'collection', 'digital'}:
        return 0.0

    # Postal is a flat UK-wide fee for eligible postal products
    if method == 'postal':
        return 7.95

    zone = resolve_zone(postcode_or_zone)
    if not zone:
        return 0.0

    if method == 'local':
        if zone == 'Zone 1':
            return 15.0
        if zone == 'Zone 2':
            return 25.0
        if zone == 'Zone 3':
            return 45.0
        if zone == 'Zone 4':
            return 65.0
        return 0.0

    return 0.0


def validate_shipping(method: FulfilmentMethod, postcode_or_zone: str | None) -> Tuple[bool, Optional[str], Optional[DeliveryZone], float]:
    if method in {'collection', 'digital'}:
        return True, None, None, 0.0

    if not postcode_or_zone:
        return False, 'Enter a delivery zone or postcode to calculate shipping.', None, 0.0

    zone = resolve_zone(postcode_or_zone)
    if not zone:
        return False, 'Enter a valid UK postcode or zone (Zone 1, Zone 2, Zone 3).', None, 0.0

    fee = get_shipping_fee(method, zone)
    if method == 'local' and fee == 0.0:
        return False, 'Local hand delivery is not available for this zone.', zone, 0.0

    return True, None, zone, fee


def get_fulfilment_label(method: FulfilmentMethod) -> str:
    return {
        'postal': 'UK postal delivery',
        'local': 'Local hand delivery',
        'collection': 'Collection',
        'digital': 'Digital fulfilment',
    }[method]
