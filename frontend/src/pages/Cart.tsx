import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ordersApi } from '@/lib/api'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'
import { getShippingQuote } from '@/lib/shipping'

const schema = z.object({
  customer_name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  delivery_date: z.string().min(1, 'Please select a delivery date'),
  delivery_method: z.enum(['postal', 'local', 'collection', 'digital']),
  delivery_postcode: z.string().optional(),
  notes: z.string().optional(),
}).superRefine((values, ctx) => {
  if (values.delivery_method === 'postal' || values.delivery_method === 'local') {
    if (!values.delivery_postcode || !values.delivery_postcode.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['delivery_postcode'],
        message: 'Postcode is required for delivery.',
      })
    }
  }
})

type FormValues = z.infer<typeof schema>

export default function CartPage() {
  const navigate = useNavigate()
  const { items, subtotal, updateQuantity, updateMessage, removeFromCart, clearCart } = useCart()
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      customer_name: '',
      email: '',
      phone: '',
      delivery_date: '',
      delivery_method: 'postal',
      delivery_postcode: '',
      notes: '',
    },
  })

  const mutation = useMutation({
    mutationFn: async (payload: FormValues) => {
      const delivery_type = payload.delivery_method === 'collection' ? 'pickup' : 'delivery'
      const response = await ordersApi.create({
        ...payload,
        payment_method: 'sumup',
        delivery_type,
        currency: 'GBP',
        items: items.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          custom_message: item.custom_message,
        })),
      })
      return response.data
    },
    onSuccess(data) {
      if (data.checkout_url) {
        window.location.href = data.checkout_url
        return
      }
      clearCart()
      navigate(`/order-success?order_id=${data.order_id}`)
    },
  })

  const hasItems = items.length > 0
  const hasQuoteOnly = items.some(item => item.fulfilment_class === 'quote_only')
  const hasDigital = items.some(item => item.fulfilment_class === 'digital')
  const hasPhysical = items.some(item => !item.fulfilment_class || item.fulfilment_class === 'physical')
  const requiresDigitalOnly = hasDigital && !hasPhysical
  const requiresPhysicalOnly = hasPhysical && !hasDigital

  const deliveryMethod = watch('delivery_method')
  const deliveryPostcode = watch('delivery_postcode')
  const shippingQuote = getShippingQuote(deliveryMethod, deliveryPostcode)
  const estimatedTotal = subtotal + (shippingQuote.available ? shippingQuote.fee : 0)

  const fulfilmentMismatch = (requiresDigitalOnly && deliveryMethod !== 'digital') || (requiresPhysicalOnly && deliveryMethod === 'digital')
  const fulfilmentMismatchMessage = requiresDigitalOnly
    ? 'This cart contains only digital products, so digital fulfilment must be selected.'
    : requiresPhysicalOnly && deliveryMethod === 'digital'
      ? 'Digital fulfilment is not valid for physical products. Choose postal, local, or collection.'
      : ''

  function onSubmit(values: FormValues) {
    if (!hasItems || hasQuoteOnly || (hasDigital && hasPhysical) || fulfilmentMismatch) return
    mutation.mutate(values)
  }

  return (
    <>
      <Helmet>
        <title>Cart — Haliberry Cake</title>
        <meta name="description" content="Review your order and complete checkout with Haliberry Cake." />
      </Helmet>

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[var(--peach)] mb-3">Shopping cart</p>
            <h1 className="font-serif text-4xl">Your order</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
              Confirm your cake selection, add any special instructions, and proceed to secure checkout.
            </p>
          </div>
          <div className="rounded-3xl border border-[var(--cream)] bg-white p-5 shadow-luxury-sm">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-3">Order summary</p>
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Item total</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Shipping estimate</span>
              <span>{shippingQuote.available ? `£${shippingQuote.fee.toFixed(2)}` : 'TBD'}</span>
            </div>
            <div className="border-t border-[var(--cream)] pt-3 flex items-center justify-between font-semibold text-base">
              <span>Total</span>
              <span>£{estimatedTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {hasItems ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
            <motion.div variants={fadeUp} className="space-y-6">
              {items.map(item => (
                <div key={item.product_id} className="rounded-[2rem] border border-[var(--cream)] bg-white p-6 shadow-luxury-sm">
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="w-24 h-24 rounded-3xl overflow-hidden bg-[var(--cream)] flex-shrink-0">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-2xl">🎂</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h2 className="font-serif text-xl font-semibold text-[var(--text-primary)]">{item.product_name}</h2>
                          <p className="text-sm text-[var(--text-secondary)]">£{item.unit_price.toFixed(2)} each</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product_id)}
                          className="text-sm text-[var(--text-secondary)] hover:text-[var(--peach)]"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-5 grid gap-4 sm:grid-cols-[1fr,1.2fr] items-center">
                        <div className="flex items-center gap-2 rounded-full border border-[var(--cream)] bg-[#FDF7F2] px-3 py-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                            className="font-semibold"
                          >
                            −
                          </button>
                          <span className="min-w-[2rem] text-center font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            className="font-semibold"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          Subtotal: £{(item.unit_price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      <label className="mt-5 block text-sm font-medium text-[var(--text-secondary)]">Custom message</label>
                      <textarea
                        value={item.custom_message ?? ''}
                        onChange={(event) => updateMessage(item.product_id, event.target.value)}
                        rows={3}
                        className="mt-2 w-full rounded-2xl border border-[var(--cream)] bg-[#FDF7F2] p-4 text-sm outline-none"
                        placeholder="Add any special instructions or flavour notes"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-[2rem] border border-[var(--cream)] bg-white p-6 shadow-luxury-sm">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-5">Checkout details</p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">Name</label>
                  <input
                    {...register('customer_name')}
                    className="w-full rounded-2xl border border-[var(--cream)] bg-[#FDF7F2] px-4 py-3 text-sm outline-none"
                    placeholder="Jane Smith"
                  />
                  {errors.customer_name && <p className="text-red-500 text-xs mt-1">{errors.customer_name.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">Email</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full rounded-2xl border border-[var(--cream)] bg-[#FDF7F2] px-4 py-3 text-sm outline-none"
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">Phone</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full rounded-2xl border border-[var(--cream)] bg-[#FDF7F2] px-4 py-3 text-sm outline-none"
                    placeholder="+44 7700 000000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">Delivery or collection date</label>
                  <input
                    {...register('delivery_date')}
                    type="date"
                    className="w-full rounded-2xl border border-[var(--cream)] bg-[#FDF7F2] px-4 py-3 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">Fulfilment method</label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      { value: 'postal', label: 'UK postal delivery' },
                      { value: 'local', label: 'Local hand delivery' },
                      { value: 'collection', label: 'Collection' },
                      { value: 'digital', label: 'Digital fulfilment' },
                    ].map((option) => (
                      <label key={option.value} className="inline-flex items-center gap-3 rounded-2xl border border-[var(--cream)] bg-[#FDF7F2] px-4 py-3 text-sm cursor-pointer">
                        <input
                          {...register('delivery_method')}
                          type="radio"
                          value={option.value}
                          className="h-4 w-4 accent-[var(--peach)]"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {(deliveryMethod === 'postal' || deliveryMethod === 'local') && (
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">Postcode</label>
                    <input
                      {...register('delivery_postcode')}
                      className="w-full rounded-2xl border border-[var(--cream)] bg-[#FDF7F2] px-4 py-3 text-sm outline-none"
                      placeholder="e.g. SW1A 1AA"
                    />
                    {errors.delivery_postcode && <p className="text-red-500 text-xs mt-1">{errors.delivery_postcode.message}</p>}
                  </div>
                )}

                <div className="rounded-3xl border border-[var(--cream)] bg-[#F9F2EC] p-5 text-sm leading-relaxed">
                  <p className="font-semibold mb-2">Shipping quote</p>
                  <p className="text-[var(--text-secondary)] mb-2">
                    {shippingQuote.message ?? 'Choose a fulfilment method to see the quote.'}
                  </p>
                  {shippingQuote.available && shippingQuote.fee !== 0 && (
                    <p className="font-semibold">£{shippingQuote.fee.toFixed(2)} ({shippingQuote.zone})</p>
                  )}
                  {shippingQuote.available && shippingQuote.fee === 0 && (
                    <p className="font-semibold">No delivery fee.</p>
                  )}
                  <p className="text-xs text-[var(--text-secondary)] mt-2">If you need help with custom delivery, contact us before checkout.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">Additional notes</label>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    className="w-full rounded-2xl border border-[var(--cream)] bg-[#FDF7F2] px-4 py-3 text-sm outline-none"
                    placeholder="Add delivery instructions, flavour preferences or celebration details"
                  />
                </div>

                {hasQuoteOnly && (
                  <div className="rounded-2xl bg-[#FEF3C7] px-4 py-3 text-sm text-[#92400E]">
                    One or more items in your cart require a custom quote and cannot be purchased through checkout. Please enquire instead.
                  </div>
                )}
                {hasDigital && hasPhysical && (
                  <div className="rounded-2xl bg-[#FEE2E2] px-4 py-3 text-sm text-[#B91C1C]">
                    Your cart contains both digital and physical products. Please separate them into two orders so each can use the correct fulfilment method.
                  </div>
                )}
                {fulfilmentMismatch && (
                  <div className="rounded-2xl bg-[#FEE2E2] px-4 py-3 text-sm text-[#B91C1C]">
                    {fulfilmentMismatchMessage}
                  </div>
                )}
                {!shippingQuote.available && (
                  <div className="rounded-2xl bg-[#FEE2E2] px-4 py-3 text-sm text-[#B91C1C]">
                    {shippingQuote.message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || mutation.isPending || !hasItems || hasQuoteOnly || (hasDigital && hasPhysical) || !shippingQuote.available}
                  className="btn-primary w-full justify-center"
                >
                  {mutation.isPending ? 'Processing…' : 'Proceed to secure checkout'}
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-[var(--cream)] bg-white p-12 text-center shadow-luxury-sm">
            <h2 className="font-serif text-3xl mb-4">Your cart is empty</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-8">Select one of our bespoke cakes to start your order.</p>
            <Link to="/shop" className="btn-primary">Browse cakes</Link>
          </div>
        )}
      </section>
    </>
  )
}
