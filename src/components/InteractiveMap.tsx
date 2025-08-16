import React, { useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

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
    description: 'The most sacred river, flowing from Gangotri to Bay of Bengal',
    href: '/rivers/ganga'
  },
  {
    id: 'yamuna',
    name: 'Yamuna',
    sanskrit: 'यमुना',
    color: '#8B5CF6',
    description: 'Sacred river associated with Lord Krishna',
    href: '/rivers/yamuna'
  },
  {
    id: 'saraswati',
    name: 'Saraswati',
    sanskrit: 'सरस्वती',
    color: '#F59E0B',
    description: 'The mystical river of knowledge and wisdom',
    href: '/rivers/saraswati'
  },
  {
    id: 'krishna',
    name: 'Krishna',
    sanskrit: 'कृष्णा',
    color: '#10B981',
    description: 'Major river of South India flowing eastward',
    href: '/rivers/krishna'
  },
  {
    id: 'kaveri',
    name: 'Kaveri',
    sanskrit: 'कावेरी',
    color: '#EF4444',
    description: 'The Ganga of the South, sacred to Tamil culture',
    href: '/rivers/kaveri'
  },
  {
    id: 'godavari',
    name: 'Godavari',
    sanskrit: 'गोदावरी',
    color: '#F97316',
    description: 'Longest river in South India',
    href: '/rivers/godavari'
  },
  {
    id: 'brahmaputra',
    name: 'Brahmaputra',
    sanskrit: 'ब्रह्मपुत्र',
    color: '#06B6D4',
    description: 'Son of Brahma, mighty river of Northeast India',
    href: '/rivers/brahmaputra'
  },
  {
    id: 'narmada',
    name: 'Narmada',
    sanskrit: 'नर्मदा',
    color: '#84CC16',
    description: 'One of the seven sacred rivers, flows westward',
    href: '/rivers/narmada'
  },
  {
    id: 'indus',
    name: 'Indus',
    sanskrit: 'सिन्धु',
    color: '#6366F1',
    description: 'The river that gave India its name',
    href: '/rivers/indus'
  },
  {
    id: 'mahanadi',
    name: 'Mahanadi',
    sanskrit: 'महानदी',
    color: '#EC4899',
    description: 'Great river of Eastern India',
    href: '/rivers/mahanadi'
  }
];

const InteractiveMap: React.FC = () => {
  const [hoveredRiver, setHoveredRiver] = useState<string | null>(null);

  return (
    <div className="flex flex-col lg:flex-row h-[600px]">
      {/* Sidebar with River List */}
      <div className="lg:w-1/3 bg-gray-50 p-6 overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Sacred Rivers</h3>
        <div className="space-y-3">
          {rivers.map((river) => (
            <div
              key={river.id}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                hoveredRiver === river.id
                  ? 'border-current shadow-lg transform scale-105'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{ 
                borderColor: hoveredRiver === river.id ? river.color : undefined,
                backgroundColor: hoveredRiver === river.id ? `${river.color}10` : undefined
              }}
              onMouseEnter={() => setHoveredRiver(river.id)}
              onMouseLeave={() => setHoveredRiver(null)}
              onClick={() => window.location.href = river.href}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: river.color }}
                  ></div>
                  <div>
                    <div className="font-semibold text-gray-900">{river.name}</div>
                    <div className="text-sm text-gray-600 font-sanskrit">{river.sanskrit}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mt-2">{river.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="lg:w-2/3 bg-white p-6 relative">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center relative overflow-hidden">
          {/* Simplified India Map SVG */}
          <svg
            viewBox="0 0 800 600"
            className="w-full h-full"
            style={{ maxHeight: '100%', maxWidth: '100%' }}
          >
            {/* India Outline */}
            <path
              d="M200 100 L600 100 L650 150 L680 200 L700 300 L680 400 L650 450 L600 500 L400 520 L300 500 L250 450 L200 400 L180 300 L200 200 Z"
              fill="#E5F3FF"
              stroke="#94A3B8"
              strokeWidth="2"
            />
            
            {/* River Paths */}
            {rivers.map((river) => {
              const riverPaths = {
                ganga: "M300 150 Q400 180 500 200 Q550 220 600 250",
                yamuna: "M320 160 Q380 190 450 220",
                saraswati: "M280 140 Q350 170 420 200",
                krishna: "M400 350 Q500 360 580 380",
                kaveri: "M450 420 Q520 430 580 450",
                godavari: "M380 320 Q480 340 560 360",
                brahmaputra: "M600 180 Q550 200 500 220 Q450 240 400 260",
                narmada: "M350 280 Q300 290 250 300",
                indus: "M220 120 Q250 150 280 180 Q300 200 320 220",
                mahanadi: "M480 300 Q520 320 560 340"
              };

              return (
                <path
                  key={river.id}
                  d={riverPaths[river.id as keyof typeof riverPaths]}
                  fill="none"
                  stroke={river.color}
                  strokeWidth={hoveredRiver === river.id ? "6" : "3"}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                  opacity={hoveredRiver === null || hoveredRiver === river.id ? 1 : 0.3}
                />
              );
            })}

            {/* River Labels */}
            {rivers.map((river, index) => {
              const labelPositions = [
                { x: 450, y: 190 }, // Ganga
                { x: 385, y: 205 }, // Yamuna
                { x: 350, y: 185 }, // Saraswati
                { x: 490, y: 370 }, // Krishna
                { x: 515, y: 440 }, // Kaveri
                { x: 470, y: 350 }, // Godavari
                { x: 500, y: 240 }, // Brahmaputra
                { x: 300, y: 300 }, // Narmada
                { x: 270, y: 200 }, // Indus
                { x: 520, y: 330 }  // Mahanadi
              ];

              const pos = labelPositions[index];
              return (
                <g key={`${river.id}-label`}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={hoveredRiver === river.id ? "8" : "5"}
                    fill={river.color}
                    className="transition-all duration-300"
                    opacity={hoveredRiver === null || hoveredRiver === river.id ? 1 : 0.5}
                  />
                  {hoveredRiver === river.id && (
                    <text
                      x={pos.x}
                      y={pos.y - 15}
                      textAnchor="middle"
                      className="text-sm font-semibold fill-gray-900"
                    >
                      {river.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Legend</h4>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <MapPin className="w-3 h-3" />
              <span>Hover over river names to highlight</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;