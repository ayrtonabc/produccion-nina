import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img 
            id="about"
            src="/about.jpg"
            alt="O mnie"
            className="rounded-lg shadow-xl"
          />
        </div>
        
        <div>
          <h2  className="text-4xl font-serif text-gray-900 mb-6">O mnie</h2>
          <p className="text-gray-600 mb-6">
            Zapraszam Cię do mojej kaflowej kuchni i chlebowego pieca. Tutaj, w sercu natury, 
            tworzę wyjątkowe mieszanki przypraw i ziół, które nie tylko nadają smak potrawom, 
            ale także wspierają zdrowie i dobre samopoczucie.
          </p>
          <p className="text-gray-600 mb-8">
            Gotujmy na ogniu, dbajmy o zdrowie, pogadajmy o życiu i świadomie korzystajmy z 
            dobrodziejstwa przypraw.
          </p>
          <button className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full">
            Porozmawiajmy
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;