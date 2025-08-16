import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'date', 'location'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return new Response(JSON.stringify({ 
          error: `Missing required field: ${field}` 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Validate organizer information
    if (!data.organizer || !data.organizer.name || !data.organizer.email || !data.organizer.phone) {
      return new Response(JSON.stringify({ 
        error: 'Missing required organizer information' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.organizer.email)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid email format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate consent
    if (!data.consent) {
      return new Response(JSON.stringify({ 
        error: 'Consent is required to submit event' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // In a real application, you would:
    // 1. Save event submission to database
    // 2. Upload and process media files
    // 3. Send confirmation email to organizer
    // 4. Notify admin team for review
    // 5. Generate submission ID

    // For now, we'll simulate a successful submission
    const submission = {
      id: `event_${Date.now()}`,
      title: data.title,
      description: data.description,
      category: data.category,
      date: data.date,
      time: data.time,
      location: data.location,
      organizer: data.organizer,
      participants: data.participants,
      impact: data.impact,
      socialMedia: data.socialMedia,
      status: 'pending_approval',
      submittedAt: new Date().toISOString(),
      reviewCode: `REV${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    };

    // Log the submission (in production, save to database)
    console.log('New event submission:', submission);

    return new Response(JSON.stringify({
      success: true,
      submission: submission,
      message: 'Event submitted successfully! It will be reviewed within 48 hours.'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Event submission error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const GET: APIRoute = async ({ url }) => {
  try {
    // This would normally fetch from a database
    // For now, we'll return the static events data
    const searchParams = new URL(url).searchParams;
    const type = searchParams.get('type');
    const limit = searchParams.get('limit');
    
    // Import events data
    const eventsData = await import('../../data/events.json');
    
    let events = [];
    
    switch (type) {
      case 'upcoming':
        events = eventsData.default.upcomingEvents;
        break;
      case 'recent':
        events = eventsData.default.recentEvents;
        break;
      case 'featured':
        events = eventsData.default.featuredEvents;
        break;
      case 'user':
        events = eventsData.default.userEvents;
        break;
      default:
        events = eventsData.default.upcomingEvents;
    }
    
    if (limit) {
      events = events.slice(0, parseInt(limit));
    }
    
    return new Response(JSON.stringify({
      success: true,
      events: events,
      total: events.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Events fetch error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};