import React from 'react';

interface CheckoutOrderSummaryProps {
  items: any[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  submitting: boolean;
  handlePlaceOrder: () => void;
}

export const CheckoutOrderSummary: React.FC<CheckoutOrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  paymentMethod,
  submitting,
  handlePlaceOrder
}) => {
  return (
    <div className="lg:col-span-4 bg-[#15161b] border border-white/5 rounded-3xl p-6 space-y-6">
      <h2 className="text-lg font-extrabold text-white border-b border-white/5 pb-3">ORDER DETAILS</h2>

      {/* Items List */}
      <div className="space-y-4 max-h-56 overflow-y-auto pr-1">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-start gap-4">
            <div className="text-xs">
              <p className="font-bold text-gray-300 line-clamp-1">{item.product_name}</p>
              <p className="text-gray-500 mt-0.5">Qty: {item.quantity}</p>
            </div>
            <span className="text-xs font-black text-white shrink-0">₹{item.sub_total}</span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-white/5 pt-4 space-y-2.5 text-xs">
        <div className="flex justify-between text-gray-400">
          <span>Subtotal</span>
          <span className="font-bold text-white">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Shipping Fee</span>
          <span className="font-bold text-white">₹{shipping}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>GST (10%)</span>
          <span className="font-bold text-white">₹{tax.toFixed(1)}</span>
        </div>

        <div className="border-t border-white/5 pt-3 flex justify-between text-sm font-extrabold text-white">
          <span>Grand Total</span>
          <span className="text-amber-500">₹{total.toFixed(1)}</span>
        </div>
      </div>

      {/* Submit Trigger */}
      <button
        onClick={handlePlaceOrder}
        disabled={submitting}
        className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold text-sm rounded-full transition transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {submitting ? "Placing Order..." : paymentMethod === 'Razorpay' ? "PAY & PLACE ORDER" : "PLACE COD ORDER"}
      </button>
    </div>
  );
};

export default CheckoutOrderSummary;
