import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Recipe {
  id: string;
  title: string;
  content: string;
  image_url: string;
  youtube_url: string;
  created_at: string;
}

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching recipes:', error);
      return;
    }

    setRecipes(data || []);
  }

  async function addRecipe(recipe: Omit<Recipe, 'id' | 'created_at'>) {
    const { error } = await supabase
      .from('recipes')
      .insert([recipe]);

    if (error) {
      console.error('Error adding recipe:', error);
      return;
    }

    fetchRecipes();
  }

  async function updateRecipe(recipe: Recipe) {
    const { error } = await supabase
      .from('recipes')
      .update(recipe)
      .eq('id', recipe.id);

    if (error) {
      console.error('Error updating recipe:', error);
      return;
    }

    fetchRecipes();
  }

  async function deleteRecipe(id: string) {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting recipe:', error);
      return;
    }

    fetchRecipes();
  }

  return {
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe
  };
}