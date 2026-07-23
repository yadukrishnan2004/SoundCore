import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../../store/useAuthStore';
import api from '../../../../../api/axios';
import { API_ROUTES } from '../../../../../api/routes';

export function useProfile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, authLoading, updateProfile } = useAuthStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders'>('orders');

  // Profile State
  const [newName, setNewName] = useState('');
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');

  // Addresses State
  const [addresses, setAddresses] = useState<any[]>([]);
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
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<any>(null);
  const [orderDetails, setOrderDetails] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/Login');
    }
    if (user) {
      setNewName(user.name);
    }
  }, [isAuthenticated, authLoading, user, navigate]);

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

  const handleUpdateProfile = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      setProfileMessage("❌ " + (err.response?.data?.message || err.message));
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      setAddressError(err.response?.data?.message || err.message || "Failed to add address");
    }
  };

  const toggleOrderExpand = async (orderId: any) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
      return;
    }

    setExpandedOrderId(orderId);
    if (orderDetails[orderId]) return;

    try {
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

  const handleCancelOrder = async (orderId: any) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await api.put(API_ROUTES.USER_ORDER_CANCEL(orderId));
      if (res.data && res.data.status === 200) {
        alert("Order cancelled successfully!");
        loadOrders();
      } else {
        alert(res.data.message || "Failed to cancel order");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || "Failed to cancel order");
    }
  };

  return {
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
  };
}
