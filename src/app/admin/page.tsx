import { supabaseAdmin } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import { OrderStatus } from '@/lib/types'
import { ShippingAddress } from '@/lib/types'

export const metadata = { title: 'Admin — JDM Direct' }

// Mirrors the Supabase orders table schema
interface OrderRow {
  id: string
  stripe_session_id: string
  stripe_payment_intent_id: string | null
  vehicle_id: string | null
  stock_number: string | null
  vehicle_make: string | null
  vehicle_model: string | null
  vehicle_year: number | null
  customer_email: string | null
  customer_name: string | null
  shipping_address: ShippingAddress | null
  total_paid: number | null
  status: OrderStatus
  notes: string | null
  created_at: string
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  payment_pending: 'bg-yellow-600',
  payment_confirmed: 'bg-blue-600',
  sourcing: 'bg-purple-600',
  shipping_japan: 'bg-orange-600',
  customs: 'bg-yellow-500 text-black',
  shipping_domestic: 'bg-cyan-600',
  delivered: 'bg-green-600',
  cancelled: 'bg-red-800',
} satisfies Record<OrderStatus, string>

const STATUS_LABELS: Record<OrderStatus, string> = {
  payment_pending: 'Payment Pending',
  payment_confirmed: 'Payment Confirmed',
  sourcing: 'Sourcing in Japan',
  shipping_japan: 'Shipping from Japan',
  customs: 'US Customs',
  shipping_domestic: 'Domestic Shipping',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
} satisfies Record<OrderStatus, string>

async function getOrders(): Promise<{ orders: OrderRow[]; error: string | null }> {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('[admin] Supabase query error:', error.message)
      return { orders: [], error: error.message }
    }
    return { orders: (data ?? []) as OrderRow[], error: null }
  } catch (err) {
    console.error('[admin] Unexpected error:', err)
    return { orders: [], error: 'Failed to connect to database' }
  }
}

export default async function AdminPage() {
  const { orders, error } = await getOrders()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Order Dashboard</h1>
          <p className="text-neutral-400 mt-1">{orders.length} total order{orders.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-800 rounded-xl p-4 mb-6 text-red-400 text-sm">
          Database error: {error}. Check your Supabase credentials in .env.local.
        </div>
      )}

      {orders.length === 0 && !error ? (
        <div className="text-center py-20 text-neutral-500">
          <div className="text-5xl mb-4">📋</div>
          <div>No orders yet. They&apos;ll appear here after customers checkout.</div>
          <div className="text-xs mt-2 text-neutral-600">
            Make sure your Supabase credentials and Stripe webhook are configured.
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-neutral-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-900 text-neutral-400 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3">Order Date</th>
                <th className="text-left px-4 py-3">Customer</th>
                <th className="text-left px-4 py-3">Vehicle</th>
                <th className="text-left px-4 py-3">Stock #</th>
                <th className="text-left px-4 py-3">Total Paid</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order.id} className={`border-t border-neutral-800 ${i % 2 === 0 ? 'bg-neutral-950' : 'bg-neutral-900/50'}`}>
                  <td className="px-4 py-3 text-neutral-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{order.customer_name ?? '—'}</div>
                    <div className="text-neutral-500 text-xs">{order.customer_email ?? '—'}</div>
                  </td>
                  <td className="px-4 py-3">
                    {[order.vehicle_year, order.vehicle_make, order.vehicle_model].filter(Boolean).join(' ')}
                  </td>
                  <td className="px-4 py-3 text-neutral-400 font-mono text-xs">{order.stock_number ?? '—'}</td>
                  <td className="px-4 py-3 font-bold">
                    {order.total_paid != null ? `$${Number(order.total_paid).toLocaleString()}` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={`${STATUS_COLORS[order.status] ?? 'bg-neutral-600'} text-white text-xs`}>
                      {STATUS_LABELS[order.status] ?? order.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
