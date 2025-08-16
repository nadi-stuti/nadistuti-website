import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Award, Play } from 'lucide-react';
import { t } from '../../i18n/translations';

interface PastEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  participants: number;
  impact?: {
    wasteCollected?: string;
    areaCleared?: string;
    treesPlanted?: number;
    studentsReached?: number;
    schoolsParticipated?: number;
    certificatesIssued?: number;
    devoteesParticipated?: number;
    culturalPrograms?: number;
    prasadamDistributed?: string;
  };
  organizer: string;
  tags: string[];
  image?: string;
  gallery?: string[];
}

type SupportedLanguage = "en" | "hi" | "ta" | "te" | "kn" | "ml" | "bn" | "gu" | "mr" | "pa" | "or" | "as" | "sa";

interface PastEventsCarouselProps {
  pastEvents?: PastEvent[];
  onEventClick: (eventId: string) => void;
  currentLang?: SupportedLanguage;
}

const PastEventsCarousel: React.FC<PastEventsCarouselProps> = ({ pastEvents = [], onEventClick, currentLang = 'en' as SupportedLanguage }) => {
  // Ensure we have valid events data
  const validEvents = React.useMemo(() => {
    if (!pastEvents || !Array.isArray(pastEvents)) return [];
    return pastEvents;
  }, [pastEvents]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || validEvents.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === validEvents.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, validEvents.length]);

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? validEvents.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    const newIndex = currentIndex === validEvents.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      conservation: 'bg-green-500',
      education: 'bg-blue-500',
      spiritual: 'bg-orange-500',
      tourism: 'bg-purple-500',
      community: 'bg-pink-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImpactHighlight = (event: PastEvent) => {
    if (!event.impact) return null;

    const impact = event.impact;
    if (impact.wasteCollected) return { label: 'Waste Collected', value: impact.wasteCollected };
    if (impact.studentsReached) return { label: 'Students Reached', value: impact.studentsReached.toString() };
    if (impact.devoteesParticipated) return { label: 'Devotees', value: impact.devoteesParticipated.toString() };
    if (impact.areaCleared) return { label: 'Area Cleaned', value: impact.areaCleared };

    return null;
  };

  if (validEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Past Events</h3>
        <p className="text-gray-500">Check back later for event highlights.</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('events.past.title', currentLang)}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('events.past.subtitle', currentLang)}
          </p>


        </div>

        <div className="relative">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {validEvents.map((event, index) => (
                <div key={event.id} className="w-full flex-shrink-0">
                  <div className="relative h-96 md:h-[500px] lg:h-[600px]">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: event.image
                          ? `url(${event.image})`
                          : `linear-gradient(135deg, ${getCategoryGradient(event.category).replace('from-', '').replace(' to-', ', ')})`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
                    </div>

                    {/* Content Overlay */}
                    <div className="relative h-full flex items-center">
                      <div className="max-w-4xl mx-auto px-6 text-white">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                          {/* Left Content */}
                          <div>
                            <div className="flex items-center mb-4">
                              <span className={`${getCategoryColor(event.category)} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
                                {event.category}
                              </span>
                              <span className="ml-3 text-blue-200 text-sm">
                                {formatDate(event.date)}
                              </span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                              {event.title}
                            </h3>

                            <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                              {event.description}
                            </p>

                            <div className="flex items-center space-x-6 mb-6">
                              <div className="flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-blue-200" />
                                <span className="text-sm">{event.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="w-5 h-5 mr-2 text-blue-200" />
                                <span className="text-sm">{event.participants} participants</span>
                              </div>
                            </div>

                            <button
                              onClick={() => onEventClick(event.id)}
                              className="group bg-white/90 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg"
                            >
                              <span>{t('events.ui.learn_more', currentLang)}</span>
                              <Play className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>

                          {/* Right Stats */}
                          <div className="space-y-4">
                            {getImpactHighlight(event) && (
                              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                                <Award className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                                <div className="text-2xl font-bold text-white">
                                  {getImpactHighlight(event)?.value}
                                </div>
                                <div className="text-gray-200 text-sm">
                                  {getImpactHighlight(event)?.label}
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-black/25 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                                <div className="text-xl font-bold text-white">
                                  {event.participants}
                                </div>
                                <div className="text-gray-200 text-xs">Participants</div>
                              </div>

                              {event.impact?.treesPlanted && (
                                <div className="bg-black/25 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                                  <div className="text-xl font-bold text-white">
                                    {event.impact.treesPlanted}
                                  </div>
                                  <div className="text-gray-200 text-xs">Trees Planted</div>
                                </div>
                              )}

                              {event.impact?.schoolsParticipated && (
                                <div className="bg-black/25 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                                  <div className="text-xl font-bold text-white">
                                    {event.impact.schoolsParticipated}
                                  </div>
                                  <div className="text-gray-200 text-xs">Schools</div>
                                </div>
                              )}

                              {event.impact?.culturalPrograms && (
                                <div className="bg-black/25 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                                  <div className="text-xl font-bold text-white">
                                    {event.impact.culturalPrograms}
                                  </div>
                                  <div className="text-gray-200 text-xs">Programs</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Auto-play indicator */}
                    {isAutoPlaying && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-black/30 backdrop-blur-sm rounded-full p-2 border border-white/20">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Navigation Arrows */}
          {validEvents.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/30 z-10"
                aria-label="Previous event"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/30 z-10"
                aria-label="Next event"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {validEvents.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {validEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-blue-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Event Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500">
              {currentIndex + 1} of {validEvents.length} events
            </span>
          </div>
          
        </div>

        {/* Quick Stats Summary */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {validEvents.reduce((sum, event) => sum + event.participants, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Participants</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {validEvents.length}
            </div>
            <div className="text-sm text-gray-600">Events Completed</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {validEvents.reduce((sum, event) =>
                sum + (event.impact?.treesPlanted || 0), 0
              )}
            </div>
            <div className="text-sm text-gray-600">Trees Planted</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {new Set(validEvents.map(event => event.location)).size}
            </div>
            <div className="text-sm text-gray-600">Cities Reached</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastEventsCarousel;