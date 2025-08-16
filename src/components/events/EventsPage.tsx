import React, { useState, useRef } from 'react';
import EventHero from './EventHero';
import EventCategories from './EventCategories';
import EventsGrid from './EventsGrid';
import PastEventsCarousel from './PastEventsCarousel';
import BookingSection from './BookingSection';
import FeaturedEvents from './FeaturedEvents';
import CommunityEvents from './CommunityEvents';
import ContactSection from './ContactSection';
import SubmitEventForm from '../SubmitEventForm';
import { t } from '../../i18n/translations';

type SupportedLanguage = "en" | "hi" | "ta" | "te" | "kn" | "ml" | "bn" | "gu" | "mr" | "pa" | "or" | "as" | "sa";

interface EventsPageProps {
  eventsData: any;
  currentLang: SupportedLanguage;
}

const EventsPage: React.FC<EventsPageProps> = ({ eventsData, currentLang }) => {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  
  // Ensure eventsData has the expected structure
  const safeEventsData = {
    upcomingEvents: eventsData?.upcomingEvents || [],
    categories: eventsData?.categories || {},
    recentEvents: eventsData?.recentEvents || [],
    featuredEvents: eventsData?.featuredEvents || [],
    userEvents: eventsData?.userEvents || []
  };
  
  // Refs for smooth scrolling
  const upcomingRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleViewUpcoming = () => {
    console.log('handleViewUpcoming called');
    scrollToSection(upcomingRef);
  };

  const handleBookActivities = () => {
    console.log('handleBookActivities called');
    scrollToSection(bookingRef);
  };

  const handleCategoryClick = (categoryId: string) => {
    console.log('handleCategoryClick called with categoryId:', categoryId);
    scrollToSection(upcomingRef);
  };

  const handleBookActivity = (activityId: string) => {
    console.log('handleBookActivity called with activityId:', activityId);
    // This could open a booking modal or redirect to booking page
  };

  const handleLearnMore = (eventId: string) => {
    console.log('handleLearnMore called with eventId:', eventId);
    scrollToSection(featuredRef);
  };

  const handleSubmitEvent = () => {
    console.log('handleSubmitEvent called');
    setShowSubmitForm(true);
  };

  const handleCloseSubmitForm = () => {
    console.log('handleCloseSubmitForm called');
    setShowSubmitForm(false);
  };

  const handleViewEvent = (eventId: string) => {
    console.log('handleViewEvent called with eventId:', eventId);
  };

  const handlePastEventClick = (eventId: string) => {
    console.log('handlePastEventClick called with eventId:', eventId);
    window.location.href = `/${currentLang}/events/${eventId}`;
  };

  const handleContactAction = (action: string) => {
    switch (action) {
      case 'email':
        window.location.href = 'mailto:events@nadistuti.com';
        break;
      case 'whatsapp':
        window.open('https://wa.me/9340708756', '_blank');
        break;
      case 'volunteer':
        // Open volunteer registration
        console.log('Open volunteer registration');
        break;
      case 'sponsor':
        // Open sponsor information
        console.log('Open sponsor information');
        break;
      default:
        console.log('Contact action:', action);
    }
  };

  return (
    <main className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <EventHero
        title={t('events.hero.title', currentLang)}
        description={t('events.hero.subtitle', currentLang)}
        onViewUpcoming={handleViewUpcoming}
        onBookActivities={handleBookActivities}
        currentLang={currentLang}
      />

      {/* Event Categories */}
      <EventCategories
        categories={safeEventsData.categories}
        onCategoryClick={handleCategoryClick}
        currentLang={currentLang}
      />

      {/* Upcoming Events */}
      <div ref={upcomingRef} className="bg-gray-50">
        <EventsGrid
          events={safeEventsData.upcomingEvents}
          title={t('events.upcoming.title', currentLang)}
          description={t('events.upcoming.subtitle', currentLang)}
          showViewAll={true}
          limit={3}
          currentLang={currentLang}
        />
      </div>

      {/* Past Events Carousel */}
      <PastEventsCarousel
        pastEvents={safeEventsData.recentEvents}
        onEventClick={handlePastEventClick}
        currentLang={currentLang}
      />

      {/* Booking Section */}
      <div ref={bookingRef}>
        <BookingSection onBookActivity={handleBookActivity} currentLang={currentLang} />
      </div>

      {/* Featured Spiritual Events */}
      <div ref={featuredRef}>
        <FeaturedEvents
          featuredEvents={safeEventsData.featuredEvents}
          onLearnMore={handleLearnMore}
          currentLang={currentLang}
        />
      </div>

      {/* Community Events */}
      <div ref={communityRef}>
        <CommunityEvents
          userEvents={safeEventsData.userEvents.filter((event: any) => event.featured)}
          onSubmitEvent={handleSubmitEvent}
          onViewEvent={handleViewEvent}
          currentLang={currentLang}
        />
      </div>

      {/* Contact & Support */}
      <div ref={contactRef}>
        <ContactSection onContactAction={handleContactAction} currentLang={currentLang} />
      </div>

      {/* Submit Event Form Modal */}
      {showSubmitForm && (
        <SubmitEventForm onClose={handleCloseSubmitForm} />
      )}
    </main>
  );
};

export default EventsPage;