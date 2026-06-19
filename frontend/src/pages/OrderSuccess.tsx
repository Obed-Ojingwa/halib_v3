import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function OrderSuccess() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('order_id')

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      <Helmet>
        <title>Order Confirmation — Haliberry Cake</title>
      </Helmet>

      <div className="rounded-[2rem] border border-[var(--cream)] bg-white p-14 shadow-luxury-sm">
        <p className="text-xs uppercase tracking-[0.28em] font-semibold text-[var(--peach)] mb-4">Thank you</p>
        <h1 className="font-serif text-4xl mb-4">Your order is confirmed</h1>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-8">
          We have received your order and a member of the Haliberry Cake team will reach out shortly to confirm the details.
        </p>
        {orderId && (
          <p className="mb-6 font-sans text-sm text-[var(--text-secondary)]">
            Order reference: <strong>{orderId}</strong>
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/shop" className="btn-primary">Continue shopping</Link>
          <Link to="/" className="btn-outline">Return home</Link>
        </div>
      </div>
    </section>
  )
}
