import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../../../../context/AppContext';
import api from '../../../../../api/axios';
import { API_ROUTES } from '../../../../../api/routes';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function useCheckout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cart, user, isAuthenticated, clearCart } = useContext(AppContext) as any;

  // Buy Now flags
  const isBuyNow = searchParams.get('buy_now') === 'true';
  const buyNowProductId = searchParams.get('product_id');
  const buyNowQty = parseInt(searchParams.get('quantity') || '1');

  // Checkout State
  const [buyNowProduct, setBuyNowProduct] = useState<any>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<any>(null);
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
  }, [isAuthenticated, isBuyNow, buyNowProductId, navigate]);

  const handleAddAddress = async (e: React.FormEvent) => {
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
    } catch (err: any) {
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
      const subtotal = cart.items ? cart.items.reduce((sum: number, item: any) => sum + item.sub_total, 0) : 0;
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
        const buyNowReq = {
          product_id: parseInt(buyNowProductId || '0'),
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

      if (paymentMethod === 'Razorpay' && razorpayOrderId) {
        const options = {
          key: "rzp_test_SJXrpA9sui4uvF",
          amount: Math.round(total * 100),
          currency: "INR",
          name: "SoundCore Premium",
          description: "SoundCore E-Commerce Purchase",
          order_id: razorpayOrderId,
          handler: async function (response: any) {
            try {
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
            } catch (err: any) {
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
        alert("Order placed successfully under Cash on Delivery!");
        if (!isBuyNow) clearCart();
        navigate('/profile');
      }

    } catch (err: any) {
      alert(err.response?.data?.message || err.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  return {
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
  };
}
