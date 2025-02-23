import React, { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

const CategoryManager = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editName, setEditName] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCategory(newCategoryName);
      setNewCategoryName('');
      setIsAdding(false);
    } catch (error) {
      alert('Error adding category');
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateCategory(id, editName);
      setEditingId(null);
      setEditName('');
    } catch (error) {
      alert('Error updating category');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
      } catch (error) {
        alert('Error deleting category');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Zarządzaj Kategoriami</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-green-800 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-green-900"
        >
          <Plus className="w-4 h-4" />
          Dodaj Kategorię
        </button>
      </div>

      <div className="space-y-2">
        {isAdding && (
          <form onSubmit={handleAdd} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nazwa kategorii"
              className="flex-1 px-3 py-1 border rounded"
              autoFocus
            />
            <button
              type="submit"
              className="text-green-700 hover:text-green-900"
            >
              <Check className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-red-700 hover:text-red-900"
            >
              <X className="w-5 h-5" />
            </button>
          </form>
        )}

        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
          >
            {editingId === category.id ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 px-3 py-1 border rounded"
                  autoFocus
                />
                <button
                  onClick={() => handleUpdate(category.id)}
                  className="text-green-700 hover:text-green-900"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditName('');
                  }}
                  className="text-red-700 hover:text-red-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <span>{category.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingId(category.id);
                      setEditName(category.name);
                    }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;