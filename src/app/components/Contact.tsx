import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });
  
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

  const showModal = (title: string, message: string, type: 'success' | 'error' | 'info') => {
    setModal({
      isOpen: true,
      title,
      message,
      type
    });
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all required fields');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        message: formData.message,
        date: new Date().toLocaleString(),
        reply_to: formData.email
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      showModal(
        'Message Sent Successfully! 🎉',
        `Thank you ${formData.name}! Your message has been sent.\n\nWe'll get back to you at ${formData.email} within 24-48 hours.`,
        'success'
      );

      setFormData({ name: '', email: '', phone: '', message: '' });

    } catch (error: any) {
      console.error('Email sending failed:', error);
      
      let errorMessage = 'Sorry, there was an error sending your message. Please try again later.';
      let errorTitle = 'Sending Failed';

      if (error?.text) {
        if (error.text.includes('recipients address is empty')) {
          errorTitle = 'Recipient Error';
          errorMessage = 'Email service not properly configured. Please check EmailJS template settings.';
        }
        else if (error.text.includes('The template id is not valid')) {
          errorTitle = 'Template Error';
          errorMessage = 'Email template is not configured correctly. Please contact website administrator.';
        }
      } else if (error?.message) {
        if (error.message.includes('Network')) {
          errorTitle = 'Network Error';
          errorMessage = 'Network connection issue. Please check your internet connection and try again.';
        } 
        else if (error.message.includes('fill in all required fields')) {
          errorTitle = 'Validation Error';
          errorMessage = 'Please fill in all required fields (Name, Email, and Message).';
        }
        else if (error.message.includes('valid email address')) {
          errorTitle = 'Invalid Email';
          errorMessage = 'Please enter a valid email address.';
        }
      }

      showModal(errorTitle, errorMessage, 'error');
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
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

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: backwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out;
          animation-fill-mode: backwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out;
          animation-fill-mode: backwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out;
          animation-fill-mode: backwards;
        }

        .contact-card {
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-5px);
        }

        .form-input {
          transition: all 0.3s ease;
        }

        .form-input:focus {
          transform: translateY(-2px);
        }

        .contact-info-item {
          transition: all 0.3s ease;
        }

        .contact-info-item:hover {
          transform: translateX(5px);
        }

        .contact-info-item svg {
          transition: all 0.3s ease;
        }

        .contact-info-item:hover svg {
          transform: scale(1.2);
        }

        .social-link {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .social-link::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.2;
          transform: translate(-50%, -50%);
          transition: width 0.4s ease, height 0.4s ease;
        }

        .social-link:hover::before {
          width: 100%;
          height: 100%;
        }

        .social-link:hover {
          transform: translateY(-3px) rotate(5deg);
        }

        .social-link:active {
          transform: translateY(0) rotate(0deg);
        }

        .send-btn {
          position: relative;
          overflow: hidden;
        }

        .send-btn::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .send-btn:hover::after {
          width: 300px;
          height: 300px;
        }

        .send-btn svg {
          transition: transform 0.3s ease;
        }

        .send-btn:hover svg {
          transform: translateX(5px);
        }
      `}</style>

      {/* Simple Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full animate-scale-in">
            <h3 className="text-xl font-bold mb-3">{modal.title}</h3>
            <p className="text-gray-600 mb-6 whitespace-pre-line">{modal.message}</p>
            <button
              onClick={closeModal}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <section id="contact" className="py-20 bg-gray-50" ref={sectionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.1s' }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Ready to book a session or have questions? Reach out and let's start planning your perfect photography experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div 
              className={`contact-card bg-white p-8 rounded-lg shadow-md ${
                isVisible ? 'animate-fade-in-left' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
              <div className="space-y-4">
                <div className={`${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                  <label htmlFor="name" className="block mb-2 text-gray-700 font-medium">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Your Name"
                    disabled={isSubmitting}
                  />
                </div>

                <div className={`${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                  <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div className={`${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
                  <label htmlFor="phone" className="block mb-2 text-gray-700 font-medium">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="+234 903 399 3093"
                    disabled={isSubmitting}
                  />
                </div>

                <div className={`${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                  <label htmlFor="message" className="block mb-2 text-gray-700 font-medium">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    placeholder="Tell us about your photography needs..."
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`send-btn w-full py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-black hover:bg-gray-800 text-white'
                  } ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: '0.7s' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <div 
                className={`contact-card bg-white p-8 rounded-lg shadow-md mb-6 ${
                  isVisible ? 'animate-fade-in-right' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.3s' }}
              >
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div 
                    className={`contact-info-item flex items-start gap-4 ${
                      isVisible ? 'animate-scale-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: '0.4s' }}
                  >
                    <Mail className="w-5 h-5 mt-1 text-black" />
                    <div>
                      <p className="text-gray-600">
                        <a href="mailto:Bisolaimage4u@gmail.com" className="hover:underline hover:text-black transition-colors">
                          Bisolaimage4u@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div 
                    className={`contact-info-item flex items-start gap-4 ${
                      isVisible ? 'animate-scale-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: '0.5s' }}
                  >
                    <Phone className="w-5 h-5 mt-1 text-black" />
                    <div>
                      <p className="text-gray-600">
                        <a href="tel:+2349033993093" className="hover:underline hover:text-black transition-colors">
                          +234 903 399 3093
                        </a>
                      </p>
                    </div>
                  </div>

                  <div 
                    className={`contact-info-item flex items-start gap-4 ${
                      isVisible ? 'animate-scale-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: '0.6s' }}
                  >
                    <MapPin className="w-5 h-5 mt-1 text-black" />
                    <div>
                      <p className="text-gray-600 font-medium">Lagos, Nigeria</p>
                      <p className="text-gray-500 text-sm">Available for travel nationwide</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div 
                className={`contact-card bg-white p-8 rounded-lg shadow-md ${
                  isVisible ? 'animate-fade-in-right' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.4s' }}
              >
                <h3 className="text-2xl font-semibold mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/_Nisha_pics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-pink-600 hover:text-white ${
                      isVisible ? 'animate-scale-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: '0.5s' }}
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-400 hover:text-white ${
                      isVisible ? 'animate-scale-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: '0.6s' }}
                    aria-label="Twitter"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://tiktok.com/@yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-black hover:text-white ${
                      isVisible ? 'animate-scale-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: '0.7s' }}
                    aria-label="TikTok"
                  >
                    <FaTiktok className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}