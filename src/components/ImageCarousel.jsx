import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ images, autoRotateInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  }, [images.length, isTransitioning]);

  const previousSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const getAdjacentIndexes = () => {
    const prev = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    const next = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    return { prev, next };
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    let intervalId;
    if (isAutoPlaying && !isTransitioning) {
      intervalId = setInterval(() => {
        nextSlide();
      }, autoRotateInterval);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, nextSlide, autoRotateInterval, isTransitioning]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const { prev, next } = getAdjacentIndexes();

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-[400px] overflow-hidden">
        {/* Previous Image (faded) */}
        <div className="absolute inset-0 -left-2/4 z-0 opacity-35">
          <img
            src={images[prev]}
            alt="Previous"
            className="w-full h-full object-contain rounded-lg transform scale-90"
          />
        </div>

        {/* Main Image */}
        <div className={`absolute inset-0 z-10 transition-transform duration-500 ${
          isTransitioning ? 'scale-95 opacity-100' : 'scale-100 opacity-100 '
        }`}>
          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="relative w-full h-full object-contain rounded-2xl"
          />          
        </div>

        {/* Next Image (faded) */}
        <div className="absolute inset-0 -right-3/4 z-0 opacity-35">
          <img
            src={images[next]}
            alt="Next"
            className="w-full h-full object-contain rounded-lg transform scale-90"
          />
        </div>

        {/* Navigation arrows */}
        <button
          onClick={previousSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          aria-label="Previous image"
          disabled={isTransitioning}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          aria-label="Next image"
          disabled={isTransitioning}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Progress indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white w-4' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="mt-4 flex space-x-2 overflow-x-auto py-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
              index === currentIndex 
                ? 'ring-2 ring-blue-500 scale-110' 
                : 'opacity-50 hover:opacity-75 hover:scale-105'
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;