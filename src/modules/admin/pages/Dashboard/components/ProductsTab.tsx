import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface ProductsTabProps {
  products: any[];
  categories: any[];
  showProductForm: boolean;
  setShowProductForm: (show: boolean) => void;
  prodName: string;
  setProdName: (val: string) => void;
  prodPrice: string;
  setProdPrice: (val: string) => void;
  prodDesc: string;
  setProdDesc: (val: string) => void;
  prodCat: string;
  setProdCat: (val: string) => void;
  prodStock: string;
  setProdStock: (val: string) => void;
  prodImage: string;
  setProdImage: (val: string) => void;
  handleAddProduct: (e: React.FormEvent) => void;
  handleDeleteProduct: (id: any) => void;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({
  products,
  categories,
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
  handleAddProduct,
  handleDeleteProduct
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-heading font-extrabold text-text-main">Inventory Management</h3>
          <p className="text-xs text-text-muted mt-1">Catalog items count: {products.length}</p>
        </div>
        <button
          onClick={() => setShowProductForm(!showProductForm)}
          className="text-xs bg-brand-primary text-black font-extrabold px-4 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
        >
          <FaPlus /> {showProductForm ? 'Close Form' : 'Add New Product'}
        </button>
      </div>

      {showProductForm && (
        <form onSubmit={handleAddProduct} className="bg-bg-input p-6 rounded-2xl border border-border-subtle space-y-4">
          <h4 className="text-sm font-heading font-bold text-text-main uppercase tracking-wider">Create New Inventory Item</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={prodName}
              onChange={(e) => setProdName(e.target.value)}
              required
              className="bg-bg-base text-sm text-text-main px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={prodPrice}
              onChange={(e) => setProdPrice(e.target.value)}
              required
              className="bg-bg-base text-sm text-text-main px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={prodCat}
              onChange={(e) => setProdCat(e.target.value)}
              required
              className="bg-bg-base text-sm text-text-main px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id || c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Stock Quantity"
              value={prodStock}
              onChange={(e) => setProdStock(e.target.value)}
              required
              className="bg-bg-base text-sm text-text-main px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
            />
          </div>

          <textarea
            placeholder="Product Description"
            value={prodDesc}
            onChange={(e) => setProdDesc(e.target.value)}
            rows={2}
            className="w-full bg-bg-base text-sm text-text-main px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
          ></textarea>

          <input
            type="text"
            placeholder="Image URL"
            value={prodImage}
            onChange={(e) => setProdImage(e.target.value)}
            className="w-full bg-bg-base text-sm text-text-main px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
          />

          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-primary text-black font-extrabold text-xs rounded-xl hover:bg-brand-hover transition"
          >
            Publish Product
          </button>
        </form>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-text-muted">
          <thead className="bg-bg-input text-text-main uppercase font-heading border-b border-border-subtle">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-bg-input/50 transition">
                <td className="p-3 font-bold text-text-main flex items-center gap-3">
                  <img src={p.images?.[0] || p.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=100&auto=format&fit=crop"} alt="" className="w-8 h-8 rounded bg-bg-input object-contain p-0.5" />
                  <span className="truncate max-w-xs">{p.name}</span>
                </td>
                <td className="p-3 uppercase font-semibold text-brand-primary">{p.category}</td>
                <td className="p-3 font-bold text-text-main font-heading">₹{p.price}</td>
                <td className="p-3 font-bold">{p.stock}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTab;
