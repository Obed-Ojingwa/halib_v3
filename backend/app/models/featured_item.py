# C:\Users\Melody\Documents\haliberrycake\backend\app\models\featured_item.py
import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Text, Integer, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from app.database.session import Base


class FeaturedItem(Base):
    """
    A single 'story' tile shown in the homepage Instagram-style carousel
    (HeroSection.tsx). Each item links through to a real shop category.

    `group` separates the two visual rows currently hardcoded in the
    frontend as `featuredCakes` and `featuredCakes1` — kept only so the
    admin can preserve that grouping/order if desired. The frontend can
    just as easily render everything as a single flat row; `group` plus
    `sort_order` gives it full control either way.
    """
    __tablename__ = "featured_items"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )

    # Display title, e.g. "🎂 Celebration Cakes" — emoji included by admin if wanted
    title: Mapped[str] = mapped_column(String(120), nullable=False)

    # Uploaded image URL (Supabase Storage, same as SiteSetting.image_url)
    image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # Free-text slug matched against Product.category / CategoryFilter values,
    # e.g. "wedding cakes", "loaf cakes", "learn with haliberry"
    category_slug: Mapped[str] = mapped_column(String(100), nullable=False)

    # Optional override: if set, clicking the tile goes here instead of
    # /shop?category=<category_slug> — needed for e.g. "Learn With Haliberry"
    # which should route to /cake-classes, not the shop.
    link_override: Mapped[str | None] = mapped_column(String(300), nullable=True)

    # Which visual row/group this belongs to (e.g. "row_1", "row_2").
    group: Mapped[str] = mapped_column(String(50), nullable=False, default="row_1")

    # Manual ordering within a group
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    # Toggle visibility without deleting
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    # Also show this item's image in the rotating "This Week's Favourite"
    # showcase card / background slider
    is_showcase: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    caption: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )