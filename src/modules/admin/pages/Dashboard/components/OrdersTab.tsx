import React from 'react';

interface OrdersTabProps {
  orders: any[];
  handleOrderStatusUpdate: (orderId: any, newStatus: string) => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({ orders, handleOrderStatusUpdate }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-xl font-bold text-white">Active Orders Tracking</h3>
        <p className="text-xs text-gray-500 mt-1">Manage purchase order cycles and delivery status updates</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/5 text-gray-500 font-bold uppercase tracking-wider">
              <th className="pb-3">ID</th>
              <th className="pb-3">Customer ID</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Method</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3 text-right">Lifecycle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map(o => {
              const status = o.status || o.order_status;
              return (
                <tr key={o.id} className="hover:bg-white/5">
                  <td className="py-3 text-gray-500">#{o.id}</td>
                  <td className="py-3 text-white">User #{o.user_id}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      status === 'Delivered' ? 'bg-green-500/10 text-green-400' :
                      status === 'Cancelled' ? 'bg-red-500/10 text-red-500' :
                      'bg-amber-500/10 text-amber-500'
                    }`}>
                      {status}
                    </span>
                  </td>
                  <td className="py-3">{o.payment_method}</td>
                  <td className="py-3 font-bold">₹{o.total_amount || o.grand_total || o.price}</td>
                  <td className="py-3 text-right">
                    <select
                      value={status}
                      onChange={(e) => handleOrderStatusUpdate(o.id, e.target.value)}
                      className="bg-[#0b0c10] text-xs text-gray-300 px-2.5 py-1.5 rounded border border-white/5 focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Placed">Placed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTab;
