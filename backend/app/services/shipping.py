import re
from typing import Literal, Optional, Tuple

FulfilmentMethod = Literal['postal', 'local', 'collection', 'digital']
DeliveryZone = Literal['Zone 1', 'Zone 2', 'Zone 3']

ZONE_1_PREFIXES = {
    'E', 'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC',
}
ZONE_2_PREFIXES = {
    'BR', 'CR', 'DA', 'HA', 'IG', 'KT', 'RM', 'SE', 'SM', 'SW', 'TW', 'UB', 'WD',
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

    return 'Zone 3'


def get_shipping_fee(method: FulfilmentMethod, postcode: str | None) -> float:
    if method in {'collection', 'digital'}:
        return 0.0

    if not postcode:
        return 0.0

    zone = get_delivery_zone(postcode)
    if not zone:
        return 0.0

    if method == 'local':
        if zone == 'Zone 1':
            return 8.0
        if zone == 'Zone 2':
            return 12.0
        return 0.0

    if method == 'postal':
        if zone == 'Zone 1':
            return 9.0
        if zone == 'Zone 2':
            return 14.0
        return 18.0

    return 0.0


def validate_shipping(method: FulfilmentMethod, postcode: str | None) -> Tuple[bool, Optional[str], Optional[DeliveryZone], float]:
    if method in {'collection', 'digital'}:
        return True, None, None, 0.0

    if not postcode:
        return False, 'Enter a UK postcode to calculate shipping.', None, 0.0

    normalized = normalize_postcode(postcode)
    if not is_valid_uk_postcode(normalized):
        return False, 'Enter a valid UK postcode.', None, 0.0

    zone = get_delivery_zone(normalized)
    if not zone:
        return False, 'Enter a valid UK postcode.', None, 0.0

    fee = get_shipping_fee(method, normalized)
    if method == 'local' and fee == 0.0:
        return False, 'Local hand delivery is not available for this postcode.', zone, 0.0

    return True, None, zone, fee


def get_fulfilment_label(method: FulfilmentMethod) -> str:
    return {
        'postal': 'UK postal delivery',
        'local': 'Local hand delivery',
        'collection': 'Collection',
        'digital': 'Digital fulfilment',
    }[method]
