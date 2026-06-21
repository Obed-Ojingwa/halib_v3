# C:\Users\Melody\Documents\haliberrycake\backend\app\schemas\featured_item.py
from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime


class FeaturedItemResponse(BaseModel):
    id: str
    title: str
    image_url: Optional[str] = None
    category_slug: str
    link_override: Optional[str] = None
    group: str
    sort_order: int
    is_active: bool
    is_showcase: bool
    caption: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}

    @field_validator("id", mode="before")
    @classmethod
    def coerce_uuid(cls, v):
        return str(v)


class FeaturedItemCreate(BaseModel):
    title: str
    category_slug: str
    link_override: Optional[str] = None
    group: str = "row_1"
    sort_order: int = 0
    is_active: bool = True
    is_showcase: bool = False
    caption: Optional[str] = None


class FeaturedItemUpdate(BaseModel):
    title: Optional[str] = None
    category_slug: Optional[str] = None
    link_override: Optional[str] = None
    group: Optional[str] = None
    sort_order: Optional[int] = None
    is_active: Optional[bool] = None
    is_showcase: Optional[bool] = None
    caption: Optional[str] = None