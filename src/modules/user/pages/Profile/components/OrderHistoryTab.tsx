import React from 'react';
import { FaChevronDown, FaChevronUp, FaTimesCircle } from 'react-icons/fa';

interface OrderHistoryTabProps {
  orders: any[];
  loadingOrders: boolean;
  expandedOrderId: any;
  orderDetails: Record<string, any>;
  toggleOrderExpand: (orderId: any) => void;
  handleCancelOrder: (orderId: any) => void;
}

export const OrderHistoryTab: React.FC<OrderHistoryTabProps> = ({
  orders,
  loadingOrders,
  expandedOrderId,
  orderDetails,
  toggleOrderExpand,
  handleCancelOrder
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white">Purchase Orders History</h3>
        <p className="text-xs text-gray-500 mt-1">Track and manage all your SoundCore purchases</p>
      </div>

      {loadingOrders ? (
        <div className="py-12 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="p-8 text-center bg-black/20 rounded-2xl border border-white/5 border-dashed">
          <p className="text-sm text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.id;
            const items = orderDetails[order.id] || [];
            const status = order.status || order.order_status;
            const canCancel = status === 'Pending' || status === 'Placed';

            return (
              <div key={order.id} className="bg-black/20 border border-white/5 rounded-2xl overflow-hidden transition-all hover:border-white/10">
                
                {/* Summary Header */}
                <div 
                  onClick={() => toggleOrderExpand(order.id)}
                  className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer select-none"
                >
                  <div>
                    <p className="text-xs text-gray-500">Order ID: #{order.id}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        status === 'Delivered' ? 'bg-green-500/10 text-green-400' :
                        status === 'Cancelled' ? 'bg-red-500/10 text-red-500' :
                        'bg-amber-500/10 text-amber-500'
                      }`}>
                        {status}
                      </span>
                      <span className="text-xs text-gray-400">Method: {order.payment_method}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Total Price</p>
                      <p className="text-sm font-black text-white mt-0.5">₹{order.total_amount || order.grand_total || order.price}</p>
                    </div>
                    {isExpanded ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
                  </div>
                </div>

                {/* Expanded items section */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4 bg-black/10">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order Items</h4>
                    {items.length === 0 ? (
                      <p className="text-xs text-gray-500">Loading order items...</p>
                    ) : (
                      <div className="space-y-3">
                        {items.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between items-center gap-4 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-black/30 rounded p-1 flex items-center justify-center shrink-0">
                                <img src={item.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=100&auto=format&fit=crop"} alt="" className="max-h-full object-contain" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-white line-clamp-1">Product ID: #{item.product_id || item.ProductId}</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">Qty: {item.quantity} × ₹{item.price}</p>
                              </div>
                            </div>
                            <span className="text-xs font-black text-white">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Actions bar */}
                    {canCancel && (
                      <div className="flex justify-end pt-2 border-t border-white/5">
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="px-4 py-2 bg-red-600/15 hover:bg-red-600/25 text-red-500 text-xs font-extrabold rounded-lg flex items-center gap-1.5 transition"
                        >
                          <FaTimesCircle /> Cancel Order
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryTab;
