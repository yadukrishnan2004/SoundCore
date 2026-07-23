import React from 'react';
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

interface PaymentSectionProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <section className="bg-[#15161b] border border-white/5 rounded-3xl p-6">
      <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
        <FaCreditCard className="text-amber-500" /> 2. PAYMENT METHOD
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* COD */}
        <div
          onClick={() => setPaymentMethod('COD')}
          className={`p-5 rounded-2xl border cursor-pointer flex items-center gap-4 transition ${
            paymentMethod === 'COD'
              ? "bg-amber-500/5 border-amber-500 text-white"
              : "bg-black/20 border-white/5 text-gray-400 hover:border-white/25"
          }`}
        >
          <FaMoneyBillWave className="text-2xl" />
          <div>
            <p className="text-sm font-bold">Cash on Delivery (COD)</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Pay in cash upon delivery</p>
          </div>
        </div>

        {/* Razorpay */}
        <div
          onClick={() => setPaymentMethod('Razorpay')}
          className={`p-5 rounded-2xl border cursor-pointer flex items-center gap-4 transition ${
            paymentMethod === 'Razorpay'
              ? "bg-amber-500/5 border-amber-500 text-white"
              : "bg-black/20 border-white/5 text-gray-400 hover:border-white/25"
          }`}
        >
          <FaCreditCard className="text-2xl" />
          <div>
            <p className="text-sm font-bold">Online Payment (Razorpay)</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Pay via Cards, Netbanking, UPI, Wallets</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
