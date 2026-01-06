import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
  'https://images.unsplash.com/photo-1603207757545-de4fffdb404c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoZXIlMjBwb3J0Zm9saW8lMjBoZXJvfGVufDF8fHx8MTc2NzU0Mjg3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1533091090875-1ff4acc497dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY3NTI1MDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1610846202780-b4d9837371ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBob3RvZ3JhcGh5JTIwc3R1ZGlvfGVufDF8fHx8MTc2NzUzNDk3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
          animation-fill-mode: backwards;
        }

        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
          animation-fill-mode: backwards;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
          animation-fill-mode: backwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.8s ease-out;
          animation-fill-mode: backwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out;
          animation-fill-mode: backwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out;
          animation-fill-mode: backwards;
        }

        .hero-image {
          transition: transform 0.5s ease-out;
        }

        .hero-image.active {
          transform: scale(1.05);
        }

        .nav-btn {
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.4);
        }

        .nav-btn:active {
          transform: scale(0.95);
        }

        .cta-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .cta-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.1);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .cta-btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
        }

        .cta-btn:active {
          transform: translateY(0);
        }

        .indicator {
          transition: all 0.3s ease;
        }

        .indicator:hover {
          transform: scale(1.3);
        }
      `}</style>

      {/* Image Slider */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image} 
              alt={`Slide ${index + 1}`}
              className={`hero-image w-full h-full object-cover ${
                index === currentSlide ? 'active' : ''
              }`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className={`nav-btn absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full z-10 ${
          isLoaded ? 'animate-slide-in-left' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.8s' }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className={`nav-btn absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full z-10 ${
          isLoaded ? 'animate-slide-in-right' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.8s' }}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10 ${
          isLoaded ? 'animate-fade-in-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '1s' }}
      >
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`indicator h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h1 
            className={`text-white text-5xl md:text-6xl font-bold mb-6 ${
              isLoaded ? 'animate-fade-in-down' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            Capturing Moments That Matter
          </h1>
          <p 
            className={`text-white/90 text-xl mb-8 max-w-2xl mx-auto ${
              isLoaded ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.4s' }}
          >
            Professional photography services that tell your unique story through stunning visuals and authentic moments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('portfolio')}
              className={`cta-btn bg-white text-black px-8 py-3 rounded-lg font-semibold ${
                isLoaded ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.6s' }}
            >
              View Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`cta-btn bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold ${
                isLoaded ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.7s' }}
            >
              Book a Session
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}