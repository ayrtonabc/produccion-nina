import React, { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { Pencil, Trash2, Plus } from "lucide-react";
import CategoryManager from "./CategoryManager";
import { supabase } from "../../lib/supabaseClient";

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { categories } = useCategories();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    image_url: "",
    category_id: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProduct.id) {
      await updateProduct(currentProduct);
    } else {
      await addProduct(currentProduct);
    }
    setIsEditing(false);
    setCurrentProduct({ id: "", title: "", description: "", price: "", image_url: "", category_id: "" });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle image upload to Supabase storage
      // Update currentProduct.image_url with the uploaded image URL
      const fileName = `${Date.now()}-${file.name}`;

      // Subir la imagen a Supabase Storage
      const { data, error } = await supabase.storage.from("product-images").upload(fileName, file);

      if (error) {
        console.error("Error al subir la imagen:", error);
        return;
      }

      // Obtener la URL pública de la imagen
      const result = supabase.storage.from("product-images").getPublicUrl(fileName);

      // if (publicUrlError) {
      //   console.error("Error al obtener la URL pública:", publicUrlError);
      //   return;
      // }

      // Actualizar currentProduct.image_url con la URL pública
      if (result.data.publicUrl) {
        setCurrentProduct((prevProduct) => ({
          ...prevProduct,
          image_url: result.data.publicUrl
        }));
        // currentProduct.image_url = result.data.publicUrl;
      } else {

      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif">Zarządzaj Produktami</h2>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Dodaj Produkt
          </button>
        )}
      </div>

      <CategoryManager />

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg shadow p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Kategoria</label>
            <select value={currentProduct.category_id} onChange={(e) => setCurrentProduct({ ...currentProduct, category_id: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" required>
              <option value="">Wybierz kategorię</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tytuł</label>
            <input type="text" value={currentProduct.title} onChange={(e) => setCurrentProduct({ ...currentProduct, title: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Opis</label>
            <textarea value={currentProduct.description} onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" rows={3} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cena (zł)</label>
            <input type="number" value={currentProduct.price} onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Zdjęcie</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1 block w-full" />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setCurrentProduct({ id: "", title: "", description: "", price: "", image_url: "", category_id: "" });
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Anuluj
            </button>
            <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900">
              {currentProduct.id ? "Zapisz zmiany" : "Dodaj produkt"}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <img src={product.image_url} alt={product.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-green-800 font-bold mb-2">{product.price} zł</p>
              <p className="text-gray-500 mb-4">Kategoria: {categories.find((c) => c.id === product.category_id)?.name || "Brak kategorii"}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setCurrentProduct(product);
                    setIsEditing(true);
                  }}
                  className="p-2 text-gray-600 hover:text-green-800"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button onClick={() => deleteProduct(product.id)} className="p-2 text-gray-600 hover:text-red-600">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
