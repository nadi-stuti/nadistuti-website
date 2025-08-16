import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['eventId', 'name', 'email', 'phone', 'participants'];
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid email format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate phone format (basic validation for Indian numbers)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
    if (!phoneRegex.test(data.phone)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid phone number format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // In a real application, you would:
    // 1. Save booking to database
    // 2. Send confirmation email
    // 3. Send SMS notification
    // 4. Process payment if required
    // 5. Update event capacity

    // For now, we'll simulate a successful booking
    const booking = {
      id: `booking_${Date.now()}`,
      eventId: data.eventId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      participants: data.participants,
      amount: data.amount || 0,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
      confirmationCode: `CONF${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    };

    // Log the booking (in production, save to database)
    console.log('New event booking:', booking);

    return new Response(JSON.stringify({
      success: true,
      booking: booking,
      message: 'Booking confirmed successfully!'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Booking error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ 
    error: 'Method not allowed. Use POST to book events.' 
  }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
};