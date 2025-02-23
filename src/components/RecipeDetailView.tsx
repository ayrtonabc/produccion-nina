import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';
import { ArrowLeft } from 'lucide-react';
import YouTube from 'react-youtube';

const RecipeDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes } = useRecipes();
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-gray-900 mb-4">Przepis nie został znaleziony</h2>
          <button 
            onClick={() => navigate(-1)}
            className="text-green-800 hover:text-green-900 font-semibold flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Wróć do przepisów
          </button>
        </div>
      </div>
    );
  }

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="text-green-800 hover:text-green-900 font-semibold flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Wróć do przepisów
        </button>

        <img 
          src={recipe.image_url} 
          alt={recipe.title}
          className="w-full h-[400px] object-cover rounded-2xl shadow-lg mb-8"
        />

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">{recipe.title}</h1>
          
          <div className="text-gray-500 mb-8">
            Opublikowano: {new Date(recipe.created_at).toLocaleDateString('pl-PL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>

          <div className="prose max-w-none mb-12">
            {recipe.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>

          {recipe.youtube_url && (
            <div className="mt-12">
              <h2 className="text-2xl font-serif text-gray-900 mb-6">Zobacz wideo</h2>
              <div className="aspect-w-16 aspect-h-9">
                <YouTube 
                  videoId={getYouTubeId(recipe.youtube_url) || ''} 
                  className="w-full rounded-xl overflow-hidden"
                  opts={{
                    width: '100%',
                    height: '100%',
                    playerVars: {
                      autoplay: 0,
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default RecipeDetailView;