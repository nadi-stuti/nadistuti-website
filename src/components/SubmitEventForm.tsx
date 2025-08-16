import React, { useState } from 'react';

interface SubmitEventFormProps {
  onClose: () => void;
}

const SubmitEventForm: React.FC<SubmitEventFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'conservation',
    date: '',
    time: '',
    location: '',
    organizer: {
      name: '',
      email: '',
      phone: '',
      organization: ''
    },
    participants: '',
    impact: '',
    images: [] as File[],
    videos: [] as File[],
    socialMedia: '',
    futureEvents: false,
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const categories = [
    { value: 'conservation', label: 'Conservation & Cleaning' },
    { value: 'education', label: 'Educational Programs' },
    { value: 'spiritual', label: 'Spiritual Gatherings' },
    { value: 'community', label: 'Community Events' },
    { value: 'awareness', label: 'Awareness Campaigns' },
    { value: 'cultural', label: 'Cultural Programs' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('organizer.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        organizer: {
          ...prev.organizer,
          [field]: value
        }
      }));
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'images' | 'videos') => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      [type]: files
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Create FormData for file uploads
      const submitData = new FormData();
      
      // Add text data
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'organizer') {
          submitData.append(key, JSON.stringify(value));
        } else if (key !== 'images' && key !== 'videos') {
          submitData.append(key, value.toString());
        }
      });

      // Add files
      formData.images.forEach((file, index) => {
        submitData.append(`images[${index}]`, file);
      });
      formData.videos.forEach((file, index) => {
        submitData.append(`videos[${index}]`, file);
      });

      const response = await fetch('/api/events.json', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          type: 'user_submitted',
          status: 'pending_approval',
          submittedAt: new Date().toISOString()
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to submit event');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit Your Event</h2>
              <p className="text-gray-600">Share your water body conservation or cultural event with our community</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <h3 className="text-green-800 font-semibold">Event Submitted Successfully!</h3>
                  <p className="text-green-700 text-sm">Your event is under review and will be featured once approved.</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <div>
                  <h3 className="text-red-800 font-semibold">Submission Failed</h3>
                  <p className="text-red-700 text-sm">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Event Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Local Lake Cleaning Drive"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your event, activities conducted, and objectives achieved..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="City, State"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Time
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Organizer Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Organizer Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="organizer.name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="organizer.name"
                    name="organizer.name"
                    required
                    value={formData.organizer.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="organizer.email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="organizer.email"
                    name="organizer.email"
                    required
                    value={formData.organizer.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="organizer.phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="organizer.phone"
                    name="organizer.phone"
                    required
                    value={formData.organizer.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="organizer.organization" className="block text-sm font-medium text-gray-700 mb-1">
                    Organization (Optional)
                  </label>
                  <input
                    type="text"
                    id="organizer.organization"
                    name="organizer.organization"
                    value={formData.organizer.organization}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="NGO, School, Community Group, etc."
                  />
                </div>
              </div>
            </div>

            {/* Event Impact */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Impact & Results</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Participants
                  </label>
                  <input
                    type="number"
                    id="participants"
                    name="participants"
                    value={formData.participants}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 50"
                  />
                </div>

                <div>
                  <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-1">
                    Impact & Achievements
                  </label>
                  <textarea
                    id="impact"
                    name="impact"
                    rows={3}
                    value={formData.impact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Cleaned 2 km of riverbank, collected 500 kg waste, planted 25 trees..."
                  />
                </div>
              </div>
            </div>

            {/* Media Upload */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Photos & Videos</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Photos
                  </label>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'images')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Upload up to 10 photos (max 5MB each)</p>
                </div>

                <div>
                  <label htmlFor="videos" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Videos
                  </label>
                  <input
                    type="file"
                    id="videos"
                    name="videos"
                    multiple
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, 'videos')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Upload up to 3 videos (max 50MB each)</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
              <div>
                <label htmlFor="socialMedia" className="block text-sm font-medium text-gray-700 mb-1">
                  Social Media Links
                </label>
                <input
                  type="url"
                  id="socialMedia"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Instagram, Facebook, or YouTube links"
                />
              </div>
            </div>

            {/* Consent & Permissions */}
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="futureEvents"
                  name="futureEvents"
                  checked={formData.futureEvents}
                  onChange={handleInputChange}
                  className="mt-1 mr-3"
                />
                <label htmlFor="futureEvents" className="text-sm text-gray-700">
                  I would like to be notified about future events and collaboration opportunities
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  checked={formData.consent}
                  onChange={handleInputChange}
                  className="mt-1 mr-3"
                />
                <label htmlFor="consent" className="text-sm text-gray-700">
                  I consent to sharing this event information and media on NadiStuti platform and social media channels. 
                  I confirm that I have the rights to share all uploaded content. *
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 
                 submitStatus === 'success' ? 'Submitted!' : 'Submit Event'}
              </button>
            </div>
          </form>

          {/* Guidelines */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Submission Guidelines</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Events should be related to water bodies, rivers, lakes, ponds, or water conservation</li>
              <li>• All content should be original and you should have rights to share it</li>
              <li>• Events will be reviewed within 48 hours before being featured</li>
              <li>• High-quality photos and detailed descriptions increase chances of being featured</li>
              <li>• We may contact you for additional information or media</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitEventForm;