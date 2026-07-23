import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt, FaBoxOpen, FaSave, FaPlus, FaTimesCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Navbar from '../../../../components/common/Navbar';
import Footer from '../../../../components/common/Footer';
import { AppContext } from '../../../../context/AppContext';
import api from '../../../../api/axios';
import { API_ROUTES } from '../../../../api/routes';

function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile, authLoading } = useContext(AppContext);

  // Profile View tabs: 'profile' | 'addresses' | 'orders'
  const [activeTab, setActiveTab] = useState('orders');

  // Edit Profile State
  const [newName, setNewName] = useState('');
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');

  // Addresses State
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrName, setAddrName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrHouseName, setAddrHouseName] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('');
  const [addrPin, setAddrPin] = useState('');
  const [addressError, setAddressError] = useState('');

  // Orders State
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/Login');
    }
    if (user) {
      setNewName(user.name);
    }
  }, [isAuthenticated, authLoading, user]);

  // Load addresses
  const loadAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const res = await api.get(API_ROUTES.ADDRESSES);
      if (res.data && res.data.status === 200) {
        setAddresses(res.data.data || []);
      }
    } catch (err) {
      console.error("Failed to load addresses", err);
    } finally {
      setLoadingAddresses(false);
    }
  };

  // Load orders
  const loadOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await api.get(API_ROUTES.ORDERS);
      if (res.data && res.data.status === 200) {
        setOrders(res.data.data?.items || []);
      }
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'addresses') loadAddresses();
      if (activeTab === 'orders') loadOrders();
    }
  }, [activeTab, isAuthenticated]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileMessage('');
    if (!newName.trim()) return;

    try {
      setUpdatingProfile(true);
      const res = await updateProfile(newName.trim());
      if (res.status === 200) {
        setProfileMessage("Profile updated successfully!");
      } else {
        setProfileMessage("❌ " + res.message);
      }
    } catch (err) {
      setProfileMessage("❌ " + (err.response?.data?.message || err.message));
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setAddressError('');

    try {
      const newAddr = {
        name: addrName.trim(),
        phone: addrPhone.trim(),
        house_name: addrHouseName.trim(),
        street: addrStreet.trim(),
        city: addrCity.trim(),
        state: addrState.trim(),
        pin_code: addrPin.trim()
      };

      const res = await api.post(API_ROUTES.ADDRESSES, newAddr);
      if (res.data && res.data.status === 200) {
        setAddresses(prev => [...prev, res.data.data]);
        setShowAddressForm(false);
        setAddrName('');
        setAddrPhone('');
        setAddrHouseName('');
        setAddrStreet('');
        setAddrCity('');
        setAddrState('');
        setAddrPin('');
      } else {
        setAddressError(res.data.message || "Failed to add address");
      }
    } catch (err) {
      setAddressError(err.response?.data?.message || err.message || "Failed to add address");
    }
  };

  const toggleOrderExpand = async (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
      return;
    }

    setExpandedOrderId(orderId);
    if (orderDetails[orderId]) return;

    try {
      // Fetch details of specific order
      const res = await api.get(API_ROUTES.ORDER_ITEM(orderId));
      if (res.data && res.data.status === 200) {
        setOrderDetails(prev => ({
          ...prev,
          [orderId]: res.data.data || []
        }));
      }
    } catch (err) {
      console.error("Failed to load order items", err);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await api.put(API_ROUTES.USER_ORDER_CANCEL(orderId));
      if (res.data && res.data.status === 200) {
        alert("Order cancelled successfully!");
        // Reload order list
        loadOrders();
      } else {
        alert(res.data.message || "Failed to cancel order");
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to cancel order");
    }
  };

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
          
          {/* PROFILE UPDATE TAB */}
          {activeTab === 'profile' && (
            <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-md">
              <div>
                <h3 className="text-xl font-bold text-white">Edit Profile Details</h3>
                <p className="text-xs text-gray-500 mt-1">Keep your profile credentials up to date</p>
              </div>

              {profileMessage && (
                <p className={`text-xs font-bold ${profileMessage.startsWith('❌') ? 'text-red-500' : 'text-green-400'}`}>
                  {profileMessage}
                </p>
              )}

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Account Email</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full bg-[#0b0c10] text-sm text-gray-500 px-4 py-3 rounded-xl border border-white/5 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Display Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className="w-full bg-[#0b0c10] text-sm text-gray-200 px-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={updatingProfile}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-sm rounded-xl flex items-center gap-2 transition disabled:opacity-50"
              >
                <FaSave /> {updatingProfile ? "Updating..." : "Save Changes"}
              </button>
            </form>
          )}

          {/* ADDRESS BOOK TAB */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white">Shipping Address Book</h3>
                  <p className="text-xs text-gray-500 mt-1">Manage where your acoustic products are shipped</p>
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
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Add Shipping Address</h4>
                  {addressError && <p className="text-xs text-red-500">{addressError}</p>}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Recipient Full Name"
                      value={addrName}
                      onChange={(e) => setAddrName(e.target.value)}
                      required
                      className="bg-[#0b0c10] text-sm text-gray-200 px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      placeholder="Phone Number (10+ digits)"
                      value={addrPhone}
                      onChange={(e) => setAddrPhone(e.target.value)}
                      required
                      className="bg-[#0b0c10] text-sm text-gray-200 px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="House Name / Flat No"
                      value={addrHouseName}
                      onChange={(e) => setAddrHouseName(e.target.value)}
                      required
                      className="bg-[#0b0c10] text-sm text-gray-200 px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      placeholder="Street Name"
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
                    <button type="submit" className="px-6 py-2.5 bg-amber-500 text-black font-extrabold text-xs rounded-xl">
                      Save Address
                    </button>
                    <button type="button" onClick={() => setShowAddressForm(false)} className="px-6 py-2.5 bg-white/5 text-gray-400 font-bold text-xs rounded-xl">
                      Cancel
                    </button>
                  </div>
                </form>
              ) : loadingAddresses ? (
                <div className="py-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500"></div></div>
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
          )}

          {/* ORDER HISTORY TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Purchase Orders History</h3>
                <p className="text-xs text-gray-500 mt-1">Track and manage all your SoundCore purchases</p>
              </div>

              {loadingOrders ? (
                <div className="py-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500"></div></div>
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
                                {items.map((item, index) => (
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
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
