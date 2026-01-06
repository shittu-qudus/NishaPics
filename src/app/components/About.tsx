import { Camera } from "lucide-react";
import { useEffect, useState } from "react";

export function About() {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.3,  }
    );

    const element = document.getElementById("about");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section 
      id="about" 
      className="py-20 bg-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photographer Image */}
          <div className={`relative transition-all duration-700 ease-out ${
            isInView 
              ? 'opacity-100 translate-x-0 scale-100' 
              : 'opacity-0 -translate-x-10 scale-95'
          }`}>
            <img
              src="/nisha.jpeg"
              alt="Nisha - Photographer"
              className="w-full h-[500px] object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            />
            <div className={`absolute -bottom-6 -right-6 bg-black text-white p-6 rounded-lg shadow-xl transition-all duration-700 ease-out ${
              isInView 
                ? 'opacity-100 scale-100 rotate-0' 
                : 'opacity-0 scale-0 -rotate-180'
            }`}>
              <Camera className="w-12 h-12" />
            </div>
          </div>

          {/* Bio Content */}
          <div className={`transition-all duration-700 ease-out delay-200 ${
            isInView 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-10'
          }`}>
            <h2 className={`mb-6 transition-all duration-700 delay-300 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              About the Photographer
            </h2>
            
            <div className={`mb-8 transition-opacity duration-700 delay-400 ${
              isInView ? 'opacity-100' : 'opacity-0'
            }`}>
              <p className={`text-gray-700 mb-4 transition-all duration-500 delay-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                Hi, I'm RAHEEM KHADIJAT BISOLA, a passionate photographer
                with over 7 years of experience capturing life's
                most precious moments. My journey began with a
                simple camera and an unwavering love for
                storytelling through imagery.
              </p>
              <p className={`text-gray-700 mb-6 transition-all duration-500 delay-600 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                I specialize in wedding, portrait, and event
                photography, bringing a unique blend of creativity
                and technical expertise to every shoot. My
                approach is to create authentic, emotive images
                that you'll treasure for a lifetime.
              </p>
            </div>

            <div className="space-y-6">
              <div className={`relative transition-all duration-500 delay-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                <div className="border-l-4 border-black pl-4">
                  <h3 className="mb-2">Experience</h3>
                  <p className="text-gray-600">
                    7+ years professional photography • 1000+
                    weddings • 100+ portrait sessions
                  </p>
                </div>
                <div className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-black/20 to-transparent transition-all duration-800 delay-800 ${
                  isInView ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`} />
              </div>

              <div className={`relative transition-all duration-500 delay-900 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                <div className="border-l-4 border-black pl-4">
                  <h3 className="mb-2">Style & Approach</h3>
                  <p className="text-gray-600">
                    Natural lighting • Candid moments • Authentic
                    storytelling • Artistic composition
                  </p>
                </div>
                <div className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-black/20 to-transparent transition-all duration-800 delay-1000 ${
                  isInView ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}