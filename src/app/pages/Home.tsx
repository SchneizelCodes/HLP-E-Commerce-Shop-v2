import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image1 from "../../imports/image-1.png";
import image2 from "../../imports/image-2.png";

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [image1, image2];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="w-full">
      {/* Hero Carousel Section */}
      <section className="relative h-[600px] md:h-[700px] bg-gray-100">
        {/* Slideshow Images */}
        <div className="absolute inset-0 overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <ImageWithFallback
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Overlay Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
              Your Journey to<br />Health and Relaxation
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
              Discover the latest trends and timeless classics in our curated collection
            </p>
            <Link
              to="/"
              className="inline-block bg-white text-black px-8 py-4 hover:bg-gray-100 transition-colors"
            >
              EXPLORE NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              to="/"
              className="group relative h-80 overflow-hidden bg-gray-100"
            >
              <ImageWithFallback
                src={image1}
                alt="Massage Chair"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl text-white">Massage Chair</h3>
              </div>
            </Link>
            <Link
              to="/"
              className="group relative h-80 overflow-hidden bg-gray-100"
            >
              <ImageWithFallback
                src={image2}
                alt="Mechanical Pony"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl text-white">Mechanical Pony</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl">New Arrivals</h2>
            <Link to="/" className="text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Massage Chair */}
            <Link to="/" className="group">
              <div className="bg-white mb-4 overflow-hidden">
                <ImageWithFallback
                  src={image1}
                  alt="Massage Chair"
                  className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="mb-1">Massage Chair</h3>
              <p className="text-sm text-gray-600">$899.99</p>
            </Link>

            {/* Mechanical Pony */}
            <Link to="/" className="group">
              <div className="bg-white mb-4 overflow-hidden">
                <ImageWithFallback
                  src={image2}
                  alt="Mechanical Pony"
                  className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="mb-1">Mechanical Pony</h3>
              <p className="text-sm text-gray-600">$299.99</p>
            </Link>

            {/* Blank Item 1 */}
            <Link to="/" className="group">
              <div className="bg-gray-200 mb-4 overflow-hidden aspect-[3/4] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-black rotate-45 origin-center" style={{ width: '141.42%' }}></div>
                </div>
              </div>
              <h3 className="mb-1 text-gray-400">Coming Soon</h3>
              <p className="text-sm text-gray-400">$--</p>
            </Link>

            {/* Blank Item 2 */}
            <Link to="/" className="group">
              <div className="bg-gray-200 mb-4 overflow-hidden aspect-[3/4] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-black rotate-45 origin-center" style={{ width: '141.42%' }}></div>
                </div>
              </div>
              <h3 className="mb-1 text-gray-400">Coming Soon</h3>
              <p className="text-sm text-gray-400">$--</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl mb-6">Join Our Community</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Sign up for exclusive offers, style inspiration, and more
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-black px-8 py-4 hover:bg-gray-100 transition-colors"
          >
            GET STARTED
          </Link>
        </div>
      </section>
    </div>
  );
}
