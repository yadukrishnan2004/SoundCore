import React from 'react';
import Navbar from '../../../../components/common/Navbar';
import Footer from '../../../../components/common/Footer';
import { useCheckout } from './hooks/useCheckout';
import { AddressSection } from './components/AddressSection';
import { PaymentSection } from './components/PaymentSection';
import { CheckoutOrderSummary } from './components/CheckoutOrderSummary';

function Checkout() {
  const {
    loading,
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    paymentMethod,
    setPaymentMethod,
    submitting,
    showAddressForm,
    setShowAddressForm,
    addrName,
    setAddrName,
    addrPhone,
    setAddrPhone,
    addrHouseName,
    setAddrHouseName,
    addrStreet,
    setAddrStreet,
    addrCity,
    setAddrCity,
    addrState,
    setAddrState,
    addrPin,
    setAddrPin,
    addressError,
    items,
    subtotal,
    shipping,
    tax,
    total,
    handleAddAddress,
    handlePlaceOrder
  } = useCheckout();

  if (loading) {
    return (
      <div className="bg-bg-base text-text-main min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-bg-base text-text-main min-h-screen flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 flex-grow space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-text-main tracking-tight">Express Checkout</h1>
          <p className="text-xs text-text-muted mt-1">Review shipping details, payment preferences, and complete your purchase</p>
        </div>

        {items.length === 0 ? (
          <div className="p-12 text-center bg-bg-card rounded-3xl border border-border-subtle space-y-4">
            <p className="text-base text-text-muted font-bold">Your checkout bag is currently empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Address & Payment */}
            <div className="lg:col-span-8 space-y-8">
              
              <AddressSection
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                setSelectedAddressId={setSelectedAddressId}
                showAddressForm={showAddressForm}
                setShowAddressForm={setShowAddressForm}
                addrName={addrName}
                setAddrName={setAddrName}
                addrPhone={addrPhone}
                setAddrPhone={setAddrPhone}
                addrHouseName={addrHouseName}
                setAddrHouseName={setAddrHouseName}
                addrStreet={addrStreet}
                setAddrStreet={setAddrStreet}
                addrCity={addrCity}
                setAddrCity={setAddrCity}
                addrState={addrState}
                setAddrState={setAddrState}
                addrPin={addrPin}
                setAddrPin={setAddrPin}
                addressError={addressError}
                handleAddAddress={handleAddAddress}
              />

              <PaymentSection
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />

            </div>

            {/* Right Column: Order Summary */}
            <CheckoutOrderSummary
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              paymentMethod={paymentMethod}
              submitting={submitting}
              handlePlaceOrder={handlePlaceOrder}
            />

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Checkout;
