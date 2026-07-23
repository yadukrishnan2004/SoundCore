import React from 'react';
import { FaBoxOpen, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import Navbar from '../../../../components/common/Navbar';
import Footer from '../../../../components/common/Footer';
import { useProfile } from './hooks/useProfile';
import { ProfileInfoTab } from './components/ProfileInfoTab';
import { AddressBookTab } from './components/AddressBookTab';
import { OrderHistoryTab } from './components/OrderHistoryTab';

function Profile() {
  const {
    user,
    authLoading,
    activeTab,
    setActiveTab,
    newName,
    setNewName,
    updatingProfile,
    profileMessage,
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
    orders,
    loadingOrders,
    expandedOrderId,
    orderDetails,
    handleUpdateProfile,
    handleAddAddress,
    toggleOrderExpand,
    handleCancelOrder
  } = useProfile();

  if (authLoading) {
    return (
      <div className="bg-[#0b0c10] text-white min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#0b0c10] text-gray-200 min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Sidebar Controls */}
        <aside className="lg:col-span-3 bg-[#15161b] border border-white/5 rounded-3xl p-6 space-y-6">
          <div className="text-center pb-6 border-b border-white/5">
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-4">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <h2 className="text-lg font-bold text-white truncate">{user?.name}</h2>
            <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center gap-3 transition ${
                activeTab === 'orders' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <FaBoxOpen /> Order History
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center gap-3 transition ${
                activeTab === 'addresses' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <FaMapMarkerAlt /> Address Book
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center gap-3 transition ${
                activeTab === 'profile' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <FaUser /> Edit Profile
            </button>
          </div>
        </aside>

        {/* Right Side: Tab Contents */}
        <div className="lg:col-span-9 bg-[#15161b] border border-white/5 rounded-3xl p-6 sm:p-8 min-h-[500px]">
          
          {activeTab === 'profile' && (
            <ProfileInfoTab
              user={user}
              newName={newName}
              setNewName={setNewName}
              profileMessage={profileMessage}
              updatingProfile={updatingProfile}
              handleUpdateProfile={handleUpdateProfile}
            />
          )}

          {activeTab === 'addresses' && (
            <AddressBookTab
              addresses={addresses}
              loadingAddresses={loadingAddresses}
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
          )}

          {activeTab === 'orders' && (
            <OrderHistoryTab
              orders={orders}
              loadingOrders={loadingOrders}
              expandedOrderId={expandedOrderId}
              orderDetails={orderDetails}
              toggleOrderExpand={toggleOrderExpand}
              handleCancelOrder={handleCancelOrder}
            />
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
