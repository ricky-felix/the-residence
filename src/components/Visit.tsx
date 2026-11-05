import { useState } from 'react'
import type { FormEvent } from 'react'
import './Visit.css'

const RESIDENCE_TYPES = [
  { id: '2br', label: '2-bedroom' },
  { id: '3br', label: '3-bedroom' },
  { id: 'ph', label: 'Penthouse' },
]

export default function Visit() {
  const [unit, setUnit] = useState('3br')
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="visit" className="band--ink visit">
      <div className="container section-pad visit__row">
        <div className="visit__info">
          <h2 className="visit__heading">Visit the sales gallery.</h2>
          <p className="visit__lead">
            Tell us which residence you want to see and we will arrange a private viewing. Handover: [DATE].
          </p>
          <div className="visit__details">
            <div>
              <div className="visit__label">Email</div>
              <div>[EMAIL]</div>
            </div>
            <div>
              <div className="visit__label">Phone</div>
              <div>XX-XXXX</div>
            </div>
            <div>
              <div className="visit__label">WhatsApp</div>
              <div>XX-XXXX</div>
            </div>
            <div>
              <div className="visit__label">Address</div>
              <div>[ADDRESS]</div>
            </div>
          </div>
        </div>

        <div className="visit__panel">
          {sent ? (
            <div role="status">
              <h3 className="visit__thanks">Viewing requested.</h3>
              <p className="visit__thanks-text">The sales team will contact you to confirm a time.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="visit__form">
              <div className="stack">
                <label htmlFor="f-name" className="visit__field-label">Full name</label>
                <input id="f-name" className="field" type="text" autoComplete="name" required />
              </div>
              <div className="stack">
                <label htmlFor="f-phone" className="visit__field-label">Phone or WhatsApp</label>
                <input id="f-phone" className="field" type="tel" autoComplete="tel" required />
              </div>
              <div>
                <div className="visit__field-label visit__field-label--block">Residence type</div>
                <div className="chips">
                  {RESIDENCE_TYPES.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      className="btn toggle"
                      aria-pressed={unit === u.id}
                      onClick={() => setUnit(u.id)}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn btn--accent visit__submit">
                Request a viewing
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
