import React from 'react';
import { useRecipes } from '../hooks/useRecipes';
import { useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';

const RecipesSection = () => {
  const { recipes } = useRecipes();
  const navigate = useNavigate();

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <section className="py-20 bg-white" id="recipes">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-serif text-gray-900 mb-12 text-center">Przepisy</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {recipes.map((recipe) => (
            <article key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {recipe.youtube_url ? (
                <div className="aspect-w-16 aspect-h-9">
                  <YouTube 
                    videoId={getYouTubeId(recipe.youtube_url) || ''} 
                    className="w-full"
                    opts={{
                      width: '100%',
                      height: '360',
                      playerVars: {
                        modestbranding: 1,
                      },
                    }}
                  />
                </div>
              ) : (
                <img 
                  src={recipe.image_url} 
                  alt={recipe.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-4">{recipe.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {recipe.content.substring(0, 150)}...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">
                    {new Date(recipe.created_at).toLocaleDateString('pl-PL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <button 
                    onClick={() => navigate(`/recipes/${recipe.id}`)}
                    className="bg-green-800 hover:bg-green-900 text-white px-6 py-2 rounded-full transition-colors duration-200"
                  >
                    Czytaj więcej
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipesSection;