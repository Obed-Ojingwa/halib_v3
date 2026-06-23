-- Supabase/PostgreSQL schema for Haliberry Cake backend models
-- Run this in Supabase SQL editor or psql for your database.

CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(80) NOT NULL,
    image_url VARCHAR(500),
    price NUMERIC(10,2) NOT NULL,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);
CREATE INDEX IF NOT EXISTS products_featured_idx ON products(featured);

CREATE TABLE IF NOT EXISTS site_settings (
    id TEXT PRIMARY KEY,
    key VARCHAR(100) NOT NULL UNIQUE,
    image_url VARCHAR(500),
    caption TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email VARCHAR(254) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(150),
    is_admin BOOLEAN NOT NULL DEFAULT TRUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);

CREATE TABLE IF NOT EXISTS gallery_images (
    id TEXT PRIMARY KEY,
    image_url VARCHAR(500) NOT NULL,
    category VARCHAR(80) NOT NULL,
    caption TEXT,
    alt_text VARCHAR(300),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS gallery_images_category_idx ON gallery_images(category);
CREATE INDEX IF NOT EXISTS gallery_images_featured_idx ON gallery_images(is_featured);

CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(254) NOT NULL,
    phone VARCHAR(30),
    service_type VARCHAR(80) NOT NULL,
    message TEXT NOT NULL,
    event_date VARCHAR(50),
    budget_range VARCHAR(80),
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    is_replied BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS inquiries_email_idx ON inquiries(email);
CREATE INDEX IF NOT EXISTS inquiries_is_read_idx ON inquiries(is_read);

CREATE TABLE IF NOT EXISTS testimonials (
    id TEXT PRIMARY KEY,
    customer_name VARCHAR(150) NOT NULL,
    customer_role VARCHAR(150),
    message TEXT NOT NULL,
    image_url VARCHAR(500),
    rating INTEGER NOT NULL DEFAULT 5,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_approved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS testimonials_featured_idx ON testimonials(is_featured);

CREATE TABLE IF NOT EXISTS cake_classes (
    id TEXT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    class_date DATE NOT NULL,
    duration_hours NUMERIC(4,1) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    total_slots INTEGER NOT NULL,
    booked_slots INTEGER NOT NULL DEFAULT 0,
    location VARCHAR(300),
    level VARCHAR(50) NOT NULL DEFAULT 'beginner',
    image_url VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS cake_classes_class_date_idx ON cake_classes(class_date);

CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(254) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    delivery_date DATE NOT NULL,
    delivery_type VARCHAR(50) NOT NULL DEFAULT 'delivery',
    delivery_method VARCHAR(50) NOT NULL DEFAULT 'postal',
    delivery_zone VARCHAR(30),
    shipping_fee NUMERIC(10,2) NOT NULL DEFAULT 0.0,
    currency VARCHAR(10) NOT NULL DEFAULT 'GBP',
    notes TEXT,
    total_amount NUMERIC(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_PAYMENT',
    payment_method VARCHAR(50) NOT NULL DEFAULT 'sumup',
    checkout_id VARCHAR(90),
    checkout_url VARCHAR(500),
    sumup_transaction_id VARCHAR(90),
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS orders_customer_email_idx ON orders(customer_email);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_checkout_id_idx ON orders(checkout_id);

CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(36) NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price NUMERIC(10,2) NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    custom_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON order_items(order_id);

-- Optional trigger to update updated_at on row changes
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER site_settings_updated_at
BEFORE UPDATE ON site_settings
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER gallery_images_updated_at
BEFORE UPDATE ON gallery_images
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
