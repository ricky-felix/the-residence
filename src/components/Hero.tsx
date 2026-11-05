import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { clamp, mix } from '../lib/color'
import { ACCENT } from '../lib/tokens'
import './Hero.css'

interface Scene {
  to: number
  title: string
  text: string
  on: string[]
}

const SCENES: Scene[] = [
  { to: 5.5, title: 'Overnight', text: 'Doors are locked and the cameras are watching. Bedrooms sit at their sleep temperature, and everything else draws as little power as it can.', on: ['security', 'climate', 'energy'] },
  { to: 8.5, title: 'Waking up', text: 'Bedroom lights warm up with the sky. The kitchen answers when you ask for the news, and the air-conditioning is already set.', on: ['lighting', 'climate', 'voice'] },
  { to: 12, title: 'Leaving', text: 'You leave. The door locks behind you, lights switch off, the climate eases back and the cameras arm.', on: ['security', 'energy', 'climate'] },
  { to: 17, title: 'Daytime', text: 'The apartment idles in its most efficient mode. The co-working space downstairs is open if you would rather work close to home.', on: ['energy', 'security'] },
  { to: 21, title: 'Coming home', text: 'The house sees you coming. Lights come up and the living room has already cooled by the time you reach the door.', on: ['lighting', 'climate', 'security'] },
  { to: 25, title: 'Evening', text: 'The living room switches to a film scene: lights dim, the speakers route to the room and a voice command pauses everything.', on: ['entertainment', 'voice', 'lighting'] },
]

const SYSTEMS = [
  { k: 'voice', name: 'Voice control' },
  { k: 'climate', name: 'Climate' },
  { k: 'security', name: 'Security' },
  { k: 'energy', name: 'Energy' },
  { k: 'lighting', name: 'Lighting' },
  { k: 'entertainment', name: 'Entertainment' },
  { k: 'rain', name: 'Rain protection' },
]

const PRESETS = [
  { label: 'Morning', h: 7, scene: 'Waking up' },
  { label: 'Out', h: 10, scene: 'Leaving' },
  { label: 'Home', h: 18, scene: 'Coming home' },
  { label: 'Night', h: 22, scene: 'Evening' },
]

const WEATHER = [
  { label: 'Clear', rain: false },
  { label: 'Rain', rain: true },
]

const FOOTPRINT: [number, number][] = [[430, 470], [239.5, 360], [386.7, 275], [577.2, 385]]

interface SceneValues {
  skyTop: string
  skyBottom: string
  sunX: number
  sunY: number
  sunOp: number
  moonX: number
  moonY: number
  moonOp: number
  starOp: number
  ground: string
  edgeL: string
  edgeR: string
  lawn: string
  tree: string
  faceL: string
  faceR: string
  topFace: string
  slab: string
  winA: string
  winB: string
  noteFill: string
  shadowPts: string
  shadowOp: number
  timeLabel: string
  scene: Scene
}

function computeScene(h: number, rain: boolean): SceneValues {
  const inDay = h >= 6 && h <= 18
  const t = (h - 6) / 12
  const r = rain ? 1 : 0
  const light = (inDay ? clamp(Math.sin(Math.PI * t) * 1.8, 0, 1) : 0) * (1 - 0.45 * r)
  const warm = clamp(Math.exp(-Math.pow((h - 6.3) / 1.1, 2)) + Math.exp(-Math.pow((h - 17.7) / 1.1, 2)), 0, 1)

  let skyTop = mix('#0A1424', '#6FA8D0', light)
  skyTop = mix(skyTop, '#E4A86B', warm * 0.3)
  skyTop = mix(skyTop, '#66717F', r * 0.55)
  let skyBottom = mix('#18283F', '#D9E8EF', light)
  skyBottom = mix(skyBottom, '#F0B77E', warm * 0.7)
  skyBottom = mix(skyBottom, '#8794A1', r * 0.5)

  const sunT = inDay ? t : 0
  const sunX = 60 + 700 * sunT
  const sunY = 330 - 290 * Math.sin(Math.PI * sunT)
  const sunOp = clamp(light * 4, 0, 1) * (1 - r * 0.8)
  const mt = h >= 18 ? (h - 18) / 12 : (h + 6) / 12
  const moonX = 60 + 700 * mt
  const moonY = 330 - 290 * Math.sin(Math.PI * mt)
  const moonOp = 1 - clamp(light * 3, 0, 1)
  const starOp = clamp(1 - light * 2.5 - warm * 0.3, 0, 1) * 0.9

  const ground = mix('#101D2E', '#CBD0CB', light)
  const edgeL = mix(ground, '#0B1422', 0.35)
  const edgeR = mix(ground, '#0B1422', 0.2)
  const lawn = mix('#13261F', '#9DBA94', light)
  const tree = mix('#0F2A22', '#6F9468', light)
  const faceL = mix('#0F1B2C', '#9DA7AE', light)
  let faceR = mix('#15243A', '#D2D6D4', light)
  faceR = mix(faceR, '#E9B77A', warm * 0.25)
  const topFace = mix('#1B2C44', '#E9ECEA', light)
  const slab = mix('#2A3D58', '#F1F3F1', light)
  const winA = mix('#6C92A6', '#F0C26A', 1 - clamp(light * 2.2, 0, 1))
  const winB = mix('#7FA3B5', '#0C1626', 1 - clamp(light * 1.6, 0, 1))
  const noteFill = mix('#C8D2E0', '#2B3A4A', light)

  const sx = inDay ? (0.5 - t) * 380 : 0
  const sy = inDay ? (0.5 - t) * 60 : 0
  const shadowPts = FOOTPRINT.map((p) => (p[0] + sx).toFixed(1) + ',' + (p[1] + sy).toFixed(1)).join(' ')
  const shadowOp = light * 0.28

  const hh = String(Math.floor(h)).padStart(2, '0')
  const timeLabel = hh + ':' + (h % 1 ? '30' : '00')
  const scene = SCENES.find((sc) => h < sc.to) ?? SCENES[5]

  return {
    skyTop, skyBottom, sunX, sunY, sunOp, moonX, moonY, moonOp, starOp,
    ground, edgeL, edgeR, lawn, tree, faceL, faceR, topFace, slab, winA, winB, noteFill,
    shadowPts, shadowOp, timeLabel, scene,
  }
}

const TREES: { x: number; y: number; rx: number; ry: number; r: number; dy: number }[] = [
  { x: 150, y: 446, rx: 14, ry: 5, r: 15, dy: 16 },
  { x: 196, y: 471, rx: 14, ry: 5, r: 15, dy: 16 },
  { x: 118, y: 416, rx: 12, ry: 4, r: 13, dy: 14 },
  { x: 690, y: 456, rx: 14, ry: 5, r: 15, dy: 16 },
  { x: 734, y: 420, rx: 12, ry: 4, r: 13, dy: 14 },
  { x: 486, y: 561, rx: 14, ry: 5, r: 15, dy: 16 },
  { x: 530, y: 536, rx: 14, ry: 5, r: 15, dy: 16 },
]

export default function Hero() {
  const [hour, setHour] = useState(7.5)
  const [rain, setRain] = useState(false)
  const v = computeScene(hour, rain)
  const { scene } = v

  const onHour = (e: ChangeEvent<HTMLInputElement>) => setHour(parseFloat(e.target.value))

  return (
    <section id="top" className="hero">
      <div className="hero__intro">
        <h1 className="hero__title">A house that keeps time with your day.</h1>
        <p className="hero__lead">The Residence is the first smart-home complex in Medan. Drag the clock and watch one apartment tower follow a full day: the sun, the shade, the lights and the systems doing the work.</p>
        <div className="hero__ctas">
          <a href="#visit" className="btn btn--accent hero__cta">Book a viewing</a>
          <a href="#siteplan" className="hero__link">See the site plan</a>
        </div>
      </div>

      <div className="hero__panel">
        <svg viewBox="0 0 820 660" role="img" aria-label="Isometric drawing of a six-storey apartment tower with a penthouse and a clubhouse, lit for the selected time of day" className="hero__svg">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={v.skyTop} />
              <stop offset="1" stopColor={v.skyBottom} />
            </linearGradient>
            <pattern id="win" width="84" height="76" patternUnits="userSpaceOnUse">
              <rect x="6" y="8" width="30" height="22" fill={v.winA} />
              <rect x="48" y="8" width="30" height="22" fill={v.winB} />
              <rect x="6" y="46" width="30" height="22" fill={v.winB} />
              <rect x="48" y="46" width="30" height="22" fill={v.winA} />
              <rect x="0" y="35" width="84" height="3" fill={v.slab} />
              <rect x="0" y="73" width="84" height="3" fill={v.slab} />
            </pattern>
            <pattern id="rain" width="40" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(14)">
              <path d="M8 4V20M28 24V40M18 40V56" stroke="#DCE6F0" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            </pattern>
          </defs>
          <rect width="820" height="660" fill="url(#sky)" />
          <g fill="#FFFFFF" opacity={v.starOp}>
            <circle cx="70" cy="58" r="1.6" /><circle cx="168" cy="120" r="1.2" /><circle cx="250" cy="44" r="1.6" /><circle cx="330" cy="96" r="1.2" /><circle cx="520" cy="52" r="1.6" /><circle cx="610" cy="118" r="1.2" /><circle cx="700" cy="60" r="1.6" /><circle cx="770" cy="140" r="1.2" />
          </g>
          <circle cx={v.moonX} cy={v.moonY} r="17" fill="#E9EDF2" opacity={v.moonOp} />
          <circle cx={v.sunX} cy={v.sunY} r="28" fill="#F7DB8E" opacity={v.sunOp} />

          <polygon points="50,415 430,634 430,620 50,401" fill={v.edgeL} />
          <polygon points="430,634 810,415 810,401 430,620" fill={v.edgeR} />
          <polygon points="430,620 810,401 430,182 50,401" fill={v.ground} />
          <polygon points={v.shadowPts} fill="#0B1422" opacity={v.shadowOp} />
          <polygon points="330,530 416.6,480 356,445 269.4,495" fill={v.lawn} />

          <g transform="matrix(0.866 0.5 0 1 239.5 132)"><rect width="220" height="228" fill={v.faceL} /><rect width="210" height="228" fill="url(#win)" /></g>
          <g transform="matrix(0.866 -0.5 0 1 430 242)"><rect width="170" height="228" fill={v.faceR} /><rect width="168" height="228" fill="url(#win)" /></g>
          <polygon points="430,242 239.5,132 386.7,47 577.2,157" fill={v.topFace} />

          <g transform="matrix(0.866 0.5 0 1 316.6 108.5)"><rect width="126" height="38" fill={v.faceL} /><rect width="126" height="38" fill="url(#win)" /></g>
          <g transform="matrix(0.866 -0.5 0 1 425.7 171.5)"><rect width="84" height="38" fill={v.faceR} /><rect width="84" height="38" fill="url(#win)" /></g>
          <polygon points="425.7,171.5 316.6,108.5 389.3,66.5 498.4,129.5" fill={v.topFace} />

          <g transform="matrix(0.866 0.5 0 1 537.3 400)"><rect width="84" height="38" fill={v.faceL} /><rect width="84" height="38" fill="url(#win)" /></g>
          <g transform="matrix(0.866 -0.5 0 1 610 442)"><rect width="126" height="38" fill={v.faceR} /><rect width="126" height="38" fill="url(#win)" /></g>
          <polygon points="610,442 537.3,400 646.4,337 719.1,379" fill={v.topFace} />

          <g>
            {TREES.map((tr) => (
              <g key={tr.x + '-' + tr.y}>
                <ellipse cx={tr.x} cy={tr.y} rx={tr.rx} ry={tr.ry} fill="#0B1422" opacity="0.18" />
                <circle cx={tr.x} cy={tr.y - tr.dy} r={tr.r} fill={v.tree} />
              </g>
            ))}
          </g>
          <rect width="820" height="660" fill="url(#rain)" opacity={rain ? 0.6 : 0} />
          <text x="24" y="650" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill={v.noteFill}>Isometric view, 30 degrees. Sample layout.</text>
        </svg>

        <div className="hero__controls">
          <div className="hero__readout">
            <span className="hero__time">{v.timeLabel}</span>
            <span className="hero__scene">{scene.title}</span>
          </div>
          <p className="hero__text">{scene.text}</p>
          <div>
            <label htmlFor="clock" className="hero__label">Time of day</label>
            <input
              id="clock"
              className="hero__range"
              type="range"
              min="0"
              max="23.5"
              step="0.5"
              value={hour}
              onChange={onHour}
              aria-valuetext={v.timeLabel}
            />
            <div className="hero__ticks"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span></div>
          </div>
          <div className="hero__row">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                className="btn toggle--night hero__btn"
                aria-pressed={scene.title === p.scene}
                onClick={() => setHour(p.h)}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="hero__row hero__row--center">
            <span className="hero__small">Weather</span>
            {WEATHER.map((w) => (
              <button
                key={w.label}
                type="button"
                className="btn toggle--night hero__btn"
                aria-pressed={rain === w.rain}
                onClick={() => setRain(w.rain)}
              >
                {w.label}
              </button>
            ))}
          </div>
          {rain && (
            <p className="hero__rain">Rain detected. Balcony doors lock, the terrace drains are monitored and the air-conditioning switches to dry mode.</p>
          )}
          <div className="hero__systems">
            <div className="hero__systems-title">Systems working at this hour</div>
            <div className="hero__row">
              {SYSTEMS.map((sy) => {
                const on = scene.on.includes(sy.k) || (sy.k === 'rain' && rain)
                return (
                  <span
                    key={sy.k}
                    className={on ? 'hero__chip hero__chip--on' : 'hero__chip'}
                    style={on ? { background: ACCENT, borderColor: ACCENT } : undefined}
                  >{sy.name}</span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
