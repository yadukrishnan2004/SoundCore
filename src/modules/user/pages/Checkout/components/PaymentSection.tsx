import React from 'react';
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

interface PaymentSectionProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <section className="bg-bg-card border border-border-subtle rounded-3xl p-6">
      <h2 className="text-lg font-heading font-bold text-text-main flex items-center gap-2 mb-6">
        <FaCreditCard className="text-brand-primary" /> 2. PAYMENT METHOD
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* COD */}
        <div
          onClick={() => setPaymentMethod('COD')}
          className={`p-5 rounded-2xl border cursor-pointer flex items-center gap-4 transition ${
            paymentMethod === 'COD'
              ? "bg-brand-primary/10 border-brand-primary text-text-main"
              : "bg-bg-input border-border-subtle text-text-muted hover:border-text-muted"
          }`}
        >
          <FaMoneyBillWave className="text-2xl text-brand-primary" />
          <div>
            <p className="text-sm font-bold text-text-main">Cash on Delivery (COD)</p>
            <p className="text-[10px] text-text-muted mt-0.5">Pay in cash upon delivery</p>
          </div>
        </div>

        {/* Razorpay */}
        <div
          onClick={() => setPaymentMethod('Razorpay')}
          className={`p-5 rounded-2xl border cursor-pointer flex items-center gap-4 transition ${
            paymentMethod === 'Razorpay'
              ? "bg-brand-primary/10 border-brand-primary text-text-main"
              : "bg-bg-input border-border-subtle text-text-muted hover:border-text-muted"
          }`}
        >
          <FaCreditCard className="text-2xl text-brand-primary" />
          <div>
            <p className="text-sm font-bold text-text-main">Online Payment (Razorpay)</p>
            <p className="text-[10px] text-text-muted mt-0.5">Pay via Cards, Netbanking, UPI, Wallets</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
