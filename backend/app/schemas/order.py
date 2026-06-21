from datetime import datetime, date
from typing import Optional, Literal
from pydantic import BaseModel, Field, EmailStr, field_validator


class OrderItemCreate(BaseModel):
    product_id: str = Field(..., min_length=1)
    quantity: int = Field(..., gt=0)
    custom_message: Optional[str] = None


class OrderCreate(BaseModel):
    customer_name: str = Field(..., min_length=2)
    email: EmailStr
    phone: str = Field(..., min_length=7)
    delivery_date: date
    delivery_type: Literal['delivery', 'pickup'] = 'delivery'
    currency: str = 'GBP'
    notes: Optional[str] = None
    payment_method: Optional[Literal['sumup', 'offline']] = 'sumup'
    items: list[OrderItemCreate]

    @field_validator('delivery_date', mode='before')
    def parse_delivery_date(cls, value):
        if isinstance(value, str):
            return value.strip()
        return value


class OrderItemResponse(BaseModel):
    id: str
    product_id: str
    product_name: str
    quantity: int
    unit_price: float
    total_price: float
    custom_message: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class OrderResponse(BaseModel):
    id: str
    customer_name: str
    email: EmailStr
    phone: Optional[str] = None
    delivery_date: date
    notes: Optional[str] = None
    total_amount: float
    currency: str
    delivery_type: str
    status: str
    payment_method: str
    checkout_id: Optional[str] = None
    checkout_url: Optional[str] = None
    sumup_checkout_id: Optional[str] = None
    sumup_transaction_id: Optional[str] = None
    sumup_checkout_url: Optional[str] = None
    paid_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    items: list[OrderItemResponse]

    model_config = {"from_attributes": True}


class OrderStatusUpdate(BaseModel):
    status: Literal['pending', 'pending_payment', 'paid', 'failed', 'cancelled', 'processing', 'completed']


class OrderPaymentVerifyRequest(BaseModel):
    checkout_id: Optional[str] = None
    order_id: Optional[str] = None


class OrderCheckoutResponse(BaseModel):
    order_id: str
    checkout_id: Optional[str] = None
    checkout_url: Optional[str] = None
