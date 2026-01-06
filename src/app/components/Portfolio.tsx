import { useState } from 'react';

type Category = 'all' | 'weddings' | 'portraits' | 'events' | 'models' | 'babies';

interface PortfolioImage {
  id: number;
  src: string;
  category: Category;
  title: string;
}

const portfolioImages: PortfolioImage[] = [
  { id: 1, src: '/wed/wed1.jpg', category: 'weddings', title: 'Wedding Ceremony' },
  { id: 2, src: '/potrait/pot1.jpg', category: 'portraits', title: 'Studio Portrait' },
  { id: 3, src: '/events/event1.jpg', category: 'events', title: 'Concert Event' },
  { id: 4, src: '/potrait/pot2.jpg', category: 'portraits', title: 'Studio Portrait' },
  { id: 5, src: '/wed/wed2.jpg', category: 'weddings', title: 'Bride & Groom' },
  { id: 6, src: '/events/event2.jpg', category: 'events', title: 'Concert Event' },
  { id: 8, src: '/wed/wed3.jpg', category: 'weddings', title: 'Bride & Groom' },
  { id: 9, src: '/wed/wed4.jpg', category: 'weddings', title: 'Bride & Groom' },
  { id: 10, src: '/wed/wed5.jpg', category: 'weddings', title: 'Bride & Groom' },
  { id: 11, src: '/potrait/pot3.jpg', category: 'portraits', title: 'Studio Portrait' },
  { id: 12, src: '/potrait/pot4.jpg', category: 'portraits', title: 'Outdoor Portrait' },
  { id: 13, src: '/potrait/pot5.jpg', category: 'portraits', title: 'Studio Portrait' },
  { id: 14, src: '/events/event3.jpg', category: 'events', title: 'Concert Event' },
  { id: 15, src: '/events/event4.jpg', category: 'events', title: 'Concert Event' },
  { id: 16, src: '/events/event5.jpg', category: 'events', title: 'Concert Event' },
  { id: 17, src: '/models/model1.jpg', category: 'models', title: 'Fashion Model' },
  { id: 18, src: '/models/model2.jpg', category: 'models', title: 'Runway Model' },
  { id: 19, src: '/models/model3.jpg', category: 'models', title: 'Editorial Model' },
  { id: 20, src: '/models/model4.jpg', category: 'models', title: 'Fashion Model' },
  { id: 21, src: '/models/model5.jpg', category: 'models', title: 'Runway Model' },
  { id: 22, src: '/babies/baby1.jpg', category: 'babies', title: 'Baby Portrait' },
  { id: 23, src: '/babies/baby2.jpg', category: 'babies', title: 'Baby Portrait' },
  { id: 24, src: '/babies/baby3.jpg', category: 'babies', title: 'Baby Portrait' },
  { id: 25, src: '/babies/baby4.jpg', category: 'babies', title: 'Baby Portrait' },
  { id: 26, src: '/babies/baby5.jpg', category: 'babies', title: 'Baby Portrait' },
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredImages = activeCategory === 'all'
    ? portfolioImages
    : portfolioImages.filter(img => img.category === activeCategory);

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'events', label: 'Events' },
    { id: 'models', label: 'Models' },
    { id: 'babies', label: 'Babies' },
  ];

  return (
    <div id="portfolio" className="min-h-screen bg-white py-12 px-4">
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
          animation-delay: 0.2s;
          animation-fill-mode: backwards;
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.4s ease-out;
          animation-fill-mode: backwards;
        }

        .portfolio-item {
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .portfolio-item:hover {
          transform: translateY(-8px);
        }

        .portfolio-item img {
          transition: transform 0.4s ease;
        }

        .portfolio-item:hover img {
          transform: scale(1.1);
        }

        .portfolio-overlay {
          transition: opacity 0.3s ease;
        }

        .portfolio-item:hover .portfolio-overlay {
          opacity: 1;
        }

        .portfolio-text {
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .portfolio-item:hover .portfolio-text {
          transform: translateY(0);
          opacity: 1;
        }

        .category-btn {
          transition: all 0.3s ease;
        }

        .category-btn:hover {
          transform: scale(1.05);
        }

        .category-btn:active {
          transform: scale(0.95);
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Portfolio Gallery</h1>
          <p className="text-gray-600 text-lg">Explore our collection of captured moments across weddings, portraits, and special events</p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`category-btn px-6 py-2 rounded-full animate-fade-in-scale ${
                activeCategory === category.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="portfolio-item group relative overflow-hidden rounded-lg shadow-lg cursor-pointer animate-fade-in-scale"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-80 object-cover"
              />
              <div className="portfolio-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 opacity-0">
                <h3 className="portfolio-text text-white text-xl font-bold mb-2 transform translate-y-5 opacity-0">
                  {image.title}
                </h3>
                <p className="portfolio-text text-gray-300 text-sm capitalize transform translate-y-5 opacity-0" style={{ transitionDelay: '0.05s' }}>
                  {image.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}