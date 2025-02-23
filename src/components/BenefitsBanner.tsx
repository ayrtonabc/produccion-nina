import React from 'react';
import { Leaf, Heart, Sprout, ShieldCheck } from 'lucide-react';

const BenefitsBanner = () => {
  const benefits = [
    {
      icon: <Leaf className="w-12 h-12 text-green-600" />,
      title: "100% Naturalne",
      description: "Wszystkie nasze produkty pochodzą z certyfikowanych upraw ekologicznych"
    },
    {
      icon: <Heart className="w-12 h-12 text-green-600" />,
      title: "Zdrowie i Witalność",
      description: "Wspierają zdrowy styl życia i wzmacniają naturalną odporność organizmu"
    },
    {
      icon: <Sprout className="w-12 h-12 text-green-600" />,
      title: "Świeżość i Jakość",
      description: "Starannie wyselekcjonowane i przechowywane w optymalnych warunkach"
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-green-600" />,
      title: "Gwarancja Jakości",
      description: "Każdy produkt przechodzi rygorystyczne testy jakości"
    }
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-50 rounded-full opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-50 rounded-full opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-gray-900 mb-4">
            Dlaczego Warto Wybrać Naturalne Produkty?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Odkryj moc natury w każdym naszym produkcie. Stawiamy na jakość, 
            tradycję i zrównoważony rozwój.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-green-50 rounded-full">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-center">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto italic">
            "Natura dała nam wszystko, czego potrzebujemy do zdrowego i szczęśliwego życia. 
            Naszą misją jest dostarczanie tych darów w najczystszej formie."
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsBanner;