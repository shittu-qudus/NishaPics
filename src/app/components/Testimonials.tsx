import { Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah & Michael',
    role: 'Wedding Clients',
    text: 'Nisha captured our wedding day perfectly! Every photo tells a story and brings back the emotions we felt. The attention to detail and professionalism was outstanding.',
    rating: 5
  },
  {
    id: 2,
    name: 'Adeyemi Johnson',
    role: 'Portrait Session',
    text: 'Amazing experience from start to finish! Nisha made me feel comfortable and confident during the shoot. The final portraits exceeded all my expectations.',
    rating: 5
  },
  {
    id: 3,
    name: 'David chibuzo',
    role: 'Corporate Event',
    text: 'Professional, punctual, and delivered exceptional results. Nisha captured the energy of our corporate event beautifully. Highly recommend!',
    rating: 5
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    role: 'Family Photos',
    text: 'Working with Nisha was a delight. Our family photos are stunning, and we will treasure them forever. The patience with our kids was remarkable!',
    rating: 5
  }
];

export default function Testimonials() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
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

  return (
    <section className="py-20 bg-white overflow-hidden" ref={sectionRef}>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(10deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
          animation-fill-mode: backwards;
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
          animation-fill-mode: backwards;
        }

        .testimonial-card {
          transition: all 0.5s ease;
        }

        .testimonial-card:hover {
          transform: scale(1.05);
        }

        .star-bounce {
          animation: bounce 0.6s ease-in-out;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`text-center mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          <h2 className="mb-4 text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Client Testimonials
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-card bg-gray-50 p-8 rounded-lg shadow-2xl cursor-pointer ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{
                animationDelay: `${0.2 + index * 0.15}s`
              }}
              onMouseEnter={() => setHoveredId(testimonial.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 fill-yellow-400 text-yellow-400 ${
                      hoveredId === testimonial.id ? 'star-bounce' : ''
                    }`}
                    style={{
                      animationDelay: hoveredId === testimonial.id ? `${i * 0.1}s` : '0s'
                    }}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 italic transition-colors duration-300 hover:text-gray-900">
                "{testimonial.text}"
              </p>

              {/* Client Info */}
              <div className="border-t border-gray-200 pt-4">
                <p className={`font-semibold text-gray-900 transition-all duration-300 ${
                  hoveredId === testimonial.id ? 'translate-x-2' : ''
                }`}>
                  {testimonial.name}
                </p>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}