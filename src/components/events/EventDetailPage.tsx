import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Tag, 
  Award, 
  ArrowLeft, 
  Share2, 
  Download,
  ExternalLink,
  Image as ImageIcon,
  Play,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface EventDetailPageProps {
  event: any;
  currentLang: string;
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ event, currentLang }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      conservation: 'bg-green-500 text-white',
      education: 'bg-blue-500 text-white',
      spiritual: 'bg-orange-500 text-white',
      tourism: 'bg-purple-500 text-white',
      community: 'bg-pink-500 text-white'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500 text-white';
  };

  const getCategoryGradient = (category: string) => {
    const gradients = {
      conservation: 'from-green-500 to-emerald-600',
      education: 'from-blue-500 to-indigo-600',
      spiritual: 'from-orange-500 to-red-600',
      tourism: 'from-purple-500 to-pink-600',
      community: 'from-pink-500 to-rose-600'
    };
    return gradients[category as keyof typeof gradients] || 'from-gray-500 to-gray-600';
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const images = event.gallery || (event.image ? [event.image] : []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className={`relative py-20 bg-gradient-to-r ${getCategoryGradient(event.category)} text-white overflow-hidden`}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={goBack}
            className="mb-6 flex items-center text-white hover:text-blue-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Events
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <span className={`${getCategoryColor(event.category)} px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide`}>
                  {event.category}
                </span>
                {event.featured && (
                  <span className="ml-3 bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {event.title}
              </h1>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {event.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-blue-200" />
                  <div>
                    <div className="font-semibold">{formatDate(event.date)}</div>
                    {event.time && (
                      <div className="text-sm text-blue-200">{event.time}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-blue-200" />
                  <div className="font-semibold">{event.location}</div>
                </div>

                {event.participants && (
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-3 text-blue-200" />
                    <div className="font-semibold">{event.participants} participants</div>
                  </div>
                )}

                <div className="flex items-center">
                  <Tag className="w-5 h-5 mr-3 text-blue-200" />
                  <div className="font-semibold">
                    By {typeof event.organizer === 'string' 
                        ? event.organizer 
                        : event.organizer?.name || 'Unknown Organizer'
                      }
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleShare}
                  className="flex items-center bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Event
                </button>
                
                {event.gallery && event.gallery.length > 0 && (
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="flex items-center bg-black bg-opacity-20 backdrop-blur-sm text-white border border-white border-opacity-30 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-30 transition-all"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    View Gallery ({event.gallery.length})
                  </button>
                )}
              </div>
            </div>

            {/* Event Image */}
            <div className="relative">
              {event.image ? (
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              ) : (
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-12 text-center">
                  <Calendar className="w-24 h-24 mx-auto mb-4 text-white opacity-50" />
                  <p className="text-white text-lg">Event Image Coming Soon</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Event</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  {event.description}
                </p>

                {/* Event Impact */}
                {event.impact && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Event Impact</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(event.impact).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-gray-900">{value}</div>
                          <div className="text-sm text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Event Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Date</div>
                      <div className="text-gray-600">{formatDate(event.date)}</div>
                      {event.endDate && (
                        <div className="text-gray-600">to {formatDate(event.endDate)}</div>
                      )}
                    </div>
                  </div>

                  {event.time && (
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Time</div>
                        <div className="text-gray-600">{event.time}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Location</div>
                      <div className="text-gray-600">{event.location}</div>
                    </div>
                  </div>

                  {event.participants && (
                    <div className="flex items-start">
                      <Users className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Participants</div>
                        <div className="text-gray-600">{event.participants} people</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start">
                    <Award className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Organizer</div>
                      <div className="text-gray-600">
                        {typeof event.organizer === 'string' 
                          ? event.organizer 
                          : event.organizer?.name || 'Unknown Organizer'
                        }
                      </div>
                    </div>
                  </div>

                  {event.price !== undefined && (
                    <div className="flex items-start">
                      <Tag className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Price</div>
                        <div className="text-gray-600">
                          {event.price === 0 ? 'Free' : `₹${event.price}`}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                {event.contact && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Contact</h4>
                    <div className="space-y-2 text-sm">
                      {event.contact.email && (
                        <div>
                          <span className="text-gray-600">Email: </span>
                          <a href={`mailto:${event.contact.email}`} className="text-blue-600 hover:underline">
                            {event.contact.email}
                          </a>
                        </div>
                      )}
                      {event.contact.phone && (
                        <div>
                          <span className="text-gray-600">Phone: </span>
                          <a href={`tel:${event.contact.phone}`} className="text-blue-600 hover:underline">
                            {event.contact.phone}
                          </a>
                        </div>
                      )}
                      {event.contact.whatsapp && (
                        <div>
                          <a 
                            href={event.contact.whatsapp} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-600 hover:underline flex items-center"
                          >
                            WhatsApp <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Modal */}
      {showImageModal && images.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <span className="text-2xl">×</span>
            </button>

            <div className="relative">
              <img
                src={images[currentImageIndex]}
                alt={`${event.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            <div className="text-center mt-4 text-white">
              {currentImageIndex + 1} of {images.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default EventDetailPage;