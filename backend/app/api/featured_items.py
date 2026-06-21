# C:\Users\Melody\Documents\haliberrycake\backend\app\api\featured_items.py
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.featured_item import FeaturedItem
from app.schemas.featured_item import (
    FeaturedItemResponse,
    FeaturedItemCreate,
    FeaturedItemUpdate,
)
from app.core.auth import get_current_admin
from app.services.storage import upload_image

router = APIRouter(prefix="/featured-items", tags=["Featured Items"])


@router.get("", response_model=list[FeaturedItemResponse])
def get_featured_items(
    active_only: bool = True,
    db: Session = Depends(get_db),
):
    """
    Public endpoint — returns the homepage 'stories' carousel items.
    Used by HeroSection.tsx. Ordered by group, then sort_order, so the
    frontend can render them straight through without re-sorting.
    """
    query = db.query(FeaturedItem)
    if active_only:
        query = query.filter(FeaturedItem.is_active.is_(True))
    return query.order_by(FeaturedItem.group, FeaturedItem.sort_order).all()


@router.post("", response_model=FeaturedItemResponse)
def create_featured_item(
    payload: FeaturedItemCreate,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    """Admin only — create a new featured item (image attached afterwards via upload)."""
    item = FeaturedItem(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/{item_id}", response_model=FeaturedItemResponse)
def update_featured_item(
    item_id: str,
    payload: FeaturedItemUpdate,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    """Admin only — update title, category link, ordering, visibility, etc."""
    item = db.query(FeaturedItem).filter(FeaturedItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Featured item not found")

    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item


@router.post("/{item_id}/image", response_model=FeaturedItemResponse)
async def upload_featured_item_image(
    item_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    """Admin only — upload/replace the image for a featured item."""
    item = db.query(FeaturedItem).filter(FeaturedItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Featured item not found")

    url = await upload_image(file, folder="featured-items")

    item.image_url = url
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
def delete_featured_item(
    item_id: str,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    """Admin only — remove a featured item entirely."""
    item = db.query(FeaturedItem).filter(FeaturedItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Featured item not found")
    db.delete(item)
    db.commit()
    return {"detail": "Deleted"}