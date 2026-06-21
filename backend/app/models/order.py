import uuid
from datetime import datetime, date, timezone
from sqlalchemy import String, Text, Numeric, DateTime, Date, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.session import Base


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    customer_name: Mapped[str] = mapped_column(String(150), nullable=False)
    email: Mapped[str] = mapped_column("customer_email", String(254), nullable=False, index=True)
    phone: Mapped[str] = mapped_column("customer_phone", String(30), nullable=False)
    delivery_date: Mapped[date] = mapped_column(Date, nullable=False)
    delivery_type: Mapped[str] = mapped_column(String(50), nullable=False, default='delivery')
    currency: Mapped[str] = mapped_column(String(10), nullable=False, default='GBP')
    notes: Mapped[str | None] = mapped_column(Text)
    total_amount: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default='PENDING_PAYMENT', index=True)
    payment_method: Mapped[str] = mapped_column(String(50), nullable=False, default='sumup')
    checkout_id: Mapped[str | None] = mapped_column(String(90), nullable=True, index=True)
    checkout_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    sumup_transaction_id: Mapped[str | None] = mapped_column(String(90), nullable=True, index=True)
    paid_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    @property
    def sumup_checkout_id(self) -> str | None:
        return self.checkout_id

    @property
    def sumup_checkout_url(self) -> str | None:
        return self.checkout_url

    items: Mapped[list['OrderItem']] = relationship(
        'OrderItem', back_populates='order', cascade='all, delete-orphan', lazy='joined'
    )


class OrderItem(Base):
    __tablename__ = 'order_items'

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_id: Mapped[str] = mapped_column(ForeignKey('orders.id', ondelete='CASCADE'), nullable=False, index=True)
    product_id: Mapped[str] = mapped_column(String(36), nullable=False)
    product_name: Mapped[str] = mapped_column(String(200), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    unit_price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    total_price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    custom_message: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    order: Mapped['Order'] = relationship('Order', back_populates='items')
