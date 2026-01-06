export function CTA() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-white mb-6">Ready to Capture Your Story?</h2>
        <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
          Let's create beautiful memories together. Book your photography session today and experience the difference professional photography can make.
        </p>
        <button 
          onClick={scrollToContact}
          className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Book a Session
        </button>
      </div>
    </section>
  );
}
