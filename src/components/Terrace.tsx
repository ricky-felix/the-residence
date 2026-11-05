import './Terrace.css'

export default function Terrace() {
  return (
    <section id="terrace" className="band--paper">
      <div className="container terrace">
        <div className="col-text">
          <h2 className="h2">Medan's rain tests every roof.</h2>
          <p className="terrace__lead">
            Heavy rain and constant humidity are why we draw the terrace build-up in full. Every layer between the
            penthouse terrace and the ceiling below is shown, instead of hidden under a render.
          </p>
          <p className="terrace__note">Typical build-up, drawn for illustration. Final specification to be confirmed.</p>
        </div>
        <div className="col-wide">
          <svg
            viewBox="0 0 700 300"
            role="img"
            aria-label="Section through the penthouse terrace showing, from top to bottom, tile finish, screed, waterproofing membrane, thermal insulation, concrete slab and ceiling"
            className="terrace__drawing"
          >
            <defs>
              <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <path d="M0 0V8" stroke="#6F777F" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="70" y="166" width="370" height="70" fill="#B3B8BD" />
            <rect x="70" y="166" width="370" height="70" fill="url(#hatch)" stroke="#13284A" strokeWidth="1.5" />
            <rect x="70" y="20" width="24" height="146" fill="#B3B8BD" />
            <rect x="70" y="20" width="24" height="146" fill="url(#hatch)" stroke="#13284A" strokeWidth="1.5" />
            <rect x="70" y="236" width="370" height="10" fill="#F6F7F4" stroke="#13284A" strokeWidth="1.5" />
            <rect x="102" y="116" width="338" height="50" fill="#E3D7B0" stroke="#13284A" strokeWidth="1" />
            <rect x="102" y="64" width="338" height="44" fill="#C7CCC5" stroke="#13284A" strokeWidth="1" />
            <rect x="102" y="44" width="338" height="20" fill="#DDE0DA" stroke="#13284A" strokeWidth="1" />
            <path d="M142 44V64M182 44V64M222 44V64M262 44V64M302 44V64M342 44V64M382 44V64M422 44V64" fill="none" stroke="#9AA19A" strokeWidth="1" />
            <path d="M440 112H98V44" fill="none" stroke="#245B63" strokeWidth="8" />
            <g fill="none" stroke="#13284A" strokeWidth="1">
              <path d="M440 54H456M440 86H456M440 112H456M440 141H456M440 201H456M440 241H456" />
            </g>
            <g fontFamily="IBM Plex Sans, sans-serif" fontSize="14" fill="#13284A">
              <text x="464" y="59">Tile or stone finish</text>
              <text x="464" y="91">Screed laid to falls</text>
              <text x="464" y="108">Waterproofing membrane,</text>
              <text x="464" y="125">turned up the parapet</text>
              <text x="464" y="146">Thermal insulation</text>
              <text x="464" y="206">Reinforced concrete slab</text>
              <text x="464" y="246">Ceiling of the apartment below</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
