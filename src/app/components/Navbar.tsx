import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 backdrop-blur-sm z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 shadow-lg' : 'bg-white/95 shadow-sm'
    }`}>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-100%);
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes mobileMenuSlide {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slideDown 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
          animation-fill-mode: backwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out;
          animation-fill-mode: backwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out;
          animation-fill-mode: backwards;
        }

        .animate-mobile-menu {
          animation: mobileMenuSlide 0.3s ease-out;
        }

        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: black;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link:hover {
          transform: translateY(-2px);
        }

        .logo {
          transition: all 0.3s ease;
        }

        .logo:hover {
          transform: scale(1.05) rotate(-2deg);
        }

        .book-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .book-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .book-btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .book-btn:hover {
          transform: translateY(-2px);
        }

        .book-btn:active {
          transform: translateY(0);
        }

        .menu-btn {
          transition: all 0.3s ease;
        }

        .menu-btn:hover {
          transform: scale(1.1) rotate(90deg);
        }

        .menu-btn:active {
          transform: scale(0.95) rotate(90deg);
        }

        .mobile-link {
          transition: all 0.3s ease;
        }

        .mobile-link:hover {
          transform: translateX(8px);
          color: #374151;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center h-16 ${
          isLoaded ? 'animate-slide-down' : 'opacity-0'
        }`}>
          {/* Logo */}
          <div 
            className={`logo flex items-center gap-2 cursor-pointer ${
              isLoaded ? 'animate-slide-in-left' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
            onClick={() => scrollToSection('hero')}
          >
            <img src="/logo.jpg" alt="Logo" height={150} width={150} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('hero')} 
              className={`nav-link ${
                isLoaded ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className={`nav-link ${
                isLoaded ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.3s' }}
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className={`nav-link ${
                isLoaded ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.4s' }}
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={`nav-link ${
                isLoaded ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.5s' }}
            >
              Contact
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`book-btn bg-black text-white px-6 py-2 rounded-lg font-semibold ${
                isLoaded ? 'animate-slide-in-right' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.6s' }}
            >
              Book Session
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`menu-btn md:hidden ${
              isLoaded ? 'animate-slide-in-right' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-mobile-menu">
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection('hero')} 
                className="mobile-link text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')} 
                className="mobile-link text-left"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="mobile-link text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="mobile-link text-left"
              >
                Contact
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="book-btn bg-black text-white px-6 py-2 rounded-lg font-semibold text-left"
              >
                Book Session
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}