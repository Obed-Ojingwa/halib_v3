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


def create_sumup_checkout(order: Order, success_url: str, cancel_url: str) -> dict[str, str]:
    if not _credentials_ready():
        logger.error('SumUp secret key is not configured')
        raise HTTPException(status_code=500, detail='SumUp credentials are not configured')

    checkout_url = f"{settings.sumup_base_url.rstrip('/')}/v0.1/checkouts"
    description = f'Order {order.id} — Haliberry Cake'
    payload = {
        'amount': str(order.total_amount),
        'currency': 'GBP',
        'checkout_reference': order.id,
        'merchant_reference': order.id,
        'return_url': success_url,
        'cancel_url': cancel_url,
        'title': 'Haliberry Cake Order',
        'description': description,
    }
    if settings.sumup_pay_to_email:
        payload['pay_to_email'] = settings.sumup_pay_to_email

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

    return {
        'checkout_url': result.get('hosted_checkout_url') or result.get('checkout_url'),
        'checkout_id': result.get('id'),
    }


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
