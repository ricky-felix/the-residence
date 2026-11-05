import { useState } from 'react'
import { ACCENT, INK, TEAL } from '../lib/tokens'
import './Apartment.css'

type LayerKey = 'light' | 'climate' | 'security' | 'voice'

interface LayerDef {
  key: LayerKey
  name: string
  swatch: string
  shape: 'circle' | 'square' | 'square-small' | 'diamond'
}

const LAYERS: LayerDef[] = [
  { key: 'light', name: 'Lighting', swatch: ACCENT, shape: 'circle' },
  { key: 'climate', name: 'Climate', swatch: TEAL, shape: 'square' },
  { key: 'security', name: 'Security', swatch: INK, shape: 'square-small' },
  { key: 'voice', name: 'Voice and audio', swatch: '#FFFFFF', shape: 'diamond' },
]

// SAMPLE: residence types, sizes and prices are placeholders.
const TYPES = [
  { type: 'Essential 2-bedroom', includes: 'Smart home integration, premium finishes, private balcony' },
  { type: 'Premium 3-bedroom', includes: 'Home automation, walk-in closets, gourmet kitchen' },
  { type: 'Presidential penthouse', includes: 'Private elevator, rooftop terrace, concierge service' },
]

type Layers = Record<LayerKey, boolean>

export default function Apartment() {
  const [layers, setLayers] = useState<Layers>({
    light: true,
    climate: true,
    security: false,
    voice: false,
  })

  const op = (k: LayerKey) => (layers[k] ? 1 : 0.08)

  return (
    <section id="apartment" className="container section-pad apartment">
      <div className="row">
        <div className="col-text">
          <h2 className="h2">Inside a 3-bedroom apartment.</h2>
          <p className="lead">
            Switch the smart-home layers on and off to see where every light, sensor and speaker lives.
          </p>
          <div className="stack">
            {LAYERS.map((ly) => (
              <button
                key={ly.key}
                type="button"
                className="btn toggle toggle--accent apartment__layer"
                aria-pressed={layers[ly.key]}
                onClick={() => setLayers((l) => ({ ...l, [ly.key]: !l[ly.key] }))}
              >
                <span
                  className={`apartment__swatch apartment__swatch--${ly.shape}`}
                  style={{ background: ly.swatch }}
                  aria-hidden="true"
                />
                <span>{ly.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="col-wide">
          <svg
            viewBox="0 0 640 470"
            role="img"
            aria-label="Floor plan of a three-bedroom apartment with toggleable layers for lighting, climate, security and voice and audio"
            className="apartment__plan"
          >
            <rect x="110" y="60" width="420" height="300" fill="#FFFFFF" />
            <rect x="185" y="195" width="270" height="75" fill="#EEF0EC" />
            <rect x="260" y="360" width="270" height="45" fill="#FFFFFF" stroke="#13284A" strokeWidth="1.5" strokeDasharray="6 4" />
            <g fill="none" stroke="#13284A" strokeWidth="2">
              <path d="M260 60V195M395 60V195M110 195H530M185 195V270M455 195V270M110 270H530M260 270V300" />
            </g>
            <rect x="110" y="60" width="420" height="300" fill="none" stroke="#13284A" strokeWidth="5" />
            <g fill="#FFFFFF">
              <rect x="215" y="192" width="30" height="6" />
              <rect x="300" y="192" width="30" height="6" />
              <rect x="420" y="192" width="30" height="6" />
              <rect x="182" y="215" width="6" height="30" />
              <rect x="452" y="215" width="6" height="30" />
              <rect x="527" y="296" width="6" height="40" />
              <rect x="290" y="357" width="60" height="6" />
              <rect x="440" y="357" width="60" height="6" />
            </g>
            <g fill="none" stroke="#13284A" strokeWidth="1.2">
              <path d="M245 195A30 30 0 0 0 215 165M215 165V195" />
              <path d="M330 195A30 30 0 0 0 300 165M300 165V195" />
              <path d="M450 195A30 30 0 0 0 420 165M420 165V195" />
              <path d="M185 245A30 30 0 0 1 155 215M155 215H185" />
              <path d="M455 245A30 30 0 0 0 485 215M455 215H485" />
              <path d="M530 336A40 40 0 0 0 490 296M490 296H530" />
              <rect x="165" y="305" width="70" height="30" fill="#F6F7F4" />
            </g>

            <g fontFamily="IBM Plex Sans, sans-serif" fontSize="13" fill="#13284A" textAnchor="middle">
              <text x="185" y="124">Master bedroom</text>
              <text x="327" y="124">Bedroom 2</text>
              <text x="462" y="124">Bedroom 3</text>
              <text x="147" y="228">Walk-in</text>
              <text x="147" y="244">closet</text>
              <text x="320" y="228">Hall</text>
              <text x="492" y="236">Bath</text>
              <text x="185" y="294">Kitchen</text>
              <text x="395" y="318">Living and dining</text>
              <text x="395" y="386">Balcony</text>
            </g>
            <g fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#3C4A5A" textAnchor="middle">
              <text x="185" y="141">5.0 x 4.5</text>
              <text x="327" y="141">4.5 x 4.5</text>
              <text x="462" y="141">4.5 x 4.5</text>
              <text x="320" y="245">9.0 x 2.5</text>
              <text x="185" y="311">5.0 x 3.0</text>
              <text x="395" y="335">9.0 x 3.0</text>
              <text x="395" y="402">9.0 x 1.5</text>
            </g>

            <path d="M110 42H530M110 36V48M530 36V48" fill="none" stroke="#13284A" strokeWidth="1" />
            <text x="320" y="32" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="#13284A">14.0 m</text>
            <path d="M566 60V360M560 60H572M560 360H572" fill="none" stroke="#13284A" strokeWidth="1" />
            <text transform="rotate(-90 580 210)" x="580" y="210" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="#13284A">10.0 m</text>

            <g opacity={op('light')} fill={ACCENT} stroke="#13284A" strokeWidth="1.2">
              <circle cx="185" cy="90" r="7" />
              <circle cx="327" cy="90" r="7" />
              <circle cx="462" cy="90" r="7" />
              <circle cx="147" cy="214" r="6" />
              <circle cx="320" cy="212" r="6" />
              <circle cx="492" cy="214" r="6" />
              <circle cx="215" cy="283" r="6" />
              <circle cx="330" cy="288" r="7" />
              <circle cx="470" cy="288" r="7" />
              <circle cx="395" cy="378" r="6" />
            </g>
            <g opacity={op('climate')}>
              <g fill="#245B63" stroke="#13284A" strokeWidth="1">
                <rect x="168" y="66" width="34" height="10" />
                <rect x="310" y="66" width="34" height="10" />
                <rect x="445" y="66" width="34" height="10" />
                <rect x="330" y="276" width="34" height="10" />
              </g>
              <g fill="none" stroke="#245B63" strokeWidth="1.5" strokeDasharray="3 4">
                <path d="M185 80V108M327 80V108M462 80V108M347 290V306" />
              </g>
            </g>
            <g opacity={op('security')} fill="#13284A">
              <rect x="521" y="292" width="10" height="10" />
              <rect x="390" y="353" width="10" height="10" />
              <rect x="180" y="54" width="10" height="10" />
              <rect x="322" y="54" width="10" height="10" />
              <rect x="457" y="54" width="10" height="10" />
              <polygon points="500,350 520,350 510,334" />
            </g>
            <g opacity={op('voice')} fill="#FFFFFF" stroke="#13284A" strokeWidth="2">
              <polygon points="300,225 308,233 300,241 292,233" />
              <polygon points="140,285 148,293 140,301 132,293" />
              <polygon points="300,345 308,353 300,361 292,353" />
              <polygon points="480,345 488,353 480,361 472,353" />
            </g>
          </svg>
          <p className="note">Sample layout of the Premium 3-bedroom. Final plans to be confirmed.</p>

          <div className="apartment__table-wrap">
            <table className="apartment__table">
              <caption>Residence types</caption>
              <thead>
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Includes</th>
                  <th scope="col">Size</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {TYPES.map((t) => (
                  <tr key={t.type}>
                    <th scope="row">{t.type}</th>
                    <td>{t.includes}</td>
                    <td className="mono">[SIZE] m2</td>
                    <td className="mono">[PRICE]</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
