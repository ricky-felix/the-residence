import { useState } from 'react'
import './Location.css'

type CatKey = 'shop' | 'health' | 'edu' | 'transit'

interface Category {
  key: CatKey
  name: string
  swatch: string
  radius: string
  clip: string
}

const CATEGORIES: Category[] = [
  { key: 'shop', name: 'Shopping', swatch: 'var(--accent)', radius: '50%', clip: 'none' },
  { key: 'health', name: 'Health', swatch: 'var(--ink)', radius: '0', clip: 'none' },
  { key: 'edu', name: 'Education', swatch: 'var(--teal)', radius: '0', clip: 'polygon(50% 0, 100% 100%, 0 100%)' },
  { key: 'transit', name: 'Transport', swatch: 'var(--ink)', radius: '0', clip: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)' },
]

// SAMPLE: invented place names (deliberately not real places) and illustrative drive times, matched to the map rings. Replace with verified data.
const PLACES: { cat: CatKey; name: string; minutes: number }[] = [
  { cat: 'shop', name: 'Solvanta Mall', minutes: 12 },
  { cat: 'shop', name: 'Pasar Karvela', minutes: 14 },
  { cat: 'health', name: 'Ardena General Hospital', minutes: 12 },
  { cat: 'health', name: 'Klinik Seravin', minutes: 11 },
  { cat: 'edu', name: 'Calvera International School', minutes: 10 },
  { cat: 'edu', name: 'SD Lirana', minutes: 16 },
  { cat: 'transit', name: 'Velantra Toll Gate', minutes: 15 },
  { cat: 'transit', name: 'Ostrana International Airport', minutes: 45 },
]

export default function Location() {
  const [cats, setCats] = useState<Record<CatKey, boolean>>({ shop: true, health: true, edu: true, transit: true })
  const toggle = (k: CatKey) => setCats((c) => ({ ...c, [k]: !c[k] }))
  const op = (k: CatKey) => (cats[k] ? 1 : 0.1)

  return (
    <section id="location" className="band--paper">
      <div className="container section-pad row">
        <div className="location__side">
          <h2 className="h2">What is around it.</h2>
          <p className="location__lead">Turn categories on and off to see what sits within a short drive.</p>
          <div className="chips">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                type="button"
                className="btn toggle toggle--accent location__cat"
                aria-pressed={cats[c.key]}
                onClick={() => toggle(c.key)}
              >
                <span
                  className="location__swatch"
                  style={{ background: c.swatch, borderRadius: c.radius, clipPath: c.clip }}
                />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
          <div className="location__list">
            {PLACES.filter((p) => cats[p.cat]).map((p) => (
              <div key={p.name} className="location__item">
                <span>{p.name}</span>
                <span className="mono location__time">{p.minutes} min</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-wide">
          <svg
            viewBox="0 0 700 460"
            role="img"
            aria-label="Schematic map of the area around The Residence with drive-time rings and pins for shopping, health, education and transport"
            className="location__map"
          >
            <defs>
              <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V40" fill="none" stroke="#E4E7E1" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="700" height="460" fill="url(#grid2)" />
            <g fill="none" stroke="#D3D7D0" strokeWidth="16" strokeLinecap="round">
              <path d="M0 320C120 300 240 340 350 230S590 150 700 190" />
              <path d="M350 0V460" />
              <path d="M60 460C140 380 250 330 350 230" />
              <path d="M350 230L640 420" />
            </g>
            <g fill="none" stroke="#13284A" strokeWidth="1" strokeDasharray="5 5">
              <circle cx="350" cy="230" r="90" />
              <circle cx="350" cy="230" r="160" />
              <circle cx="350" cy="230" r="230" />
            </g>
            <g fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#3C4A5A" stroke="#FFFFFF" strokeWidth="3" paintOrder="stroke">
              <text x="366" y="144">5 min</text>
              <text x="366" y="74">10 min</text>
              <text x="366" y="14">15 min</text>
            </g>

            <g opacity={op('shop')} fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fill="#13284A" stroke="#FFFFFF" strokeWidth="3" paintOrder="stroke">
              <circle cx="520" cy="130" r="9" fill="#F2C230" stroke="#13284A" strokeWidth="2" paintOrder="normal" />
              <text x="536" y="134">Shopping mall</text>
              <circle cx="130" cy="260" r="9" fill="#F2C230" stroke="#13284A" strokeWidth="2" paintOrder="normal" />
              <text x="146" y="264">Local market</text>
            </g>
            <g opacity={op('health')} fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fill="#13284A" stroke="#FFFFFF" strokeWidth="3" paintOrder="stroke">
              <rect x="181" y="111" width="18" height="18" fill="#13284A" stroke="#13284A" strokeWidth="1" paintOrder="normal" />
              <text x="207" y="125">Hospital</text>
              <rect x="491" y="331" width="18" height="18" fill="#13284A" stroke="#13284A" strokeWidth="1" paintOrder="normal" />
              <text x="517" y="345">Clinic</text>
            </g>
            <path d="M190 115V125M185 120H195" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity={op('health')} />
            <path d="M500 335V345M495 340H505" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity={op('health')} />
            <g opacity={op('edu')} fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fill="#13284A" stroke="#FFFFFF" strokeWidth="3" paintOrder="stroke">
              <polygon points="240,340 251,360 229,360" fill="#245B63" stroke="#245B63" strokeWidth="1" paintOrder="normal" />
              <text x="260" y="355">International school</text>
              <polygon points="110,140 121,160 99,160" fill="#245B63" stroke="#245B63" strokeWidth="1" paintOrder="normal" />
              <text x="130" y="155">Primary school</text>
            </g>
            <g opacity={op('transit')} fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fill="#13284A" stroke="#FFFFFF" strokeWidth="3" paintOrder="stroke">
              <polygon points="590,242 601,256 590,270 579,256" fill="#13284A" stroke="#13284A" strokeWidth="1" paintOrder="normal" />
              <text x="610" y="260">Toll gate</text>
              <polygon points="640,408 651,422 640,436 629,422" fill="#13284A" stroke="#13284A" strokeWidth="1" paintOrder="normal" />
              <text x="580" y="450">Airport, off map</text>
            </g>

            <circle cx="350" cy="230" r="15" fill="#13284A" stroke="#F2C230" strokeWidth="5" />
            <text x="350" y="268" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="13" fontWeight="600" fill="#13284A" stroke="#FFFFFF" strokeWidth="4" paintOrder="stroke">
              The Residence
            </text>
          </svg>
          <p className="note">Schematic map, not to scale. Place names and drive times are illustrative until verified.</p>
        </div>
      </div>
    </section>
  )
}
