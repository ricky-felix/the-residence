import { useState } from 'react'
import type { FormEvent } from 'react'
import './Ask.css'

interface ChatMessage {
  from: 'bot' | 'user'
  text: string
}

const SUGGESTIONS = [
  'What unit types are there?',
  'How do payments work?',
  'Where is it?',
  'What amenities are there?',
  'Is it pet friendly?',
]

// SAMPLE: scripted replies
function answer(q: string): string {
  const t = q.toLowerCase()
  if (/(price|payment|kpr|mortgage|instal|loan|down pay|cost)/.test(t)) return 'The payment calculator on this page turns a price, down payment, loan term and interest rate into a monthly instalment. Final pricing and payment schemes will be confirmed by the sales team.'
  if (/(amenit|gym|fitness|clubhouse|cowork|co-work|playground|charging)/.test(t)) return "Residents get a modern clubhouse with a fitness centre and lounge, co-working spaces with fibre internet, a children's playground and EV charging stations."
  if (/(smart|voice|climate|security|lighting|energy|automation)/.test(t)) return 'Every residence is a smart home: voice control, climate, security, energy management, ambient lighting and integrated entertainment. Try the app in the phone mockup above.'
  if (/(where|location|address|map|near|airport|mall|hospital|school|distance)/.test(t)) return 'The Residence is at [ADDRESS]. The location map above shows shopping, health, education and transport around it.'
  if (/(type|bedroom|2br|3br|penthouse|unit|size|floor|apartment)/.test(t)) return 'There are three residence types: Essential 2-bedroom, Premium 3-bedroom and Presidential penthouses. Pick a unit in the unit picker to see its floor, orientation and status.'
  if (/(visit|viewing|book|tour|appointment|contact|phone|email|whatsapp|call)/.test(t)) return 'You can request a viewing in the form below, email [EMAIL] or call XX-XXXX.'
  if (/(pet|dog|cat|rent|handover|complet|ready|maintenance|service charge)/.test(t)) return 'That detail is still to be confirmed. Leave a viewing request and the sales team will answer it.'
  return 'I can answer questions about the residences, payment, location, amenities and the smart home. For anything else, the sales team can help on XX-XXXX.'
}

export default function Ask() {
  const [chat, setChat] = useState<ChatMessage[]>([
    { from: 'bot', text: 'Hello. I can answer questions about the residences, payment, location, amenities and the smart home.' },
  ])
  const [draft, setDraft] = useState('')

  const ask = (q: string) => {
    setChat((c) => [...c, { from: 'user', text: q }, { from: 'bot', text: answer(q) }])
    setDraft('')
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = draft.trim()
    if (q) ask(q)
  }

  return (
    <section id="ask" className="ask">
      <div className="ask__intro">
        <h2 className="h2">Ask The Residence.</h2>
        <p className="lead ask__lead">A concierge that answers questions about the residences, payment, location and the smart home. This is a scripted demo.</p>
        <div className="stack">
          {SUGGESTIONS.map((q) => (
            <button key={q} type="button" className="btn ask__sugg" onClick={() => ask(q)}>
              {q}
            </button>
          ))}
        </div>
      </div>
      <div className="ask__chat">
        <div className="ask__head">Concierge</div>
        <div className="ask__log" role="log" aria-live="polite">
          {chat
            .slice()
            .reverse()
            .map((m, i) => (
              <div key={chat.length - i} className={'ask__msg ask__msg--' + m.from}>
                {m.text}
              </div>
            ))}
        </div>
        <form className="ask__form" onSubmit={onSubmit}>
          <label htmlFor="ask-q" className="sr-only">Your question</label>
          <input
            id="ask-q"
            type="text"
            className="field ask__input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask about units, payment or location"
            autoComplete="off"
          />
          <button type="submit" className="btn btn--accent ask__send">Send</button>
        </form>
      </div>
    </section>
  )
}
