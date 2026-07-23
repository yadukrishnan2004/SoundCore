import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../../context/AppContext';
import api from '../../../../../api/axios';
import { API_ROUTES } from '../../../../../api/routes';

export function useAdminDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, authLoading } = useContext(AppContext) as any;

  const [activeTab, setActiveTab] = useState('analytics');
  const [loading, setLoading] = useState(false);

  // Stats / KPIs State
  const [kpi, setKpi] = useState<any>(null);

  // Products State
  const [products, setProducts] = useState<any[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodCat, setProdCat] = useState('');
  const [prodStock, setProdStock] = useState('');
  const [prodImage, setProdImage] = useState('');

  // Categories State
  const [categories, setCategories] = useState<any[]>([]);
  const [catName, setCatName] = useState('');

  // Orders State
  const [orders, setOrders] = useState<any[]>([]);

  // Users State
  const [users, setUsers] = useState<any[]>([]);

  // Check admin authorization
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || user?.role !== 'admin') {
        navigate('/');
      }
    }
  }, [isAuthenticated, user, authLoading, navigate]);

  // Load KPI Stats
  const loadKPIs = async () => {
    try {
      setLoading(true);
      const res = await api.get(API_ROUTES.ADMIN_KPI);
      if (res.data && res.data.status === 200) {
        setKpi(res.data.data);
      }
    } catch (err) {
      console.error("Failed to load KPIs", err);
    } finally {
      setLoading(false);
    }
  };

  // Load Products
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get(API_ROUTES.ADMIN_PRODUCTS);
      if (res.data && res.data.status === 200) {
        setProducts(res.data.data || []);
      }
    } catch (err) {
      console.error("Failed to load products for admin", err);
    } finally {
      setLoading(false);
    }
  };

  // Load Categories
  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get(API_ROUTES.ADMIN_CATEGORIES);
      if (res.data && res.data.status === 200) {
        setCategories(res.data.data || []);
      }
    } catch (err) {
      console.error("Failed to load categories for admin", err);
    } finally {
      setLoading(false);
    }
  };

  // Load Orders
  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get(API_ROUTES.ADMIN_ORDERS);
      if (res.data && res.data.status === 200) {
        setOrders(res.data.data?.items || []);
      }
    } catch (err) {
      console.error("Failed to load orders for admin", err);
    } finally {
      setLoading(false);
    }
  };

  // Load Users
  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get(API_ROUTES.ADMIN_USERS);
      if (res.data && res.data.status === 200) {
        setUsers(res.data.data || []);
      }
    } catch (err) {
      console.error("Failed to load users for admin", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      if (activeTab === 'analytics') loadKPIs();
      if (activeTab === 'products') { loadProducts(); loadCategories(); }
      if (activeTab === 'categories') loadCategories();
      if (activeTab === 'orders') loadOrders();
      if (activeTab === 'users') loadUsers();
    }
  }, [activeTab, isAuthenticated, user]);

  // Handle Add Product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: prodName.trim(),
        price: parseFloat(prodPrice),
        desc: prodDesc.trim(),
        category: prodCat,
        stock: parseInt(prodStock),
        images: prodImage.trim() ? [prodImage.trim()] : []
      };

      const res = await api.post(API_ROUTES.ADMIN_PRODUCTS, payload);
      if (res.data && res.data.status === 200) {
        alert("Product added successfully!");
        setShowProductForm(false);
        setProdName('');
        setProdPrice('');
        setProdDesc('');
        setProdCat('');
        setProdStock('');
        setProdImage('');
        loadProducts();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || "Failed to add product");
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (prodId: any) => {
    if (!window.confirm("Delete this product from inventory?")) return;
    try {
      const res = await api.delete(API_ROUTES.ADMIN_PRODUCT_ITEM(prodId));
      if (res.data && res.data.status === 200) {
        alert("Product deleted!");
        loadProducts();
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete product");
    }
  };

  // Handle Add Category
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    try {
      const res = await api.post(API_ROUTES.ADMIN_CATEGORIES, { name: catName.trim() });
      if (res.data && res.data.status === 200) {
        setCatName('');
        loadCategories();
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Handle Delete Category
  const handleDeleteCategory = async (catId: any) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      const res = await api.delete(API_ROUTES.ADMIN_CATEGORY_ITEM(catId));
      if (res.data && res.data.status === 200) {
        loadCategories();
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Handle Update Order Status
  const handleOrderStatusUpdate = async (orderId: any, newStatus: string) => {
    try {
      const res = await api.put(API_ROUTES.ADMIN_ORDER_STATUS(orderId), { status: newStatus });
      if (res.data && res.data.status === 200) {
        alert("Order status updated!");
        loadOrders();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || "Failed to update status");
    }
  };

  // Handle User Blocking
  const handleToggleUserBlock = async (userId: any) => {
    try {
      const res = await api.patch(API_ROUTES.ADMIN_USER_BLOCK(userId));
      if (res.data && res.data.status === 200) {
        alert(res.data.message || "User block status updated!");
        loadUsers();
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return {
    activeTab,
    setActiveTab,
    loading,
    kpi,
    products,
    showProductForm,
    setShowProductForm,
    prodName,
    setProdName,
    prodPrice,
    setProdPrice,
    prodDesc,
    setProdDesc,
    prodCat,
    setProdCat,
    prodStock,
    setProdStock,
    prodImage,
    setProdImage,
    categories,
    catName,
    setCatName,
    orders,
    users,
    handleAddProduct,
    handleDeleteProduct,
    handleAddCategory,
    handleDeleteCategory,
    handleOrderStatusUpdate,
    handleToggleUserBlock
  };
}
