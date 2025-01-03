import React from 'react';
import { Star, ChevronRight, Package2, Clock, Sparkles } from 'lucide-react';
import ImageCarousel from './ImageCarousel';
import { Link } from 'react-router-dom';

// Use Vite's glob import feature to dynamically import all gallery images
const galleryImages = import.meta.glob('/src/assets/Gallery/*.{jpg,jpeg,png}', {
  eager: true,
  as: 'url'
});

// Use Vite's glob import feature to dynamically import all review images
const reviewImages = import.meta.glob('/src/assets/Reviews/*.{jpg,jpeg,png}', {
  eager: true,
  as: 'url'
});

const LandingPage = () => {
  const images = Object.values(galleryImages);
  const reviews = [
    {
      name: "Sarah M.",
      rating: 5,
      text: "Love my nameplate! The quality is amazing and it looks perfect on my daughter's door. Quick shipping and easy to mount with the velcro!",
      image: Object.values(reviewImages)[0]
    },
    {
      name: "Paul R.",
      rating: 5,
      text: "Got this for my son's room and he absolutely loves it! The 3D printing quality is fantastic and it was simple to put up.",
      image: Object.values(reviewImages)[1]
    },
    {
      name: "Emily W.",
      rating: 5,
      text: "Such a unique gift! The colors matched perfectly with our decor and the customer service was excellent.",
      image: Object.values(reviewImages)[2]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-200">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Custom Door Name Plates
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Personalized, 3D-printed name plates that make any room special
          </p>
          <Link
            to="/order"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Your Plate <ChevronRight className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Package2 className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Installation</h3>
              <p className="text-gray-600">Includes 3M velcro for simple mounting</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Turnaround</h3>
              <p className="text-gray-600">Design preview within 24hrs, shipping within 48hrs</p>
            </div>
            <div className="text-center">
              <Sparkles className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Made in NZ</h3>
              <p className="text-gray-600">Locally crafted with care and attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Gallery</h2>
          <ImageCarousel images={images} autoRotateInterval={5000} />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{review.text}</p>
                <div className="flex items-center">
                  {review.image && (
                    <img
                      src={review.image}
                      alt={`Review by ${review.name}`}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                  )}
                  <p className="font-semibold">{review.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Custom Nameplate?</h2>
          <Link
            to="/order"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Designing Now <ChevronRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;