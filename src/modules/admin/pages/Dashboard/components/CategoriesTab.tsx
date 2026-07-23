import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface CategoriesTabProps {
  categories: any[];
  catName: string;
  setCatName: (val: string) => void;
  handleAddCategory: (e: React.FormEvent) => void;
  handleDeleteCategory: (id: any) => void;
}

export const CategoriesTab: React.FC<CategoriesTabProps> = ({
  categories,
  catName,
  setCatName,
  handleAddCategory,
  handleDeleteCategory
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-heading font-extrabold text-text-main">Category Taxonomies</h3>
        <p className="text-xs text-text-muted mt-1">Organize catalog navigation hierarchy</p>
      </div>

      <form onSubmit={handleAddCategory} className="flex gap-4 max-w-md">
        <input
          type="text"
          placeholder="New Category Name"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
          required
          className="flex-grow bg-bg-input text-sm text-text-main px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
        />
        <button
          type="submit"
          className="px-6 py-2.5 bg-brand-primary text-black font-extrabold text-xs rounded-xl flex items-center gap-1.5 hover:bg-brand-hover transition"
        >
          <FaPlus /> Add
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div key={c.id || c.name} className="bg-bg-input border border-border-subtle p-4 rounded-xl flex justify-between items-center">
            <span className="font-bold text-sm text-text-main capitalize">{c.name}</span>
            <button
              onClick={() => handleDeleteCategory(c.id)}
              className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
            >
              <FaTrash className="text-xs" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesTab;
