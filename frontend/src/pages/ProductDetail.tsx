import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useProduct } from '@/hooks/useProducts'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: product, isLoading, isError } = useProduct(id ?? '')
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [customMessage, setCustomMessage] = useState('')

  if (isLoading) {
    return (
      <section className="py-24 px-4 text-center">
        <p className="text-sm text-[var(--text-secondary)]">Loading product details…</p>
      </section>
    )
  }

  if (isError || !product) {
    return (
      <section className="py-24 px-4 text-center">
        <h1 className="font-serif text-3xl mb-4">Product not found</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-8">The product may have been removed or the link is invalid.</p>
        <Link to="/shop" className="btn-primary">Back to shop</Link>
      </section>
    )
  }

  function handleAddToCart() {
    addToCart(product, quantity, customMessage || undefined)
    navigate('/cart')
  }

  return (
    <>
      <Helmet>
        <title>{product.name} — Haliberry Cake</title>
        <meta name="description" content={product.description ?? `Order ${product.name} from Haliberry Cake.`} />
      </Helmet>

      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-start">
          <div className="rounded-[2rem] overflow-hidden bg-white border border-[var(--cream)] shadow-luxury-sm">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-[520px] object-cover" />
            ) : (
              <div className="w-full h-[520px] flex items-center justify-center bg-[var(--cream)]">
                <span className="text-6xl">🎂</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.22em] text-[var(--peach)] mb-2">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <h1 className="font-serif text-4xl font-semibold leading-tight">{product.name}</h1>
              </div>
              <p className="font-serif text-3xl">£{product.price.toFixed(0)}</p>
            </div>

            <p className="font-sans text-sm leading-relaxed text-[var(--text-secondary)]">{product.description}</p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-3xl bg-[#FDF7F2] p-5 border border-[var(--cream)]">
                  <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--text-secondary)] mb-3">Quantity</p>
                  <div className="inline-flex items-center rounded-full bg-white border border-[var(--cream)] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                      className="px-4 py-3 text-[var(--text-primary)]"
                    >-</button>
                    <span className="px-6 text-base font-semibold">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((value) => value + 1)}
                      className="px-4 py-3 text-[var(--text-primary)]"
                    >+</button>
                  </div>
                </div>

                <div className="rounded-3xl bg-[#FDF7F2] p-5 border border-[var(--cream)]">
                  <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--text-secondary)] mb-3">Custom message</p>
                  <textarea
                    value={customMessage}
                    onChange={(event) => setCustomMessage(event.target.value)}
                    rows={4}
                    placeholder="Write a special note for your cake…"
                    className="w-full rounded-2xl border border-[var(--cream)] bg-white px-4 py-3 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button onClick={handleAddToCart} className="btn-primary w-full sm:w-auto">
                  Add to cart
                </button>
                <Link to="/cart" className="btn-outline w-full sm:w-auto text-center">
                  View cart
                </Link>
              </div>

              <div className="rounded-3xl bg-[#F9F2EC] border border-[var(--apricot)] p-5 text-sm leading-relaxed">
                <p className="font-semibold mb-2">Need help with your order?</p>
                <p className="text-[var(--text-secondary)]">
                  If you would like a tailored cake design or have event-specific requirements, send an enquiry through the shop page and Halimot will help you plan every detail.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
