// C:\Users\Melody\Documents\haliberrycake\frontend\src\components\admin\AdminOrders.tsx
import { Fragment, useMemo, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, CheckCircle, XCircle, ArrowUpRight, Download } from 'lucide-react'
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
  const mapping: Record<Order['status'], { colour: string; label: string }> = {
    pending: { colour: 'yellow', label: 'Pending' },
    paid: { colour: 'green', label: 'Paid' },
    processing: { colour: 'blue', label: 'Processing' },
    completed: { colour: 'green', label: 'Completed' },
    cancelled: { colour: 'red', label: 'Cancelled' },
  }
  return <Badge label={mapping[status].label} colour={mapping[status].colour} />
}

export default function AdminOrders() {
  const qc = useQueryClient()
  const navigate = useNavigate()
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [statusChanges, setStatusChanges] = useState<Record<string, Order['status']>>({})
  const [downloadLoading, setDownloadLoading] = useState<Record<string, boolean>>({})

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ['admin-orders'],
    queryFn: async () => (await ordersApi.list()).data as Order[],
  })

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Order['status'] }) =>
      ordersApi.updateStatus(id, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-orders'] }),
  })

  const downloadReceipt = async (id: string) => {
    try {
      setDownloadLoading(prev => ({ ...prev, [id]: true }))
      const response = await ordersApi.receipt(id)
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `order-${id}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } finally {
      setDownloadLoading(prev => ({ ...prev, [id]: false }))
    }
  }

  const counts = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    paid: orders.filter(o => o.status === 'paid').length,
    completed: orders.filter(o => o.status === 'completed').length,
  }), [orders])

  return (
    <div>
      <AdminPageHeader
        title="Orders"
        subtitle={`${counts.total} total orders`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div className="rounded-2xl p-6 bg-white border border-[var(--cream)] shadow-luxury-sm">
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">Total orders</p>
          <p className="font-serif text-3xl text-[var(--text-primary)]">{counts.total}</p>
        </div>
        <div className="rounded-2xl p-6 bg-white border border-[var(--cream)] shadow-luxury-sm">
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">Pending</p>
          <p className="font-serif text-3xl text-[var(--text-primary)]">{counts.pending}</p>
        </div>
        <div className="rounded-2xl p-6 bg-white border border-[var(--cream)] shadow-luxury-sm">
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">Paid</p>
          <p className="font-serif text-3xl text-[var(--text-primary)]">{counts.paid}</p>
        </div>
        <div className="rounded-2xl p-6 bg-white border border-[var(--cream)] shadow-luxury-sm">
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">Completed</p>
          <p className="font-serif text-3xl text-[var(--text-primary)]">{counts.completed}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 rounded-2xl bg-[var(--cream)] animate-pulse" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          emoji="🧾"
          title="No orders yet"
          body="New customer orders will appear here for review and status updates."
        />
      ) : (
        <div className="overflow-x-auto rounded-[2rem] border border-[var(--cream)] bg-white shadow-luxury-sm">
          <table className="w-full text-left">
            <thead>
              <tr style={{ background: '#FDF7F2', borderBottom: '1px solid var(--cream)' }}>
                {['Order', 'Customer', 'Total', 'Status', 'Created', 'Actions'].map((heading) => (
                  <th key={heading} className="px-5 py-4 text-xs font-sans font-semibold uppercase tracking-widest text-[var(--text-muted)]">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <Fragment key={order.id}>
                  <tr
                    className="hover:bg-[#FDF7F2] transition-colors"
                    style={{ background: index % 2 === 0 ? 'white' : '#FEFCFB', borderTop: '1px solid var(--cream)' }}
                  >
                    <td className="px-5 py-4 align-top font-sans text-sm">
                      <div className="font-semibold text-[var(--text-primary)]">{order.id.slice(0, 8)}</div>
                      <div className="text-[var(--text-secondary)] text-xs">{order.payment_method.toUpperCase()}</div>
                    </td>
                    <td className="px-5 py-4 align-top font-sans text-sm">
                      <div className="font-medium">{order.customer_name}</div>
                      <div className="text-[var(--text-secondary)] text-xs">{order.email}</div>
                    </td>
                    <td className="px-5 py-4 align-top font-semibold">£{order.total_amount.toFixed(2)}</td>
                    <td className="px-5 py-4 align-top">{statusBadge(order.status)}</td>
                    <td className="px-5 py-4 align-top text-sm text-[var(--text-secondary)]">{new Date(order.created_at).toLocaleDateString('en-GB')}</td>
                    <td className="px-5 py-4 align-top">
                      <div className="flex flex-wrap gap-2 items-start">
                        <select
                          value={statusChanges[order.id] ?? order.status}
                          onChange={(event) => setStatusChanges(prev => ({ ...prev, [order.id]: event.target.value as Order['status'] }))}
                          className="rounded-2xl border border-[var(--cream)] bg-[#FDF7F2] px-3 py-2 text-sm outline-none"
                        >
                          {STATUS_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => updateStatus.mutate({ id: order.id, status: statusChanges[order.id] ?? order.status })}
                          disabled={updateStatus.isPending}
                          className="btn-primary text-xs py-2 px-3"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/orders/${order.id}`)}
                          className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--peach)]"
                        >
                          View page <ArrowUpRight size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => downloadReceipt(order.id)}
                          disabled={downloadLoading[order.id]}
                          className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--peach)]"
                        >
                          {downloadLoading[order.id] ? 'Downloading…' : 'Download PDF'} <Download size={14} />
                        </button>
                      </div>
                      {order.sumup_checkout_url && (
                        <a
                          href={order.sumup_checkout_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-2 text-xs text-[var(--peach)]"
                        >
                          View checkout
                        </a>
                      )}
                    </td>
                  </tr>
                  {expandedOrder === order.id && (
                    <tr style={{ background: '#FFF8F0' }}>
                      <td colSpan={6} className="px-5 py-4 border-t border-[var(--cream)]">
                        <div className="grid gap-4 sm:grid-cols-[1fr,0.8fr]">
                          <div className="space-y-3">
                            <div className="rounded-3xl bg-white border border-[var(--cream)] p-4">
                              <p className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">Order items</p>
                              <div className="space-y-3">
                                {order.items.map((item) => (
                                  <div key={item.id} className="rounded-3xl border border-[var(--cream)] bg-[#FDF7F2] p-4">
                                    <div className="flex items-center justify-between gap-4">
                                      <p className="font-medium text-sm">{item.product_name}</p>
                                      <p className="font-semibold">£{item.total_price.toFixed(2)}</p>
                                    </div>
                                    <p className="text-xs text-[var(--text-secondary)]">Qty: {item.quantity} × £{item.unit_price.toFixed(2)}</p>
                                    {item.custom_message && <p className="text-xs mt-2 text-[var(--text-secondary)]">Note: {item.custom_message}</p>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="rounded-3xl bg-white border border-[var(--cream)] p-4">
                              <p className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">Customer notes</p>
                              <p className="text-sm text-[var(--text-secondary)]">{order.notes || 'No notes provided.'}</p>
                            </div>
                            <div className="rounded-3xl bg-white border border-[var(--cream)] p-4">
                              <p className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">Delivery</p>
                              <p className="text-sm text-[var(--text-secondary)]">{order.delivery_date || 'No delivery date'}</p>
                              <p className="text-sm text-[var(--text-secondary)]">Phone: {order.phone || 'N/A'}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
