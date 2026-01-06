import { Camera, Users, Calendar } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const services = [
  {
    icon: Camera,
    title: 'Weddings',
    description: 'Comprehensive wedding photography capturing every precious moment',
    features: [
      'Full Day Coverage',
      'Engagement Session',
      'Professional Editing',
      'Online Gallery',
      'Print-Ready Files'
    ]
  },
  {
    icon: Users,
    title: 'Portraits',
    description: 'Professional portraits that capture your personality and essence',
    features: [
      'Studio Sessions',
      'Outdoor Locations',
      'Family & Individual',
      'Professional Retouching',
      'Multiple Outfit Changes'
    ]
  },
  {
    icon: Calendar,
    title: 'Events',
    description: 'Event photography for corporate and social gatherings',
    features: [
      'Social Events',
      'Corporate Functions',
      'Birthday Parties',
      'Quick Turnaround',
      'High-Resolution Images'
    ]
  }
];

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50" ref={sectionRef}>
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

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: backwards;
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.6s ease-out;
          animation-fill-mode: backwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-out;
          animation-fill-mode: backwards;
        }

        .service-card {
          transition: all 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-10px);
        }

        .service-icon {
          transition: all 0.3s ease;
        }

        .service-card:hover .service-icon {
          animation: float 2s ease-in-out infinite;
          background: linear-gradient(135deg, #000000 0%, #434343 100%);
        }

        .service-feature {
          transition: all 0.3s ease;
        }

        .service-card:hover .service-feature {
          transform: translateX(5px);
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

        .book-btn:active {
          transform: scale(0.95);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Professional photography services tailored to your unique needs and vision
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`service-card bg-white p-8 rounded-lg shadow-md hover:shadow-xl ${
                  isVisible ? 'animate-fade-in-scale' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              >
                <div className="service-icon w-14 h-14 bg-black text-white rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      className={`service-feature flex items-start gap-2 text-gray-700 ${
                        isVisible ? 'animate-slide-in-left' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${0.4 + index * 0.15 + idx * 0.05}s` }}
                    >
                      <span className="text-black mt-1 font-bold">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={scrollToContact}
                  className="book-btn w-full bg-black text-white py-3 rounded-lg font-semibold relative"
                >
                  Book Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}