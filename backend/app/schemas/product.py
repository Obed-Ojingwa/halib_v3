# C:\Users\Melody\Documents\haliberrycake\backend\app\schemas\product.py
from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional


class ProductBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    description: Optional[str] = None
    category: str = Field(
        ...,
        pattern=r'^(wedding|birthday|wedding cakes|birthday cakes|celebration|celebration cakes|cupcakes|loaf cakes|cookies & cookie dippers|cookies and cookie dippers|dessert boxes|sweet treats|african treats collection|learn with haliberry|learn haliberry|cake class|cake_class|desserts|treats)$',
    )
    image_url: Optional[str] = None
    price: float = Field(..., gt=0)
    featured: bool = False
    in_stock: bool = True
    fulfilment_class: str = Field(
        'physical',
        pattern=r'^(physical|digital|quote_only)$',
        description='Physical products can be ordered; digital products are fulfilled electronically; quote-only products require enquiry.',
    )


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=200)
    description: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    featured: Optional[bool] = None
    in_stock: Optional[bool] = None
    fulfilment_class: Optional[str] = Field(
        None,
        pattern=r'^(physical|digital|quote_only)$',
    )


class ProductResponse(ProductBase):
    id: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ProductListResponse(BaseModel):
    items: list[ProductResponse]
    total: int
    page: int
    page_size: int