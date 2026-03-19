import React, { useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

// Import images
import allRiversMap from '../assets/maps/all-rivers.png';
import gangaMap from '../assets/maps/ganga.png';
import yamunaMap from '../assets/maps/yamuna.png';
import saraswatiMap from '../assets/maps/saraswati.png';
import krishnaMap from '../assets/maps/krishna.png';
import kaveriMap from '../assets/maps/kaveri.png';
import godavariMap from '../assets/maps/godawari.png';
import brahmaputraMap from '../assets/maps/brahmaputra.png';
import narmadaMap from '../assets/maps/narmada.png';
import indusMap from '../assets/maps/sindhu.png';
import mahanadiMap from '../assets/maps/mahanadi.png';

interface River {
  id: string;
  name: string;
  sanskrit: string;
  color: string;
  description: string;
  href: string;
}

const rivers: River[] = [
  {
    id: 'ganga',
    name: 'Ganga',
    sanskrit: 'गङ्गा',
    color: '#3B82F6',
    description: 'The most sacred river of India, flowing from Gangotri to the Bay of Bengal.',
    href: '/rivers/ganga'
  },
  {
    id: 'yamuna',
    name: 'Yamuna',
    sanskrit: 'यमुना',
    color: '#8B5CF6',
    description: 'The sacred river associated with Lord Krishna.',
    href: '/rivers/yamuna'
  },
  {
    id: 'saraswati',
    name: 'Saraswati',
    sanskrit: 'सरस्वती',
    color: '#F59E0B',
    description: 'The mystical river of knowledge and wisdom.',
    href: '/rivers/saraswati'
  },
  {
    id: 'krishna',
    name: 'Krishna',
    sanskrit: 'कृष्णा',
    color: '#10B981',
    description: 'Major river of South India flowing eastward.',
    href: '/rivers/krishna'
  },
  {
    id: 'kaveri',
    name: 'Kaveri',
    sanskrit: 'कावेरी',
    color: '#EF4444',
    description: 'The sacred river of South India, revered as a goddess.',
    href: '/rivers/kaveri'
  },
  {
    id: 'godavari',
    name: 'Godavari',
    sanskrit: 'गोदावरी',
    color: '#F97316',
    description: 'Known as the Ganga of the South.',
    href: '/rivers/godavari'
  },
  {
    id: 'brahmaputra',
    name: 'Brahmaputra',
    sanskrit: 'ब्रह्मपुत्र',
    color: '#06B6D4',
    description: 'The mighty river originating from Tibet.',
    href: '/rivers/brahmaputra'
  },
  {
    id: 'narmada',
    name: 'Narmada',
    sanskrit: 'नर्मदा',
    color: '#84CC16',
    description: 'One of the seven sacred rivers, flows westward.',
    href: '/rivers/narmada'
  },
  {
    id: 'indus',
    name: 'Indus',
    sanskrit: 'सिन्धु',
    color: '#6366F1',
    description: 'The historic river that gave India its name.',
    href: '/rivers/indus'
  },
  {
    id: 'mahanadi',
    name: 'Mahanadi',
    sanskrit: 'महानदी',
    color: '#EC4899',
    description: 'The great river of Odisha and Chhattisgarh.',
    href: '/rivers/mahanadi'
  }
];

const riverImages: Record<string, ImageMetadata> = {
  ganga: gangaMap,
  yamuna: yamunaMap,
  saraswati: saraswatiMap,
  krishna: krishnaMap,
  kaveri: kaveriMap,
  godavari: godavariMap,
  brahmaputra: brahmaputraMap,
  narmada: narmadaMap,
  indus: indusMap,
  mahanadi: mahanadiMap,
};

const InteractiveMap: React.FC = () => {
  const [hoveredRiver, setHoveredRiver] = useState<string | null>(null);

  return (
    <div className="flex flex-col lg:flex-row h-[600px] bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Sidebar with River List */}
      <div className="lg:w-1/3 bg-gray-50 p-6 overflow-y-auto border-r border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Sacred Rivers</h3>
        <div className="space-y-3">
          {rivers.map((river) => (
            <div
              key={river.id}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${hoveredRiver === river.id
                  ? 'border-blue-500 bg-blue-50 shadow-md transform scale-102'
                  : 'border-white bg-white hover:border-blue-200 hover:bg-gray-50'
                }`}
              onMouseEnter={() => setHoveredRiver(river.id)}
              onMouseLeave={() => setHoveredRiver(null)}
              onClick={() => window.location.href = river.href}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: river.color }}
                  ></div>
                  <div>
                    <div className="font-semibold text-gray-900 leading-tight">{river.name}</div>
                    <div className="text-xs text-gray-500 font-serif mt-0.5">{river.sanskrit}</div>
                  </div>
                </div>
                <ExternalLink className={`w-4 h-4 transition-colors ${hoveredRiver === river.id ? 'text-blue-500' : 'text-gray-300'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="lg:w-2/3 relative bg-slate-50 flex items-center justify-center p-8">
        <div className="relative w-full max-w-[600px] aspect-[3/4]">
          {/* Base Map (Always visible, but maybe hidden if we want perfect overlay?) 
               Actually user said: "when user does not select any image then it should show all-rivers.png as base image"
               And "when any river is selected show the india map with that river"
           */}

          <img
            src={allRiversMap.src}
            alt="All Sacred Rivers of India"
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${hoveredRiver ? 'opacity-0' : 'opacity-100'}`}
          />

          {Object.entries(riverImages).map(([slug, image]) => (
            <img
              key={slug}
              src={image.src}
              alt={`${slug} river map`}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${hoveredRiver === slug ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}

          {/* Legend / Tip */}
          {!hoveredRiver && (
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>Hover over the list to view specific rivers</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;