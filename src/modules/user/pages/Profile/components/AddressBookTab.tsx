import React from 'react';
import { FaPlus } from 'react-icons/fa';

interface AddressBookTabProps {
  addresses: any[];
  loadingAddresses: boolean;
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

export const AddressBookTab: React.FC<AddressBookTabProps> = ({
  addresses,
  loadingAddresses,
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white">Saved Delivery Addresses</h3>
          <p className="text-xs text-gray-500 mt-1">Manage destination locations for express checkout</p>
        </div>
        {!showAddressForm && (
          <button
            onClick={() => setShowAddressForm(true)}
            className="text-xs bg-amber-500 text-black px-4 py-2 rounded-xl font-bold flex items-center gap-1.5"
          >
            <FaPlus /> Add Address
          </button>
        )}
      </div>

      {showAddressForm ? (
        <form onSubmit={handleAddAddress} className="space-y-4 bg-black/20 p-6 rounded-2xl border border-white/5">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Add New Address</h4>
          
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
              placeholder="Phone Number"
              value={addrPhone}
              onChange={(e) => setAddrPhone(e.target.value)}
              required
              className="bg-[#0b0c10] text-sm text-gray-200 px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Flat / House Name / Building"
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
              placeholder="Pincode"
              value={addrPin}
              onChange={(e) => setAddrPin(e.target.value)}
              required
              className="bg-[#0b0c10] text-sm text-gray-200 px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2.5 bg-amber-500 text-black font-extrabold text-xs rounded-xl">
              Save Address
            </button>
            <button type="button" onClick={() => setShowAddressForm(false)} className="px-6 py-2.5 bg-white/5 text-gray-400 font-bold text-xs rounded-xl">
              Cancel
            </button>
          </div>
        </form>
      ) : loadingAddresses ? (
        <div className="py-12 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500"></div>
        </div>
      ) : addresses.length === 0 ? (
        <div className="p-8 text-center bg-black/20 rounded-2xl border border-white/5 border-dashed">
          <p className="text-sm text-gray-500">No saved addresses found. Click Add Address to start shipping.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="p-5 bg-black/20 border border-white/5 rounded-2xl">
              <p className="text-sm font-bold text-white">{addr.name}</p>
              <p className="text-xs text-gray-400 mt-2">
                {addr.house_name}, {addr.street}
              </p>
              <p className="text-xs text-gray-400">
                {addr.city}, {addr.state} - {addr.pin_code}
              </p>
              <p className="text-[10px] text-gray-500 font-semibold mt-4">📞 {addr.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressBookTab;
