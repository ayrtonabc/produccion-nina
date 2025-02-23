import React, { useState } from 'react';
import { useRecipes } from '../../hooks/useRecipes';
import { Pencil, Trash2, Plus } from 'lucide-react';

const AdminRecipes = () => {
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({
    id: '',
    title: '',
    content: '',
    image_url: '',
    youtube_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRecipe.id) {
      await updateRecipe(currentRecipe);
    } else {
      await addRecipe(currentRecipe);
    }
    setIsEditing(false);
    setCurrentRecipe({ id: '', title: '', content: '', image_url: '', youtube_url: '' });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle image upload to Supabase storage
      // Update currentRecipe.image_url with the uploaded image URL
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif">Zarządzaj Przepisami</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Dodaj Przepis
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tytuł</label>
            <input
              type="text"
              value={currentRecipe.title}
              onChange={(e) => setCurrentRecipe({ ...currentRecipe, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Treść</label>
            <textarea
              value={currentRecipe.content}
              onChange={(e) => setCurrentRecipe({ ...currentRecipe, content: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              rows={10}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Link do YouTube</label>
            <input
              type="url"
              value={currentRecipe.youtube_url}
              onChange={(e) => setCurrentRecipe({ ...currentRecipe, youtube_url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Zdjęcie</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setCurrentRecipe({ id: '', title: '', content: '', image_url: '', youtube_url: '' });
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900"
            >
              {currentRecipe.id ? 'Zapisz zmiany' : 'Dodaj przepis'}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="border rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-xl mb-2">{recipe.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {new Date(recipe.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setCurrentRecipe(recipe);
                      setIsEditing(true);
                    }}
                    className="p-2 text-gray-600 hover:text-green-800"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteRecipe(recipe.id)}
                    className="p-2 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="prose max-w-none">
                {recipe.content.substring(0, 200)}...
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRecipes;