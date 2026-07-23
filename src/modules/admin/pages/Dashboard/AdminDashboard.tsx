import React from 'react';
import { FaChartBar, FaBox, FaTags, FaShoppingBag, FaUsers } from 'react-icons/fa';
import Navbar from '../../../../components/common/Navbar';
import Footer from '../../../../components/common/Footer';
import { useAdminDashboard } from './hooks/useAdminDashboard';
import { AnalyticsTab } from './components/AnalyticsTab';
import { ProductsTab } from './components/ProductsTab';
import { CategoriesTab } from './components/CategoriesTab';
import { OrdersTab } from './components/OrdersTab';
import { UsersTab } from './components/UsersTab';

function AdminDashboard() {
  const {
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
  } = useAdminDashboard();

  return (
    <div className="bg-bg-base text-text-main min-h-screen flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 bg-bg-card border border-border-subtle rounded-3xl p-6 space-y-2">
          <h2 className="text-sm font-heading font-bold text-text-muted uppercase tracking-widest px-4 pb-4 border-b border-border-subtle mb-4">Admin Console</h2>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center gap-3 transition ${
              activeTab === 'analytics' ? 'bg-brand-primary text-black font-extrabold' : 'text-text-muted hover:bg-bg-input'
            }`}
          >
            <FaChartBar /> KPI Analytics
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center gap-3 transition ${
              activeTab === 'products' ? 'bg-brand-primary text-black font-extrabold' : 'text-text-muted hover:bg-bg-input'
            }`}
          >
            <FaBox /> Inventory & Products
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center gap-3 transition ${
              activeTab === 'categories' ? 'bg-brand-primary text-black font-extrabold' : 'text-text-muted hover:bg-bg-input'
            }`}
          >
            <FaTags /> Categories
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center gap-3 transition ${
              activeTab === 'orders' ? 'bg-brand-primary text-black font-extrabold' : 'text-text-muted hover:bg-bg-input'
            }`}
          >
            <FaShoppingBag /> Orders Lifecycle
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center gap-3 transition ${
              activeTab === 'users' ? 'bg-brand-primary text-black font-extrabold' : 'text-text-muted hover:bg-bg-input'
            }`}
          >
            <FaUsers /> Customer Accounts
          </button>
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-9 bg-bg-card border border-border-subtle rounded-3xl p-6 sm:p-8 min-h-[500px]">
          {loading && (
            <div className="py-20 text-center text-text-muted font-semibold animate-pulse">
              Syncing backend records...
            </div>
          )}

          {!loading && activeTab === 'analytics' && (
            <AnalyticsTab kpi={kpi} ordersCount={orders.length} usersCount={users.length} />
          )}

          {!loading && activeTab === 'products' && (
            <ProductsTab
              products={products}
              categories={categories}
              showProductForm={showProductForm}
              setShowProductForm={setShowProductForm}
              prodName={prodName}
              setProdName={setProdName}
              prodPrice={prodPrice}
              setProdPrice={setProdPrice}
              prodDesc={prodDesc}
              setProdDesc={setProdDesc}
              prodCat={prodCat}
              setProdCat={setProdCat}
              prodStock={prodStock}
              setProdStock={setProdStock}
              prodImage={prodImage}
              setProdImage={setProdImage}
              handleAddProduct={handleAddProduct}
              handleDeleteProduct={handleDeleteProduct}
            />
          )}

          {!loading && activeTab === 'categories' && (
            <CategoriesTab
              categories={categories}
              catName={catName}
              setCatName={setCatName}
              handleAddCategory={handleAddCategory}
              handleDeleteCategory={handleDeleteCategory}
            />
          )}

          {!loading && activeTab === 'orders' && (
            <OrdersTab orders={orders} handleOrderStatusUpdate={handleOrderStatusUpdate} />
          )}

          {!loading && activeTab === 'users' && (
            <UsersTab users={users} handleToggleUserBlock={handleToggleUserBlock} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
