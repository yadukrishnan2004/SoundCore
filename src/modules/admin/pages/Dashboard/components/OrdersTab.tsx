import React from 'react';

interface OrdersTabProps {
  orders: any[];
  handleOrderStatusUpdate: (orderId: any, status: string) => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({ orders, handleOrderStatusUpdate }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-heading font-extrabold text-text-main">Orders Processing Console</h3>
        <p className="text-xs text-text-muted mt-1">Fulfillment state and status lifecycle</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-text-muted">
          <thead className="bg-bg-input text-text-main uppercase font-heading border-b border-border-subtle">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer ID</th>
              <th className="p-3">Total Amount</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-bg-input/50 transition">
                <td className="p-3 font-bold text-text-main">#{o.id}</td>
                <td className="p-3 font-mono">User #{o.user_id || o.userId}</td>
                <td className="p-3 font-bold text-text-main font-heading">₹{o.total_amount || o.grand_total || o.price}</td>
                <td className="p-3 uppercase font-semibold">{o.payment_method}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    o.status === 'Delivered' ? 'bg-green-500/10 text-green-400' :
                    o.status === 'Cancelled' ? 'bg-red-500/10 text-red-500' :
                    'bg-brand-primary/10 text-brand-primary'
                  }`}>
                    {o.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <select
                    value={o.status}
                    onChange={(e) => handleOrderStatusUpdate(o.id, e.target.value)}
                    className="bg-bg-input text-text-main text-xs px-2 py-1 rounded border border-border-subtle focus:outline-none focus:border-brand-primary"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTab;
