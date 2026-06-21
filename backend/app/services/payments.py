from typing import Optional
import logging
import httpx
from fastapi import HTTPException
from app.core.config import settings
from app.models.order import Order

logger = logging.getLogger(__name__)


def _credentials_ready() -> bool:
    return bool(settings.sumup_secret_key)


def _sumup_headers() -> dict[str, str]:
    return {
        'Authorization': f'Bearer {settings.sumup_secret_key}',
        'Content-Type': 'application/json',
    }


def build_sumup_payload(order: Order) -> dict[str, object]:
    payload = {
        'amount': float(order.total_amount),
        'currency': 'GBP',
        'checkout_reference': str(order.id),
        'description': f'Order {order.id} — Haliberry Cake',
        'merchant_code': settings.sumup_merchant_code,
    }
    if settings.sumup_pay_to_email:
        payload['pay_to_email'] = settings.sumup_pay_to_email
    return payload


def _normalize_sumup_checkout_response(data: dict[str, object]) -> dict[str, str]:
    checkout_id = data.get('id')
    checkout_url = data.get('hosted_checkout_url') or data.get('checkout_url')
    if not checkout_id or not checkout_url:
        logger.error('SumUp checkout response missing required fields: %s', data)
        raise HTTPException(status_code=500, detail='SumUp returned an invalid checkout response')

    return {
        'checkout_id': str(checkout_id),
        'checkout_url': str(checkout_url),
    }


def create_sumup_checkout(order: Order) -> dict[str, str]:
    if not _credentials_ready():
        logger.error('SumUp secret key is not configured')
        raise HTTPException(status_code=500, detail='SumUp credentials are not configured')

    checkout_url = f"{settings.sumup_base_url.rstrip('/')}/v0.1/checkouts"
    payload = build_sumup_payload(order)

    headers = _sumup_headers()
    try:
        response = httpx.post(checkout_url, json=payload, headers=headers, timeout=20)
        response.raise_for_status()
    except httpx.HTTPStatusError as exc:
        logger.error(
            'SumUp checkout creation failed: %s %s %s',
            checkout_url,
            exc.response.status_code,
            exc.response.text,
        )
        raise HTTPException(
            status_code=500,
            detail=f"SumUp checkout creation failed: {exc.response.status_code} {exc.response.text}",
        )
    except httpx.RequestError as exc:
        logger.error('SumUp request failed: %s', exc)
        raise HTTPException(status_code=500, detail=f"SumUp request failed: {exc}")

    result = response.json()
    return _normalize_sumup_checkout_response(result)


def retrieve_sumup_checkout(checkout_id: str) -> Optional[dict[str, object]]:
    if not _credentials_ready():
        return None

    checkout_url = f"{settings.sumup_base_url.rstrip('/')}/v0.1/checkouts/{checkout_id}"
    headers = _sumup_headers()

    response = httpx.get(checkout_url, headers=headers, timeout=20)
    if response.status_code == 404:
        return None
    response.raise_for_status()
    return response.json()
