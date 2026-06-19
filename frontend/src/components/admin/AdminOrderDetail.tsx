import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Download, ArrowRight, CheckCircle, XCircle } from 'lucide-react'
import { ordersApi } from '@/lib/api'
import { AdminPageHeader, EmptyState, Badge } from './AdminUI'

type OrderItem = {
  id: string
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  total_price: number
  custom_message?: string
  created_at: string
}

type Order = {
  id: string
  customer_name: string
  email: string
  phone?: string
  delivery_date?: string
  notes?: string
  total_amount: number
  status: 'pending' | 'paid' | 'processing' | 'completed' | 'cancelled'
  payment_method: string
  sumup_checkout_url?: string
  created_at: string
  updated_at: string
  items: OrderItem[]
}

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'processing', label: 'Processing' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

function statusBadge(status: Order['status']) {
  const mapping: Record<Order['status'], { colour: 'green' | 'red' | 'peach' | 'grey'; label: string }> = {
    pending: { colour: 'peach', label: 'Pending' },
    paid: { colour: 'green', label: 'Paid' },
    processing: { colour: 'grey', label: 'Processing' },
    completed: { colour: 'green', label: 'Completed' },
    cancelled: { colour: 'red', label: 'Cancelled' },
  }
  return <Badge label={mapping[status].label} colour={mapping[status].colour} />
}

export default function AdminOrderDetail() {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const { orderId } = useParams()

 const { data: order, isLoading } = useQuery<Order | null>({
    queryKey: ['admin-order', orderId],
    queryFn: async () => {
      if (!orderId) return null
      return (await ordersApi.get(orderId)).data as Order
    },
    enabled: Boolean(orderId),
  })

  const updateStatus = useMutation({
    mutationFn: ({ status }: { status: Order['status'] }) =>
      ordersApi.updateStatus(orderId!, { status }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-orders'] })
      qc.invalidateQueries({ queryKey: ['admin-order', orderId] })
    },
  })

  const downloadReceipt = async () => {
    if (!orderId) return
    const response = await ordersApi.receipt(orderId)
    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `order-${orderId}.pdf`
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  }

  const statusError = updateStatus.error

  const subtotal = useMemo(() => {
    return order?.items.reduce((sum, item) => sum + item.total_price, 0) ?? 0
  }, [order])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-16 rounded-3xl bg-[var(--cream)] animate-pulse" />
        <div className="h-72 rounded-[2rem] bg-[var(--cream)] animate-pulse" />
      </div>
    )
  }

  if (!order) {
    return (
      <EmptyState
        emoji="🔍"
        title="Order not found"
        body="Select an order from the list or return to the main orders page."
        action={(
          <button
            onClick={() => navigate('/admin/orders')}
            className="btn-primary text-sm py-2 px-4"
          >
            Back to orders
          </button>
        )}
      />
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <button
          type="button"
          onClick={() => navigate('/admin/orders')}
          className="inline-flex items-center gap-2 rounded-2xl border border-[var(--cream)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--cream)] transition-colors"
        >
          <ArrowLeft size={16} /> Back to order list
        </button>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--cream)] bg-[#FDF7F2] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">
          <CheckCircle size={14} /> Order invoice
        </span>
      </div>

      <AdminPageHeader
        title={`Order ${order.id.slice(0, 8)}`}
        subtitle={`Placed ${new Date(order.created_at).toLocaleDateString('en-GB')} · £${order.total_amount.toFixed(2)}`}
      />

      <div className="rounded-[2rem] border border-[var(--cream)] bg-[#FFF8F6] p-6 mb-8 shadow-luxury-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Haliberry Cake invoice</p>
            <h2 className="font-serif text-3xl text-[var(--text-primary)]">Premium order confirmation</h2>
            <p className="font-sans text-sm text-[var(--text-secondary)] max-w-xl">A refined invoice for the cake order, ready to print or download as a polished receipt for your bakery workflow.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-[var(--cream)] bg-white p-4">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--text-muted)] mb-2">Invoice number</p>
              <p className="font-semibold text-sm text-[var(--text-primary)]">{order.id.slice(0, 12).toUpperCase()}</p>
            </div>
            <div className="rounded-3xl border border-[var(--cream)] bg-white p-4">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--text-muted)] mb-2">Total amount</p>
              <p className="font-semibold text-sm text-[var(--text-primary)]">£{order.total_amount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr,0.9fr] mb-8">
        <div className="rounded-[2rem] border border-[var(--cream)] bg-white p-6 shadow-luxury-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <p className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Customer</p>
              <h2 className="font-serif text-2xl text-[var(--text-primary)]">{order.customer_name}</h2>
              <p className="font-sans text-sm text-[var(--text-secondary)]">{order.email}</p>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {statusBadge(order.status)}
              <button
                type="button"
                onClick={downloadReceipt}
                className="inline-flex items-center gap-2 rounded-2xl border border-[var(--cream)] bg-[#FDF7F2] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[#FEF5EB]"
              >
                <Download size={16} /> Download receipt
              </button>
              {order.sumup_checkout_url && (
                <a
                  href={order.sumup_checkout_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-[var(--cream)] bg-[#FDF7F2] px-4 py-2 text-sm text-[var(--peach)] hover:bg-[#FEF5EB]"
                >
                  <ArrowRight size={16} /> Checkout link
                </a>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mt-8">
            <div className="rounded-3xl border border-[var(--cream)] bg-[#FDF7F2] p-5">
              <p className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">Contact details</p>
              <p className="font-sans text-sm text-[var(--text-secondary)]">Email: {order.email}</p>
              <p className="font-sans text-sm text-[var(--text-secondary)]">Phone: {order.phone || 'N/A'}</p>
            </div>
            <div className="rounded-3xl border border-[var(--cream)] bg-[#FDF7F2] p-5">
              <p className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">Delivery</p>
              <p className="font-sans text-sm text-[var(--text-secondary)]">{order.delivery_date || 'No delivery date specified'}</p>
              <p className="font-sans text-sm text-[var(--text-secondary)] mt-2">Payment method: {order.payment_method.toUpperCase()}</p>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-[var(--cream)] bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg text-[var(--text-primary)]">Items</h3>
              <p className="font-sans text-sm text-[var(--text-secondary)]">Subtotal: £{subtotal.toFixed(2)}</p>
            </div>
            <div className="space-y-4">
              {order.items.map(item => (
                <div key={item.id} className="rounded-3xl border border-[var(--cream)] bg-[#FDF7F2] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-sm text-[var(--text-primary)]">{item.product_name}</p>
                      <p className="font-sans text-xs text-[var(--text-secondary)]">Qty {item.quantity} × £{item.unit_price.toFixed(2)}</p>
                    </div>
                    <p className="font-semibold text-sm">£{item.total_price.toFixed(2)}</p>
                  </div>
                  {item.custom_message && (
                    <p className="mt-3 text-xs text-[var(--text-secondary)]">Custom note: {item.custom_message}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-[var(--cream)] bg-[#FDF7F2] p-6">
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">Order notes</p>
            <p className="font-sans text-sm text-[var(--text-secondary)]">{order.notes || 'No notes on this order.'}</p>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-[var(--cream)] bg-white p-6 shadow-luxury-sm">
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">Update status</p>
            <div className="space-y-3">
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateStatus.mutate({ status: option.value as Order['status'] })}
                  disabled={updateStatus.isPending || order.status === option.value}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${order.status === option.value ? 'bg-[var(--apricot)] text-[var(--text-secondary)]' : 'bg-[#FDF7F2] text-[var(--text-primary)] hover:bg-[#FEF5EB]'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {statusError && (
              <p className="mt-4 text-sm text-red-600">Unable to update status. Please try again.</p>
            )}
          </div>
          <div className="rounded-[2rem] border border-[var(--cream)] bg-white p-6 shadow-luxury-sm">
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">Summary</p>
            <div className="space-y-3 text-sm text-[var(--text-secondary)]">
              <div className="flex justify-between"><span>Order total</span><span>£{order.total_amount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Created</span><span>{new Date(order.created_at).toLocaleDateString('en-GB')}</span></div>
              <div className="flex justify-between"><span>Updated</span><span>{new Date(order.updated_at).toLocaleDateString('en-GB')}</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
