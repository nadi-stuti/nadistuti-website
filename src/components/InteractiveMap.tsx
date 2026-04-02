import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { ExternalLink } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface River {
  id: string;
  name: string;
  sanskrit: string;
  color: string;
  description: string;
  coordinates: [number, number];
  path: [number, number][];
  href: string;
}

interface Props {
  lang: string;
}

const riverData = [
  {
    id: 'ganga',
    name: 'Ganga',
    sanskrit: 'गङ्गा',
    color: '#3B82F6',
    description: 'The most sacred river, flowing from Gangotri to Bay of Bengal',
    coordinates: [30.994, 78.940] as [number, number], // Gangotri glacier (source)
    path: [
      [30.994, 78.940], // Gangotri glacier (source)
      [30.144, 78.598], // Devprayag (Bhagirathi + Alaknanda confluence)
      [30.087, 78.268], // Rishikesh
      [29.945, 78.164], // Haridwar
      [29.372, 78.136], // Bijnor
      [28.180, 78.400], // Narora
      [27.054, 79.917], // Kannauj
      [26.468, 80.326], // Kanpur
      [25.430, 81.836], // Prayagraj (Yamuna confluence)
      [25.320, 83.010], // Varanasi
      [25.576, 84.003], // Arrah
      [25.594, 85.134], // Patna
      [25.370, 86.468], // Munger
      [25.247, 86.986], // Bhagalpur
      [24.799, 87.930], // Farakka
      [23.972, 89.170], // Padma, Bangladesh
      [23.370, 90.530], // Meghna confluence
      [22.500, 90.850], // Bay of Bengal
    ] as [number, number][],
  },
  {
    id: 'yamuna',
    name: 'Yamuna',
    sanskrit: 'यमुना',
    color: '#8B5CF6',
    description: 'Sacred river associated with Lord Krishna',
    coordinates: [31.014, 78.461] as [number, number], // Yamunotri glacier (source)
    path: [
      [31.014, 78.461], // Yamunotri glacier (source)
      [30.826, 78.240], // Hanumanchatti
      [30.532, 77.843], // Kalsi
      [30.440, 77.624], // Paonta Sahib
      [30.228, 77.525], // Tajewala (enters plains)
      [30.128, 77.291], // Yamuna Nagar
      [29.980, 77.500], // Saharanpur area
      [28.663, 77.229], // Delhi
      [27.493, 77.673], // Mathura
      [27.176, 78.022], // Agra
      [26.774, 79.016], // Etawah
      [26.115, 79.745], // Kalpi
      [25.430, 81.836], // Prayagraj (confluence with Ganga)
    ] as [number, number][],
  },
  {
    id: 'saraswati',
    name: 'Saraswati',
    sanskrit: 'सरस्वती',
    color: '#F59E0B',
    description: 'The mystical river of knowledge and wisdom',
    coordinates: [30.170, 79.480] as [number, number], // Adi Badri (traditional source)
    path: [
      [30.170, 79.480], // Adi Badri (traditional source)
      [30.074, 78.273], // Rishikesh foothills
      [29.960, 76.840], // Kurukshetra
      [29.590, 75.460], // Hisar area
      [29.400, 74.640], // Hanumangarh
      [28.960, 73.880], // Suratgarh
      [28.000, 73.300], // Bikaner
      [26.920, 71.890], // Jaisalmer area
      [25.900, 71.000], // Barmer area
      [24.630, 69.620], // Thar desert, Pakistan
      [23.700, 68.500], // Rann of Kutch (disappears)
    ] as [number, number][],
  },
  {
    id: 'krishna',
    name: 'Krishna',
    sanskrit: 'कृष्णा',
    color: '#10B981',
    description: 'Major river of South India flowing eastward',
    coordinates: [17.924, 73.667] as [number, number], // Mahabaleshwar (source)
    path: [
      [17.924, 73.667], // Mahabaleshwar (source)
      [17.948, 74.000], // Wai
      [17.293, 74.183], // Karad
      [16.855, 74.565], // Sangli
      [16.828, 74.643], // Miraj
      [16.828, 75.721], // Vijayapura
      [17.122, 76.881], // Sannati
      [16.207, 77.370], // Raichur
      [15.835, 78.040], // Kurnool
      [16.574, 79.319], // Nagarjuna Sagar
      [16.506, 80.620], // Vijayawada
      [15.950, 80.880], // Krishna delta
      [15.720, 80.900], // Bay of Bengal
    ] as [number, number][],
  },
  {
    id: 'kaveri',
    name: 'Kaveri',
    sanskrit: 'कावेरी',
    color: '#EF4444',
    description: 'The Ganga of the South, sacred to Tamil culture',
    coordinates: [12.392, 75.573] as [number, number], // Talakaveri (source)
    path: [
      [12.392, 75.573], // Talakaveri (source)
      [12.422, 75.961], // Kushalnagar
      [12.423, 76.571], // KRS Dam / Mysore
      [12.424, 76.697], // Srirangapatna
      [12.268, 77.174], // Sivasamudram Falls
      [12.119, 77.790], // Hogenakal
      [11.789, 77.800], // Mettur Dam
      [11.446, 77.684], // Bhavani confluence
      [10.957, 78.077], // Karur
      [10.854, 78.694], // Trichy / Srirangam
      [10.963, 79.389], // Kumbakonam
      [11.103, 79.854], // Poompuhar (Bay of Bengal)
    ] as [number, number][],
  },
  {
    id: 'godavari',
    name: 'Godavari',
    sanskrit: 'गोदावरी',
    color: '#F97316',
    description: 'Longest river in South India',
    coordinates: [19.927, 73.530] as [number, number], // Trimbakeshwar (source)
    path: [
      [19.927, 73.530], // Trimbakeshwar (source)
      [20.012, 73.790], // Nashik
      [19.892, 74.475], // Kopargaon
      [19.160, 77.308], // Nanded
      [19.099, 78.342], // Nirmal
      [18.437, 79.128], // Karimnagar
      [18.870, 79.440], // Mancherial / Ramagundam
      [17.670, 80.887], // Bhadrachalam
      [17.004, 81.802], // Rajahmundry
      [16.567, 82.247], // Antarvedi (Bay of Bengal)
    ] as [number, number][],
  },
  {
    id: 'brahmaputra',
    name: 'Brahmaputra',
    sanskrit: 'ब्रह्मपुत्र',
    color: '#06B6D4',
    description: 'Son of Brahma, mighty river of Northeast India',
    coordinates: [30.450, 82.000] as [number, number], // Angsi Glacier, Tibet (source)
    path: [
      [30.450, 82.000], // Angsi Glacier, Tibet (source — as Tsangpo)
      [29.267, 88.883], // Shigatse, Tibet
      [29.652, 91.117], // Lhasa, Tibet
      [29.155, 93.817], // Gyatsa, Tibet
      [29.630, 95.015], // Namcha Barwa / Great Bend
      [28.068, 95.328], // Pasighat, Arunachal Pradesh (enters India)
      [27.484, 94.901], // Dibrugarh
      [26.748, 94.215], // Jorhat
      [26.184, 91.736], // Guwahati
      [26.171, 90.626], // Goalpara
      [26.018, 89.993], // Dhubri (enters Bangladesh)
      [25.120, 89.673], // Bahadurabad, Bangladesh
      [24.452, 89.710], // Sirajganj (Jamuna), Bangladesh
      [23.768, 89.820], // Aricha (confluence with Padma/Ganga)
      [23.370, 90.530], // Meghna
      [22.500, 90.850], // Bay of Bengal
    ] as [number, number][],
  },
  {
    id: 'narmada',
    name: 'Narmada',
    sanskrit: 'नर्मदा',
    color: '#84CC16',
    description: 'One of the seven sacred rivers, flows westward',
    coordinates: [22.674, 81.751] as [number, number], // Amarkantak (source)
    path: [
      [22.674, 81.751], // Amarkantak (source)
      [22.601, 80.373], // Mandla
      [23.133, 79.833], // Jabalpur / Bhedaghat
      [22.954, 79.194], // Narsinghpur
      [22.745, 77.729], // Hoshangabad
      [22.244, 76.154], // Omkareshwar
      [22.183, 75.590], // Maheshwar
      [22.263, 75.026], // Barwaha
      [22.338, 74.562], // Maan Dam area
      [21.870, 73.509], // Rajpipla
      [21.706, 73.001], // Bharuch
      [21.634, 72.584], // Gulf of Khambhat (Arabian Sea)
    ] as [number, number][],
  },
  {
    id: 'indus',
    name: 'Indus',
    sanskrit: 'सिन्धु',
    color: '#6366F1',
    description: 'The river that gave India its name',
    coordinates: [31.510, 80.252] as [number, number], // Sengge Zangbo glacier, Tibet (source)
    path: [
      [31.510, 80.252], // Sengge Zangbo glacier, Tibet (source)
      [32.503, 80.105], // Shiquanhe / Ali, Tibet
      [32.700, 79.700], // Demchok (enters India / Ladakh)
      [34.166, 77.584], // Leh
      [34.559, 76.125], // Kargil
      [35.296, 75.630], // Skardu, Pakistan
      [35.921, 74.308], // Gilgit confluence
      [33.866, 72.360], // Attock (enters Punjab plains)
      [32.957, 71.566], // Kalabagh
      [30.696, 70.640], // Taunsa
      [27.703, 68.872], // Sukkur
      [25.392, 68.374], // Hyderabad, Pakistan
      [23.976, 67.150], // Karachi delta (Arabian Sea)
    ] as [number, number][],
  },
  {
    id: 'mahanadi',
    name: 'Mahanadi',
    sanskrit: 'महानदी',
    color: '#EC4899',
    description: 'Great river of Eastern India',
    coordinates: [20.270, 82.060] as [number, number], // Sihawa, Chhattisgarh (source)
    path: [
      [20.270, 82.060], // Sihawa (source)
      [20.959, 81.888], // Rajim
      [21.721, 82.556], // Shivarinarayan
      [21.527, 83.870], // Hirakud Dam / Sambalpur
      [20.829, 83.907], // Sonepur
      [20.607, 84.606], // Tikarapara
      [20.290, 85.803], // Mundali Barrage
      [20.461, 85.878], // Cuttack
      [20.260, 86.678], // Paradip (Bay of Bengal)
    ] as [number, number][],
  },
];

function createColoredIcon(color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 26 14 26S28 23.333 28 14C28 6.268 21.732 0 14 0z"
      fill="${color}" stroke="white" stroke-width="2"/>
    <circle cx="14" cy="14" r="6" fill="white" opacity="0.9"/>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -42],
  });
}

const InteractiveMap: React.FC<Props> = ({ lang }) => {
  const [hoveredRiver, setHoveredRiver] = useState<string | null>(null);

  const rivers: River[] = riverData.map((r) => ({
    ...r,
    href: `/${lang}/rivers/${r.id}`,
  }));

  return (
    <div className="flex flex-col lg:flex-row h-[600px]">
      {/* Sidebar */}
      <div className="lg:w-1/3 h-[200px] lg:h-full bg-gray-50 p-4 lg:p-6 overflow-y-auto flex-shrink-0">
        <h3 className="text-xl font-bold text-gray-900 mb-1">Sacred Rivers</h3>
        <p className="text-xs text-gray-500 mb-4">Hover over a river to trace its path</p>
        <div className="space-y-2">
          {rivers.map((river) => {
            const isHovered = hoveredRiver === river.id;
            return (
              <div
                key={river.id}
                className="p-3 rounded-lg border-2 transition-all cursor-pointer border-gray-200"
                style={{
                  borderColor: isHovered ? river.color : undefined,
                  backgroundColor: isHovered ? `${river.color}15` : undefined,
                }}
                onMouseEnter={() => setHoveredRiver(river.id)}
                onMouseLeave={() => setHoveredRiver(null)}
                onClick={() => window.open(river.href, '_blank', 'noopener,noreferrer')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: river.color }}
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {river.name}
                      </div>
                      <div className="text-xs text-gray-500">{river.sanskrit}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 min-h-0 lg:w-2/3">
        <MapContainer
          center={[22, 82]}
          zoom={5}
          style={{ width: '100%', height: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Draw polyline for hovered river */}
          {rivers.map((river) =>
            hoveredRiver === river.id ? (
              <Polyline
                key={river.id}
                positions={river.path}
                pathOptions={{
                  color: river.color,
                  weight: 5,
                  opacity: 0.9,
                  lineJoin: 'round',
                  lineCap: 'round',
                }}
              />
            ) : null
          )}

          {/* Markers for all rivers */}
          {rivers.map((river) => (
            <Marker
              key={river.id}
              position={river.coordinates}
              icon={createColoredIcon(river.color)}
            >
              <Popup>
                <div style={{ minWidth: '160px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px',
                    }}
                  >
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: river.color,
                        flexShrink: 0,
                      }}
                    />
                    <strong style={{ color: '#111827' }}>{river.name}</strong>
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: '#6B7280',
                      marginBottom: '6px',
                    }}
                  >
                    {river.sanskrit}
                  </div>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#374151',
                      marginBottom: '10px',
                      lineHeight: '1.4',
                    }}
                  >
                    {river.description}
                  </p>
                  <a
                    href={river.href}
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: river.color,
                      textDecoration: 'none',
                    }}
                  >
                    Learn more →
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default InteractiveMap;
