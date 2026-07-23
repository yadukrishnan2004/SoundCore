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
    <section className="bg-[#15161b] border border-white/5 rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FaMapMarkerAlt className="text-amber-500" /> 1. SHIPPING ADDRESS
        </h2>
        {!showAddressForm && (
          <button
            onClick={() => setShowAddressForm(true)}
            className="text-xs bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition"
          >
            <FaPlus /> Add New
          </button>
        )}
      </div>

      {showAddressForm ? (
        <form onSubmit={handleAddAddress} className="space-y-4 bg-black/20 p-5 rounded-2xl border border-white/5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">New Shipping Details</h3>
          
          {addressError && <p className="text-xs font-bold text-red-500">{addressError}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Recipient Name"
              value={addrName}
              onChange={(e) => setAddrName(e.target.value)}
              required
              className="bg-[#0b0c10] text-sm text-gray-200 px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              placeholder="Phone Number (min 10 digits)"
              value={addrPhone}
              onChange={(e) => setAddrPhone(e.target.value)}
              required
              className="bg-[#0b0c10] text-sm text-gray-200 px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="House / Flat / Building Name"
              value={addrHouseName}
              onChange={(e) => setAddrHouseName(e.target.value)}
              required
              className="bg-[#0b0c10] text-sm text-gray-200 px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              placeholder="Street / Area / Landmark"
              value={addrStreet}
              onChange={(e) => setAddrStreet(e.target.value)}
              required
              className="bg-[#0b0c10] text-sm text-gray-200 px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              value={addrCity}
              onChange={(e) => setAddrCity(e.target.value)}
              required
              className="bg-[#0b0c10] text-sm text-gray-200 px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              placeholder="State"
              value={addrState}
              onChange={(e) => setAddrState(e.target.value)}
              required
              className="bg-[#0b0c10] text-sm text-gray-200 px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              placeholder="ZIP / PIN Code"
              value={addrPin}
              onChange={(e) => setAddrPin(e.target.value)}
              required
              className="bg-[#0b0c10] text-sm text-gray-200 px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 text-black font-extrabold text-xs rounded-xl"
            >
              Save Address
            </button>
            <button
              type="button"
              onClick={() => setShowAddressForm(false)}
              className="px-6 py-2.5 bg-white/5 text-gray-400 font-bold text-xs rounded-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : addresses.length === 0 ? (
        <div className="p-8 text-center bg-black/20 rounded-2xl border border-white/5 border-dashed">
          <p className="text-sm text-gray-500">No saved addresses found. Please add a shipping address to proceed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => setSelectedAddressId(addr.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between relative ${
                selectedAddressId === addr.id
                  ? "bg-amber-500/5 border-amber-500"
                  : "bg-black/20 border-white/5 hover:border-white/20"
              }`}
            >
              {selectedAddressId === addr.id && (
                <FaCheckCircle className="absolute top-4 right-4 text-amber-500 text-lg" />
              )}
              <div>
                <p className="text-sm font-bold text-white">{addr.name}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {addr.house_name}, {addr.street}
                </p>
                <p className="text-xs text-gray-400">
                  {addr.city}, {addr.state} - {addr.pin_code}
                </p>
              </div>
              <p className="text-[10px] text-gray-500 font-semibold mt-4">📞 {addr.phone}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AddressSection;
