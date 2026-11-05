import './Nav.css'

const LINKS = [
  { href: '#app', label: 'App' },
  { href: '#siteplan', label: 'Site plan' },
  { href: '#units', label: 'Units' },
  { href: '#payment', label: 'Payment' },
  { href: '#location', label: 'Location' },
  { href: '#ask', label: 'Ask' },
]

export default function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="nav__brand">
        The Residence<span className="nav__tag">2.0</span>
      </a>
      <nav aria-label="Main" className="nav__links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="nav__link">
            {l.label}
          </a>
        ))}
        <a href="#visit" className="nav__cta">
          Book a viewing
        </a>
      </nav>
    </header>
  )
}
