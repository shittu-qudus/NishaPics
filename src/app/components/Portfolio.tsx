import { useState, useEffect, useMemo, useCallback } from 'react';

type Category = 'all' | 'weddings' | 'portraits' | 'events' | 'models' | 'babies';

interface PortfolioImage {
  id: number;
  src: string;
  category: Category;
  title: string;
  placeholderColor?: string;
  width?: number;
  height?: number;
}

const portfolioImages: PortfolioImage[] = [
  { id: 1, src: '/wed/wed1.jpg', category: 'weddings', title: 'Wedding Ceremony', placeholderColor: '#f0e6d2', width: 800, height: 600 },
  { id: 2, src: '/potrait/pot1.jpg', category: 'portraits', title: 'Studio Portrait', placeholderColor: '#d9d9d9', width: 600, height: 800 },
  { id: 3, src: '/events/event1.jpg', category: 'events', title: 'Concert Event', placeholderColor: '#1a1a1a', width: 800, height: 600 },
  { id: 4, src: '/potrait/pot2.jpg', category: 'portraits', title: 'Studio Portrait', placeholderColor: '#e6e6e6', width: 600, height: 800 },
  { id: 5, src: '/wed/wed2.jpg', category: 'weddings', title: 'Bride & Groom', placeholderColor: '#f5f0e6', width: 800, height: 600 },
  { id: 6, src: '/events/event2.jpg', category: 'events', title: 'Concert Event', placeholderColor: '#2a2a2a', width: 800, height: 600 },
  { id: 8, src: '/wed/wed3.jpg', category: 'weddings', title: 'Bride & Groom', placeholderColor: '#e8e0d1', width: 800, height: 600 },
  { id: 9, src: '/wed/wed4.jpg', category: 'weddings', title: 'Bride & Groom', placeholderColor: '#f2e8d5', width: 800, height: 600 },
  { id: 10, src: '/wed/wed5.jpg', category: 'weddings', title: 'Bride & Groom', placeholderColor: '#ede6d6', width: 800, height: 600 },
  { id: 11, src: '/potrait/pot3.jpg', category: 'portraits', title: 'Studio Portrait', placeholderColor: '#cccccc', width: 600, height: 800 },
  { id: 12, src: '/potrait/pot4.jpg', category: 'portraits', title: 'Outdoor Portrait', placeholderColor: '#e0e0e0', width: 600, height: 800 },
  { id: 13, src: '/potrait/pot5.jpg', category: 'portraits', title: 'Studio Portrait', placeholderColor: '#d6d6d6', width: 600, height: 800 },
  { id: 14, src: '/events/event3.jpg', category: 'events', title: 'Concert Event', placeholderColor: '#333333', width: 800, height: 600 },
  { id: 15, src: '/events/event4.jpg', category: 'events', title: 'Concert Event', placeholderColor: '#3a3a3a', width: 800, height: 600 },
  { id: 16, src: '/events/event5.jpg', category: 'events', title: 'Concert Event', placeholderColor: '#444444', width: 800, height: 600 },
  { id: 17, src: '/models/model1.jpg', category: 'models', title: 'Fashion Model', placeholderColor: '#f8f5f0', width: 600, height: 800 },
  { id: 18, src: '/models/model2.jpg', category: 'models', title: 'Runway Model', placeholderColor: '#f0f0f0', width: 600, height: 800 },
  { id: 19, src: '/models/model3.jpg', category: 'models', title: 'Editorial Model', placeholderColor: '#f5f5f5', width: 600, height: 800 },
  { id: 20, src: '/models/model4.jpg', category: 'models', title: 'Fashion Model', placeholderColor: '#faf8f5', width: 600, height: 800 },
  { id: 21, src: '/models/model5.jpg', category: 'models', title: 'Runway Model', placeholderColor: '#f7f7f7', width: 600, height: 800 },
  { id: 22, src: '/babies/baby1.jpg', category: 'babies', title: 'Baby Portrait', placeholderColor: '#fff9f0', width: 600, height: 600 },
  { id: 23, src: '/babies/baby2.jpg', category: 'babies', title: 'Baby Portrait', placeholderColor: '#fff5e6', width: 600, height: 600 },
  { id: 24, src: '/babies/baby3.jpg', category: 'babies', title: 'Baby Portrait', placeholderColor: '#fff0d9', width: 600, height: 600 },
  { id: 25, src: '/babies/baby4.jpg', category: 'babies', title: 'Baby Portrait', placeholderColor: '#ffebcc', width: 600, height: 600 },
  { id: 26, src: '/babies/baby5.jpg', category: 'babies', title: 'Baby Portrait', placeholderColor: '#ffe6bf', width: 600, height: 600 },
];

// Optimized Image Component with Lazy Loading
const PortfolioImageComponent = ({ image, index }: { image: PortfolioImage; index: number }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    const element = document.getElementById(`portfolio-image-${image.id}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [image.id]);

  return (
    <div
      id={`portfolio-image-${image.id}`}
      key={image.id}
      className="portfolio-item group relative overflow-hidden rounded-lg shadow-lg cursor-pointer animate-fade-in-scale"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Placeholder with background color matching image */}
      <div
        className="w-full h-80 transition-opacity duration-300"
        style={{
          backgroundColor: image.placeholderColor || '#f0f0f0',
          opacity: isLoaded ? 0 : 1,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />

      {/* Actual Image with Lazy Loading */}
      {isVisible && (
        <img
          src={image.src}
          alt={image.title}
          loading="lazy"
          width={image.width}
          height={image.height}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-80 object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            transform: isLoaded ? 'scale(1)' : 'scale(0.95)',
          }}
        />
      )}

      {/* Overlay */}
      <div className="portfolio-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 opacity-0">
        <h3 className="portfolio-text text-white text-xl font-bold mb-2 transform translate-y-5 opacity-0">
          {image.title}
        </h3>
        <p className="portfolio-text text-gray-300 text-sm capitalize transform translate-y-5 opacity-0"
          style={{ transitionDelay: '0.05s' }}>
          {image.category}
        </p>
      </div>
    </div>
  );
};

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Memoize filtered images to prevent unnecessary recalculations
  const filteredImages = useMemo(() => {
    return activeCategory === 'all'
      ? portfolioImages
      : portfolioImages.filter(img => img.category === activeCategory);
  }, [activeCategory]);

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'events', label: 'Events' },
    { id: 'models', label: 'Models' },
    { id: 'babies', label: 'Babies' },
  ];

  // Preload category images when hovering over buttons
  const handleCategoryHover = useCallback((category: Category) => {
    if (category === 'all') return;

    // Find images in the hovered category
    const categoryImages = portfolioImages.filter(img => img.category === category);

    // Preload the first few images
    categoryImages.slice(0, 3).forEach(img => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = img.src;
      document.head.appendChild(link);
    });
  }, []);

  // Preload initial images
  useEffect(() => {
    // Preload first 3 images immediately
    const preloadImages = portfolioImages.slice(0, 3);
    preloadImages.forEach(img => {
      const image = new Image();
      image.src = img.src;
    });

    // Set a timeout to mark initial load as complete
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
          contain: layout style paint;
        }

        .portfolio-item:hover {
          transform: translateY(-8px);
        }

        .portfolio-item img {
          transition: transform 0.4s ease, opacity 0.5s ease;
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

        /* Reduced motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .portfolio-item,
          .portfolio-item img,
          .portfolio-overlay,
          .portfolio-text,
          .category-btn {
            transition: none !important;
            animation: none !important;
          }
          
          .portfolio-item:hover {
            transform: none;
          }
          
          .portfolio-item:hover img {
            transform: none;
          }
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
              onMouseEnter={() => handleCategoryHover(category.id)}
              className={`category-btn px-6 py-2 rounded-full animate-fade-in-scale ${activeCategory === category.id
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              aria-label={`Filter by ${category.label}`}
              aria-pressed={activeCategory === category.id}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {isInitialLoad ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 bg-gray-100 rounded-lg animate-pulse"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        ) : (
          // Actual content
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <PortfolioImageComponent key={image.id} image={image} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}