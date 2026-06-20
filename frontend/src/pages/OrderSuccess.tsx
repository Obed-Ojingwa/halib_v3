import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useEffect, useMemo, useState } from 'react'
import { ordersApi } from '@/lib/api'

export default function OrderSuccess() {
  const [searchParams] = useSearchParams()
  const checkoutId = searchParams.get('checkout_id')
  const orderIdQuery = searchParams.get('order_id')

  const [orderId, setOrderId] = useState<string | null>(orderIdQuery)
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!checkoutId) {
      return
    }

    setLoading(true)
    ordersApi.verifyPayment(checkoutId)
      .then((response) => {
        setOrderId(response.data.id)
        setStatus(response.data.status)
      })
      .catch((err) => {
        setError(
          err.response?.data?.detail ||
          err.message ||
          'Unable to verify payment. Please contact support.'
        )
      })
      .finally(() => setLoading(false))
  }, [checkoutId])

  const headline = useMemo(() => {
    if (checkoutId) {
      if (loading) return 'Verifying your payment'
      if (error) return 'Payment verification issue'
      if (status === 'paid') return 'Payment confirmed'
      if (status === 'failed') return 'Payment not completed'
      return 'Order received'
    }
    return 'Your order is confirmed'
  }, [checkoutId, loading, status, error])

  const message = useMemo(() => {
    if (checkoutId) {
      if (loading) return 'Hold tight while we confirm your payment with SumUp.'
      if (error) return 'There was a problem verifying your payment. Please check your email or contact us.'
      if (status === 'paid') return 'Your payment is complete and your cake order has been confirmed.'
      if (status === 'failed') return 'Your payment did not complete successfully. Please try again or contact us for assistance.'
      return 'We have received your order and are processing the payment.'
    }
    return 'We have received your order and a member of the Haliberry Cake team will reach out shortly to confirm the details.'
  }, [checkoutId, loading, status, error])

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      <Helmet>
        <title>Order Confirmation — Haliberry Cake</title>
      </Helmet>

      <div className="rounded-[2rem] border border-[var(--cream)] bg-white p-14 shadow-luxury-sm">
        <p className="text-xs uppercase tracking-[0.28em] font-semibold text-[var(--peach)] mb-4">Thank you</p>
        <h1 className="font-serif text-4xl mb-4">{headline}</h1>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-8">
          {message}
        </p>
        {error && (
          <p className="mb-6 rounded-2xl bg-[#FEE2E2] px-4 py-3 text-sm text-[#B91C1C]">
            {error}
          </p>
        )}
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
