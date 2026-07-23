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
  handleDeleteProduct: (prodId: any) => void;
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
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white">Product Inventory</h3>
          <p className="text-xs text-gray-500 mt-1">Browse, delete, and add new products</p>
        </div>
        {!showProductForm && (
          <button
            onClick={() => setShowProductForm(true)}
            className="text-xs bg-amber-500 text-black px-4 py-2 rounded-xl font-bold flex items-center gap-1.5"
          >
            <FaPlus /> Add Product
          </button>
        )}
      </div>

      {showProductForm ? (
        <form onSubmit={handleAddProduct} className="space-y-4 bg-black/20 p-6 rounded-2xl border border-white/5">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">New Product Details</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={prodName}
              onChange={(e) => setProdName(e.target.value)}
              required
              className="bg-[#0b0c10] text-sm px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
            />
            <input
              type="number"
              placeholder="Price (INR)"
              value={prodPrice}
              onChange={(e) => setProdPrice(e.target.value)}
              required
              className="bg-[#0b0c10] text-sm px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              value={prodCat}
              onChange={(e) => setProdCat(e.target.value)}
              required
              className="bg-[#0b0c10] text-sm px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
            >
              <option value="">Select Category</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
            
            <input
              type="number"
              placeholder="Initial Stock"
              value={prodStock}
              onChange={(e) => setProdStock(e.target.value)}
              required
              className="bg-[#0b0c10] text-sm px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={prodImage}
              onChange={(e) => setProdImage(e.target.value)}
              className="bg-[#0b0c10] text-sm px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
            />
          </div>

          <textarea
            placeholder="Product Specifications Description"
            value={prodDesc}
            onChange={(e) => setProdDesc(e.target.value)}
            required
            rows={3}
            className="w-full bg-[#0b0c10] text-sm px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
          ></textarea>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2.5 bg-amber-500 text-black font-extrabold text-xs rounded-xl">
              Save Product
            </button>
            <button type="button" onClick={() => setShowProductForm(false)} className="px-6 py-2.5 bg-white/5 text-gray-400 font-bold text-xs rounded-xl">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 font-bold uppercase tracking-wider">
                <th className="pb-3">Product</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Stock</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-white/5">
                  <td className="py-3 font-semibold text-white">{p.name}</td>
                  <td className="py-3 capitalize">{p.category}</td>
                  <td className="py-3 font-bold text-amber-500">₹{p.price}</td>
                  <td className={`py-3 font-bold ${p.stock <= 5 ? 'text-red-500' : 'text-green-400'}`}>
                    {p.stock}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg hover:bg-red-500/20"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductsTab;
