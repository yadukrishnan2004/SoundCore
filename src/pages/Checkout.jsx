import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaCreditCard, FaMoneyBillWave, FaPlus, FaCheckCircle, FaTrash, FaChevronLeft } from 'react-icons/fa';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Navbar/Footer';
import { AppContext } from './context';
import api from '../components/api/axios';
import { API_ROUTES } from '../components/api/routes';

function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cart, user, isAuthenticated, clearCart } = useContext(AppContext);

  // Buy Now flags
  const isBuyNow = searchParams.get('buy_now') === 'true';
  const buyNowProductId = searchParams.get('product_id');
  const buyNowQty = parseInt(searchParams.get('quantity') || '1');

  // Checkout State
  const [buyNowProduct, setBuyNowProduct] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('COD'); // 'COD' | 'Razorpay'
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Add Address Form State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrName, setAddrName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrHouseName, setAddrHouseName] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('');
  const [addrPin, setAddrPin] = useState('');
  const [addressError, setAddressError] = useState('');

  // Fetch addresses and optional Buy Now product
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        // 1. Fetch addresses
        const addrRes = await api.get(API_ROUTES.ADDRESSES);
        if (addrRes.data && addrRes.data.status === 200) {
          const addrList = addrRes.data.data || [];
          setAddresses(addrList);
          if (addrList.length > 0) {
            setSelectedAddressId(addrList[0].id);
          }
        }

        // 2. Fetch buy now product if applicable
        if (isBuyNow && buyNowProductId) {
          const prodRes = await api.get(API_ROUTES.USER_PRODUCT_DETAIL(buyNowProductId));
          if (prodRes.data && prodRes.data.status === 200) {
            setBuyNowProduct(prodRes.data.data);
          }
        }
      } catch (err) {
        console.error("Failed to load checkout details", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated, isBuyNow, buyNowProductId]);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setAddressError('');

    if (addrPhone.trim().length < 10) {
      setAddressError("Phone number must be at least 10 digits");
      return;
    }

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
        const addedAddress = res.data.data;
        setAddresses(prev => [...prev, addedAddress]);
        setSelectedAddressId(addedAddress.id);
        setShowAddressForm(false);
        // Clear fields
        setAddrName('');
        setAddrPhone('');
        setAddrHouseName('');
        setAddrStreet('');
        setAddrCity('');
        setAddrState('');
        setAddrPin('');
      } else {
        setAddressError(res.data.message || "Failed to create address");
      }
    } catch (err) {
      setAddressError(err.response?.data?.message || err.message || "Failed to add address");
    }
  };

  const getCheckoutItems = () => {
    if (isBuyNow && buyNowProduct) {
      const price = buyNowProduct.price;
      const subtotal = price * buyNowQty;
      const shipping = 50.0;
      const tax = subtotal * 0.1;
      const total = subtotal + shipping + tax;
      return {
        items: [{
          product_id: buyNowProduct.id,
          product_name: buyNowProduct.name,
          price: price,
          quantity: buyNowQty,
          sub_total: subtotal
        }],
        subtotal,
        shipping,
        tax,
        total
      };
    } else {
      const subtotal = cart.items ? cart.items.reduce((sum, item) => sum + item.sub_total, 0) : 0;
      const shipping = subtotal > 0 ? 50.0 : 0;
      const tax = subtotal * 0.1;
      const total = subtotal + shipping + tax;
      return {
        items: cart.items || [],
        subtotal,
        shipping,
        tax,
        total
      };
    }
  };

  const { items, subtotal, shipping, tax, total } = getCheckoutItems();

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert("Please select or add a delivery address.");
      return;
    }

    try {
      setSubmitting(true);
      let razorpayOrderId = "";

      if (isBuyNow) {
        // Buy Now order
        const buyNowReq = {
          product_id: parseInt(buyNowProductId),
          quantity: buyNowQty,
          address_id: selectedAddressId,
          payment_method: paymentMethod
        };
        const res = await api.post(API_ROUTES.ORDER_BUY_NOW, buyNowReq);
        if (res.data && res.data.status === 200) {
          razorpayOrderId = res.data.data?.razorpay_order_id;
        } else {
          throw new Error(res.data.message || "Order placement failed");
        }
      } else {
        // Standard cart checkout
        const orderReq = {
          address_id: selectedAddressId,
          payment_method: paymentMethod
        };
        const res = await api.post(API_ROUTES.ORDERS, orderReq);
        if (res.data && res.data.status === 200) {
          razorpayOrderId = res.data.data?.razorpay_order_id;
        } else {
          throw new Error(res.data.message || "Order placement failed");
        }
      }

      // ----------------------------------------------------
      // Razorpay Payment Integration
      // ----------------------------------------------------
      if (paymentMethod === 'Razorpay' && razorpayOrderId) {
        const options = {
          key: "rzp_test_SJXrpA9sui4uvF", // Match backend key
          amount: Math.round(total * 100), // in paise
          currency: "INR",
          name: "SoundCore Premium",
          description: "SoundCore E-Commerce Purchase",
          order_id: razorpayOrderId,
          handler: async function (response) {
            try {
              // Verify on backend
              const verifyRes = await api.post(API_ROUTES.ORDER_VERIFY_PAYMENT, {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              });
              if (verifyRes.data && verifyRes.data.status === 200) {
                alert("Payment verified! Your order has been placed.");
                if (!isBuyNow) clearCart();
                navigate('/profile');
              } else {
                alert("Payment verification failed: " + (verifyRes.data.message || "Error"));
              }
            } catch (err) {
              alert("Payment verification network error: " + err.message);
            }
          },
          prefill: {
            name: user?.name || "",
            email: user?.email || ""
          },
          theme: {
            color: "#f59e0b"
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // COD order completed successfully
        alert("Order placed successfully under Cash on Delivery!");
        if (!isBuyNow) clearCart();
        navigate('/profile');
      }

    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
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

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-grow">
        
        {/* Header navigation */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 group"
        >
          <FaChevronLeft className="group-hover:-translate-x-0.5 transition-transform" /> Back
        </button>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-8">SECURE CHECKOUT</h1>

        {items.length === 0 ? (
          <div className="bg-[#15161b] border border-white/5 rounded-3xl p-12 text-center max-w-lg mx-auto mt-10">
            <p className="text-lg font-bold text-white">No items to checkout</p>
            <button onClick={() => navigate('/AllProducts')} className="mt-6 px-8 py-3 bg-amber-500 text-black font-bold text-sm rounded-full transition">
              Explore Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Options (Address, Payment) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* 1. Address Section */}
              <section className="bg-[#15161b] border border-white/5 rounded-3xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FaMapMarkerAlt className="text-amber-500" /> 1. DELIVERY ADDRESS
                  </h2>
                  {!showAddressForm && (
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-500 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all"
                    >
                      <FaPlus /> Add Address
                    </button>
                  )}
                </div>

                {showAddressForm ? (
                  <form onSubmit={handleAddAddress} className="space-y-4 bg-black/20 p-5 rounded-2xl border border-white/5">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">New Shipping Address</h3>
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

              {/* 2. Payment Method Section */}
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

            </div>

            {/* Right Column: Order Summary */}
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

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Checkout;
