import { Instagram, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo2.jpg" alt="Logo" height={50} width={50} />
            </div>
            <p className="text-gray-400 text-sm">
              Capturing life's most precious moments with artistry and passion. Professional photography services for weddings, portraits, and events.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <button onClick={() => scrollToSection('hero')} className="text-gray-400 hover:text-white transition-colors text-left">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition-colors text-left">
                About
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="text-gray-400 hover:text-white transition-colors text-left">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors text-left">
                Services
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white transition-colors text-left">
                Contact
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/_Nisha_pics"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-white hover:text-gray-900 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-white hover:text-gray-900 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Nisha Pics Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
