import { useState } from 'react'
import { useSite } from '../store'
import './Units.css'

type UnitType = '2br' | '3br' | 'ph'
type UnitFilter = 'all' | UnitType
type UnitStatus = 'available' | 'reserved' | 'sold' | 'held'

interface Unit {
  code: string
  floor: number
  idx: number
  type: UnitType
  col: number
  span: number
}

const TYPE_NAME: Record<UnitType, string> = {
  '2br': 'Essential 2-bedroom',
  '3br': 'Premium 3-bedroom',
  ph: 'Presidential penthouse',
}
const TYPE_SHORT: Record<UnitType, string> = { '2br': '2BR', '3br': '3BR', ph: 'Penthouse' }
const STATUS_LABEL: Record<UnitStatus, string> = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
  held: 'Held by you',
}

// SAMPLE: placeholder prices in IDR per unit type, not real pricing.
const SAMPLE_PRICE: Record<UnitType, number> = { '2br': 1_200_000_000, '3br': 1_800_000_000, ph: 3_500_000_000 }
// SAMPLE: placeholder availability. Connect real stock before launch.
const SAMPLE_SOLD = ['101', '103', '202', '301', '402', '503', '601']
const SAMPLE_RESERVED = ['102', '204', '302', '403', '504', '603', '701']

const FILTERS: { k: UnitFilter; label: string }[] = [
  { k: 'all', label: 'All' },
  { k: '2br', label: '2-bedroom' },
  { k: '3br', label: '3-bedroom' },
  { k: 'ph', label: 'Penthouse' },
]

const FLOORS_TOP_DOWN = [7, 6, 5, 4, 3, 2, 1]

function buildUnits(): Unit[] {
  const list: Unit[] = []
  for (let f = 1; f <= 6; f++) {
    for (let i = 0; i < 4; i++) {
      list.push({ code: String(f * 100 + i + 1), floor: f, idx: i, type: f <= 3 ? '2br' : '3br', col: 2 + i, span: 1 })
    }
  }
  list.push({ code: '701', floor: 7, idx: 0, type: 'ph', col: 2, span: 2 })
  list.push({ code: '702', floor: 7, idx: 1, type: 'ph', col: 4, span: 2 })
  return list
}

const UNIT_LIST = buildUnits()

function facesOf(u: Unit): string {
  if (u.type === 'ph') return u.idx === 0 ? 'East and north' : 'West and south'
  return u.idx < 2 ? 'East, morning sun' : 'West, afternoon sun'
}

export default function Units() {
  const { setPrice } = useSite()
  const [filter, setFilter] = useState<UnitFilter>('all')
  const [selected, setSelected] = useState('401')
  const [held, setHeld] = useState<Record<string, true>>({})

  const statusOf = (code: string): UnitStatus => {
    if (held[code]) return 'held'
    if (SAMPLE_SOLD.includes(code)) return 'sold'
    if (SAMPLE_RESERVED.includes(code)) return 'reserved'
    return 'available'
  }

  const sel = UNIT_LIST.find((u) => u.code === selected) ?? UNIT_LIST[0]
  const selStatus = statusOf(sel.code)
  const reserveDisabled = selStatus === 'reserved' || selStatus === 'sold'
  const reserveLabel =
    selStatus === 'available' ? 'Reserve this unit' : selStatus === 'held' ? 'Release hold' : 'Not available'

  const reserve = () => {
    if (selStatus === 'available') {
      setHeld((h) => ({ ...h, [sel.code]: true }))
    } else if (selStatus === 'held') {
      setHeld((h) => {
        const next = { ...h }
        delete next[sel.code]
        return next
      })
    }
  }

  return (
    <section id="units" className="container units row">
      <div className="units__main">
        <h2 className="h2">Choose your unit.</h2>
        <p className="units__lead">Tower B at a glance. Filter by type, then pick a unit to see its floor, orientation and status.</p>
        <div className="chips units__filters">
          {FILTERS.map((f) => (
            <button
              key={f.k}
              type="button"
              className="btn toggle units__filter"
              aria-pressed={filter === f.k}
              onClick={() => setFilter(f.k)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="units__grid">
          {FLOORS_TOP_DOWN.map((f) => (
            <div key={f} className="units__label" style={{ gridRow: 8 - f }}>
              {'Floor ' + f}
            </div>
          ))}
          {UNIT_LIST.map((u) => {
            const st = statusOf(u.code)
            const isSel = selected === u.code
            const show = filter === 'all' || filter === u.type
            const cls = [
              'units__cell',
              `units__cell--${st}`,
              isSel ? 'units__cell--selected' : '',
              show ? '' : 'units__cell--dim',
            ]
              .filter(Boolean)
              .join(' ')
            return (
              <button
                key={u.code}
                type="button"
                className={cls}
                aria-pressed={isSel}
                style={{ gridRow: 8 - u.floor, gridColumn: `${u.col} / span ${u.span}` }}
                onClick={() => setSelected(u.code)}
              >
                <span className="units__code">{u.code + ' ' + TYPE_SHORT[u.type]}</span>
                <span className="units__status">{STATUS_LABEL[st]}</span>
              </button>
            )
          })}
        </div>
        <p className="note" style={{ marginTop: 16 }}>Sample availability for demonstration. Connect real stock before launch.</p>
      </div>

      <div className="sheet units__panel">
        <h3 className="h3 units__panel-title">Unit {sel.code}</h3>
        <dl className="units__dl">
          <dt>Type</dt><dd>{TYPE_NAME[sel.type]}</dd>
          <dt>Floor</dt><dd>{sel.floor === 7 ? 'Top floor' : 'Floor ' + sel.floor}</dd>
          <dt>Faces</dt><dd>{facesOf(sel)}</dd>
          <dt>Status</dt><dd>{STATUS_LABEL[selStatus]}</dd>
          <dt>Size</dt><dd className="units__mono">[SIZE] m2</dd>
          <dt>Price</dt><dd className="units__mono">[PRICE]</dd>
        </dl>
        <div className="units__actions">
          <button type="button" className="btn btn--accent" disabled={reserveDisabled} onClick={reserve}>
            {reserveLabel}
          </button>
          <a href="#payment" className="btn" onClick={() => setPrice(SAMPLE_PRICE[sel.type])}>
            Calculate payment
          </a>
        </div>
      </div>
    </section>
  )
}
