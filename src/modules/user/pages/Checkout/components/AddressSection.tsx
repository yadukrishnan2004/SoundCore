import React from 'react';
import { FaMapMarkerAlt, FaPlus, FaCheckCircle } from 'react-icons/fa';

interface AddressSectionProps {
  addresses: any[];
  selectedAddressId: any;
  setSelectedAddressId: (id: any) => void;
  showAddressForm: boolean;
  setShowAddressForm: (show: boolean) => void;
  addrName: string;
  setAddrName: (val: string) => void;
  addrPhone: string;
  setAddrPhone: (val: string) => void;
  addrHouseName: string;
  setAddrHouseName: (val: string) => void;
  addrStreet: string;
  setAddrStreet: (val: string) => void;
  addrCity: string;
  setAddrCity: (val: string) => void;
  addrState: string;
  setAddrState: (val: string) => void;
  addrPin: string;
  setAddrPin: (val: string) => void;
  addressError: string;
  handleAddAddress: (e: React.FormEvent) => void;
}

export const AddressSection: React.FC<AddressSectionProps> = ({
  addresses,
  selectedAddressId,
  setSelectedAddressId,
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
  handleAddAddress
}) => {
  return (
    <section className="bg-bg-card border border-border-subtle rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-heading font-bold text-text-main flex items-center gap-2">
          <FaMapMarkerAlt className="text-brand-primary" /> 1. SHIPPING ADDRESS
        </h2>
        {!showAddressForm && (
          <button
            onClick={() => setShowAddressForm(true)}
            className="text-xs bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <FaPlus /> Add New
          </button>
        )}
      </div>

      {showAddressForm ? (
        <form onSubmit={handleAddAddress} className="space-y-4 bg-bg-input p-5 rounded-2xl border border-border-subtle">
          <h3 className="text-sm font-heading font-bold text-text-main uppercase tracking-wider">New Shipping Details</h3>
          
          {addressError && <p className="text-xs font-bold text-red-500">{addressError}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Recipient Name"
              value={addrName}
              onChange={(e) => setAddrName(e.target.value)}
              required
              className="bg-bg-base text-sm text-text-main px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
            />
            <input
              type="text"
              placeholder="Phone Number (min 10 digits)"
              value={addrPhone}
              onChange={(e) => setAddrPhone(e.target.value)}
              required
              className="bg-bg-base text-sm text-text-main px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="House / Flat / Building Name"
              value={addrHouseName}
              onChange={(e) => setAddrHouseName(e.target.value)}
              required
              className="bg-bg-base text-sm text-text-main px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
            />
            <input
              type="text"
              placeholder="Street / Area / Landmark"
              value={addrStreet}
              onChange={(e) => setAddrStreet(e.target.value)}
              required
              className="bg-bg-base text-sm text-text-main px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              value={addrCity}
              onChange={(e) => setAddrCity(e.target.value)}
              required
              className="bg-bg-base text-sm text-text-main px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
            />
            <input
              type="text"
              placeholder="State"
              value={addrState}
              onChange={(e) => setAddrState(e.target.value)}
              required
              className="bg-bg-base text-sm text-text-main px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
            />
            <input
              type="text"
              placeholder="ZIP / PIN Code"
              value={addrPin}
              onChange={(e) => setAddrPin(e.target.value)}
              required
              className="bg-bg-base text-sm text-text-main px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-primary text-black font-extrabold text-xs rounded-xl hover:bg-brand-hover transition"
            >
              Save Address
            </button>
            <button
              type="button"
              onClick={() => setShowAddressForm(false)}
              className="px-6 py-2.5 bg-bg-card text-text-muted font-bold text-xs rounded-xl border border-border-subtle"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : addresses.length === 0 ? (
        <div className="p-8 text-center bg-bg-input rounded-2xl border border-border-subtle border-dashed">
          <p className="text-sm text-text-muted">No saved addresses found. Please add a shipping address to proceed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => setSelectedAddressId(addr.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between relative ${
                selectedAddressId === addr.id
                  ? "bg-brand-primary/10 border-brand-primary"
                  : "bg-bg-input border-border-subtle hover:border-text-muted"
              }`}
            >
              {selectedAddressId === addr.id && (
                <FaCheckCircle className="absolute top-4 right-4 text-brand-primary text-lg" />
              )}
              <div>
                <p className="text-sm font-bold text-text-main">{addr.name}</p>
                <p className="text-xs text-text-muted mt-2">
                  {addr.house_name}, {addr.street}
                </p>
                <p className="text-xs text-text-muted">
                  {addr.city}, {addr.state} - {addr.pin_code}
                </p>
              </div>
              <p className="text-[10px] text-text-muted font-semibold mt-4">📞 {addr.phone}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AddressSection;
