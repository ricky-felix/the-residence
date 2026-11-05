import { useState } from 'react'
import { useSite } from '../store'
import { formatRupiah } from '../lib/format'
import './Payment.css'

// SAMPLE: preset prices for the three residence types.
const PRICE_PRESETS = [
  { label: '2-bedroom', value: 1_200_000_000 },
  { label: '3-bedroom', value: 1_800_000_000 },
  { label: 'Penthouse', value: 3_500_000_000 },
]
const YEARS = [5, 10, 15, 20]
const INTEREST_COLOR = '#6C92A6'

export default function Payment() {
  const { price, setPrice } = useSite()
  const [dp, setDp] = useState(20)
  const [years, setYears] = useState(15)
  const [rate, setRate] = useState(7.5)

  const dpAmt = (price * dp) / 100
  const loan = price - dpAmt
  const nMonths = years * 12
  const mr = rate / 1200
  const monthly = mr === 0 ? loan / nMonths : (loan * mr) / (1 - Math.pow(1 + mr, -nMonths))
  const totalPay = monthly * nMonths
  const interest = totalPay - loan
  const principalPct = ((loan / totalPay) * 100).toFixed(1) + '%'
  const interestPct = ((interest / totalPay) * 100).toFixed(1) + '%'

  return (
    <section id="payment" className="band--paper payment">
      <div className="container section-pad row payment__row">
        <div className="payment__controls">
          <h2 className="h2">What it costs each month.</h2>
          <p className="payment__lead">Set a price, a down payment and a loan term. The numbers update as you move.</p>
          <div className="payment__fields">
            <div>
              <div className="payment__label-row">
                <label htmlFor="c-price" className="payment__label">Property price</label>
                <span className="mono payment__value">{formatRupiah(price)}</span>
              </div>
              <input
                id="c-price"
                className="payment__range"
                type="range"
                min={500_000_000}
                max={5_000_000_000}
                step={50_000_000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <div className="chips payment__presets">
                {PRICE_PRESETS.map((p) => (
                  <button key={p.label} type="button" className="btn payment__preset" onClick={() => setPrice(p.value)}>
                    Sample {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="payment__label-row">
                <label htmlFor="c-dp" className="payment__label">Down payment</label>
                <span className="mono payment__value">{dp}% ({formatRupiah(dpAmt)})</span>
              </div>
              <input
                id="c-dp"
                className="payment__range"
                type="range"
                min={10}
                max={50}
                step={5}
                value={dp}
                onChange={(e) => setDp(Number(e.target.value))}
              />
            </div>
            <div>
              <div className="payment__label payment__label--block">Loan term</div>
              <div className="chips">
                {YEARS.map((y) => (
                  <button
                    key={y}
                    type="button"
                    className="btn toggle"
                    aria-pressed={years === y}
                    onClick={() => setYears(y)}
                  >
                    {y} years
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="payment__label-row">
                <label htmlFor="c-rate" className="payment__label">Interest rate</label>
                <span className="mono payment__value">{rate.toFixed(2)}% a year</span>
              </div>
              <input
                id="c-rate"
                className="payment__range"
                type="range"
                min={4}
                max={12}
                step={0.25}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="payment__card">
          <div className="payment__muted">Monthly instalment</div>
          <div className="payment__monthly">{formatRupiah(monthly)}</div>
          <div className="payment__muted payment__muted--tight">
            {years} years at {rate.toFixed(2)}%
          </div>
          <div
            role="img"
            aria-label="Share of total repayment that is principal and interest"
            className="payment__bar"
          >
            <div style={{ width: principalPct, background: 'var(--accent)' }} />
            <div style={{ width: interestPct, background: INTEREST_COLOR }} />
          </div>
          <div className="payment__legend">
            <span className="payment__legend-item">
              <span className="payment__swatch" style={{ background: 'var(--accent)' }} />
              Principal
            </span>
            <span className="payment__legend-item">
              <span className="payment__swatch" style={{ background: INTEREST_COLOR }} />
              Interest
            </span>
          </div>
          <dl className="payment__results">
            <dt>Down payment</dt>
            <dd className="mono">{formatRupiah(dpAmt)}</dd>
            <dt>Loan amount</dt>
            <dd className="mono">{formatRupiah(loan)}</dd>
            <dt>Total interest</dt>
            <dd className="mono">{formatRupiah(interest)}</dd>
            <dt>Total repayment</dt>
            <dd className="mono">{formatRupiah(totalPay)}</dd>
          </dl>
          <p className="payment__disclaimer">Sample figures for demonstration. Replace with real pricing and bank rates.</p>
        </div>
      </div>
    </section>
  )
}
