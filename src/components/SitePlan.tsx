import { useState } from 'react'
import { ACCENT } from '../lib/tokens'
import './SitePlan.css'

type ZoneId = 'towerA' | 'towerB' | 'clubhouse' | 'cowork' | 'playground' | 'ev'

interface Zone {
  id: ZoneId
  name: string
  title: string
  text: string
}

// SAMPLE: place names and descriptions are demonstration copy.
const ZONES_DATA: Zone[] = [
  { id: 'towerA', name: 'Tower A', title: 'Essential 2-bedroom apartments', text: 'Thoughtfully designed spaces with spacious living areas, smart home integration, premium finishes and a private balcony.' },
  { id: 'towerB', name: 'Tower B', title: 'Premium 3-bedroom apartments and penthouses', text: 'Larger layouts with home automation, walk-in closets and a gourmet kitchen. The top floors hold the presidential penthouses, with a private elevator, rooftop terrace and concierge service.' },
  { id: 'clubhouse', name: 'Clubhouse', title: 'Modern clubhouse', text: 'A fitness centre, lounge areas and event spaces for residents.' },
  { id: 'cowork', name: 'Co-working', title: 'Co-working spaces', text: 'Fibre internet, private meeting rooms and comfortable workstations.' },
  { id: 'playground', name: 'Playground', title: 'Children’s playground', text: 'A safe, supervised space for children to play and make friends.' },
  { id: 'ev', name: 'EV charging', title: 'EV charging stations', text: 'Tesla-compatible charging bays for residents.' },
]

const SANS = 'IBM Plex Sans, sans-serif'
const MONO = 'IBM Plex Mono, monospace'

export default function SitePlan() {
  const [zone, setZone] = useState<ZoneId>('towerA')
  const sel = ZONES_DATA.find((z) => z.id === zone) ?? ZONES_DATA[0]
  const fill = (id: ZoneId) => (zone === id ? ACCENT : '#FFFFFF')

  return (
    <section id="siteplan" className="band--accent">
      <div className="container siteplan__inner row">
        <div className="siteplan__text">
          <h2 className="h2">Everything on one plan.</h2>
          <p className="siteplan__lead">Pick a building or amenity to see what it holds and where it sits on the site.</p>
          <div className="stack">
            {ZONES_DATA.map((z) => (
              <button
                key={z.id}
                type="button"
                className="btn toggle siteplan__zone"
                aria-pressed={zone === z.id}
                onClick={() => setZone(z.id)}
              >
                {z.name}
              </button>
            ))}
          </div>
          <div className="siteplan__detail">
            <h3 className="h3">{sel.title}</h3>
            <p>{sel.text}</p>
          </div>
        </div>

        <div className="siteplan__figure">
          <svg
            viewBox="0 0 760 520"
            role="img"
            aria-label="Site plan showing two apartment towers, a clubhouse, co-working building, children's playground and an EV charging strip, with the selected place highlighted"
            className="siteplan__svg"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V40" fill="none" stroke="#DDE0DA" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="760" height="520" fill="url(#grid)" />
            <rect x="50" y="50" width="660" height="400" fill="#F6F7F4" stroke="#13284A" strokeWidth="2" />
            <rect x="50" y="50" width="660" height="400" fill="url(#grid)" />
            <path d="M140 450V330H690M345 60V330" fill="none" stroke="#D3D7D0" strokeWidth="22" />
            <rect x="110" y="446" width="60" height="8" fill="#F6F7F4" />
            <path d="M110 450H170" stroke="#13284A" strokeWidth="2" strokeDasharray="4 4" />
            <text x="140" y="470" textAnchor="middle" fontFamily={SANS} fontSize="12" fill="#13284A">Main gate</text>

            <rect x="110" y="90" width="200" height="90" fill={fill('towerA')} stroke="#13284A" strokeWidth="1.5" />
            <text x="210" y="140" textAnchor="middle" fontFamily={SANS} fontSize="15" fontWeight="500" fill="#13284A">Tower A</text>
            <rect x="110" y="210" width="200" height="90" fill={fill('towerB')} stroke="#13284A" strokeWidth="1.5" />
            <text x="210" y="260" textAnchor="middle" fontFamily={SANS} fontSize="15" fontWeight="500" fill="#13284A">Tower B</text>
            <rect x="380" y="90" width="150" height="90" fill={fill('clubhouse')} stroke="#13284A" strokeWidth="1.5" />
            <text x="455" y="140" textAnchor="middle" fontFamily={SANS} fontSize="15" fontWeight="500" fill="#13284A">Clubhouse</text>
            <rect x="380" y="210" width="150" height="90" fill={fill('cowork')} stroke="#13284A" strokeWidth="1.5" />
            <text x="455" y="260" textAnchor="middle" fontFamily={SANS} fontSize="15" fontWeight="500" fill="#13284A">Co-working</text>
            <rect x="570" y="90" width="110" height="100" rx="30" fill={fill('playground')} stroke="#13284A" strokeWidth="1.5" />
            <text x="625" y="145" textAnchor="middle" fontFamily={SANS} fontSize="15" fontWeight="500" fill="#13284A">Playground</text>
            <rect x="360" y="352" width="320" height="68" fill="#FFFFFF" stroke="#13284A" strokeWidth="1.5" />
            <path d="M410 352V420M460 352V420M510 352V420M560 352V420M610 352V420M660 352V420" stroke="#C5CAC3" strokeWidth="1" />
            <rect x="360" y="352" width="100" height="68" fill={fill('ev')} stroke="#13284A" strokeWidth="1.5" />
            <path d="M410 352V420" stroke="#8D9AA8" strokeWidth="1" />
            <text x="410" y="392" textAnchor="middle" fontFamily={SANS} fontSize="14" fontWeight="500" fill="#13284A">EV bays</text>
            <text x="570" y="392" textAnchor="middle" fontFamily={SANS} fontSize="13" fill="#13284A">Resident parking</text>

            <g fill="#9DB598" stroke="#5E7A59" strokeWidth="1">
              <circle cx="80" cy="90" r="9" /><circle cx="80" cy="135" r="9" /><circle cx="80" cy="180" r="9" /><circle cx="80" cy="225" r="9" /><circle cx="80" cy="270" r="9" /><circle cx="80" cy="315" r="9" />
              <circle cx="230" cy="345" r="8" /><circle cx="270" cy="345" r="8" /><circle cx="310" cy="345" r="8" />
              <circle cx="700" cy="120" r="8" /><circle cx="700" cy="170" r="8" /><circle cx="700" cy="230" r="8" /><circle cx="560" cy="300" r="8" /><circle cx="600" cy="300" r="8" /><circle cx="640" cy="300" r="8" />
            </g>

            <path d="M110 76H310M110 70V82M310 70V82" fill="none" stroke="#13284A" strokeWidth="1" />
            <text x="210" y="68" textAnchor="middle" fontFamily={MONO} fontSize="12" fill="#13284A">50.0 m</text>
            <path d="M92 90V180M86 90H98M86 180H98" fill="none" stroke="#13284A" strokeWidth="1" />
            <text transform="rotate(-90 88 135)" x="88" y="135" textAnchor="middle" fontFamily={MONO} fontSize="12" fill="#13284A">22.5 m</text>

            <rect x="60" y="486" width="40" height="8" fill="#13284A" />
            <rect x="100" y="486" width="40" height="8" fill="#FFFFFF" stroke="#13284A" strokeWidth="1" />
            <rect x="140" y="486" width="40" height="8" fill="#13284A" />
            <text x="60" y="510" fontFamily={MONO} fontSize="12" fill="#13284A">0</text>
            <text x="100" y="510" fontFamily={MONO} fontSize="12" fill="#13284A">10</text>
            <text x="140" y="510" fontFamily={MONO} fontSize="12" fill="#13284A">20 m</text>

            <polygon points="690,470 680,504 690,498 700,504" fill="#13284A" />
            <text x="690" y="462" textAnchor="middle" fontFamily={SANS} fontSize="13" fontWeight="600" fill="#13284A">N</text>
          </svg>
          <p className="note siteplan__note">Illustrative plan. Dimensions to be confirmed by the architect.</p>
        </div>
      </div>
    </section>
  )
}
