import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface CategoriesTabProps {
  categories: any[];
  catName: string;
  setCatName: (val: string) => void;
  handleAddCategory: (e: React.FormEvent) => void;
  handleDeleteCategory: (catId: any) => void;
}

export const CategoriesTab: React.FC<CategoriesTabProps> = ({
  categories,
  catName,
  setCatName,
  handleAddCategory,
  handleDeleteCategory
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-xl font-bold text-white">Categories Directory</h3>
        <p className="text-xs text-gray-500 mt-1">Add or remove system categories</p>
      </div>

      <form onSubmit={handleAddCategory} className="flex gap-3">
        <input
          type="text"
          placeholder="New Category Name"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
          className="bg-[#0b0c10] text-sm px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500 flex-grow"
        />
        <button type="submit" className="px-6 py-2.5 bg-amber-500 text-black font-extrabold text-xs rounded-xl flex items-center gap-1.5">
          <FaPlus /> Add Category
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categories.map(c => (
          <div key={c.id} className="p-4 bg-black/20 border border-white/5 rounded-xl flex justify-between items-center capitalize">
            <span>{c.name}</span>
            <button
              onClick={() => handleDeleteCategory(c.id)}
              className="text-gray-500 hover:text-red-500 transition"
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
