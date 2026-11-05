import { useState } from 'react'
import './AppMockup.css'

type LightsState = 'on' | 'dim' | 'off'
type SceneKey = 'morning' | 'leaving' | 'movie' | 'night' | 'custom'

interface SceneDef {
  k: Exclude<SceneKey, 'custom'>
  name: string
  say: string
  reply: string
  lights: LightsState
  temp: number
  locked: boolean
  armed: boolean
}

const SCENES: SceneDef[] = [
  { k: 'morning', name: 'Good morning', say: 'Hey Residence, good morning.', reply: 'Lights on, climate at 25°C, cameras off.', lights: 'on', temp: 25, locked: true, armed: false },
  { k: 'leaving', name: 'Leaving', say: 'Hey Residence, I am leaving.', reply: 'Lights off, climate in eco mode at 28°C, door locked, cameras armed.', lights: 'off', temp: 28, locked: true, armed: true },
  { k: 'movie', name: 'Movie time', say: 'Hey Residence, movie time.', reply: 'Lights dimmed, climate at 24°C, door locked.', lights: 'dim', temp: 24, locked: true, armed: true },
  { k: 'night', name: 'Good night', say: 'Hey Residence, good night.', reply: 'Lights off, climate at 26°C, door locked, cameras armed.', lights: 'off', temp: 26, locked: true, armed: true },
]

const LIGHTS_NEXT: Record<LightsState, LightsState> = { on: 'dim', dim: 'off', off: 'on' }
const LIGHTS_TEXT: Record<LightsState, string> = { on: 'On', dim: 'Dim', off: 'Off' }

export default function AppMockup() {
  const [scene, setScene] = useState<SceneKey>('morning')
  const [lights, setLights] = useState<LightsState>('on')
  const [temp, setTemp] = useState(25)
  const [locked, setLocked] = useState(true)
  const [armed, setArmed] = useState(false)
  const [voiceLine, setVoiceLine] = useState('“Hey Residence, good morning.”')
  const [voiceReply, setVoiceReply] = useState('Lights on, climate at 25°C, cameras off.')

  const pick = (sd: SceneDef) => {
    setScene(sd.k)
    setLights(sd.lights)
    setTemp(sd.temp)
    setLocked(sd.locked)
    setArmed(sd.armed)
    setVoiceLine('“' + sd.say + '”')
    setVoiceReply(sd.reply)
  }

  const manual = () => {
    setScene('custom')
    setVoiceLine('You tapped it in the app.')
    setVoiceReply('')
  }

  return (
    <section id="app" className="app">
      <div className="app__intro">
        <h2 className="h2">The whole apartment in your pocket.</h2>
        <p className="lead">Try it. Tap a scene, or say it out loud, and the lights, climate and door follow.</p>
        <div className="stack">
          {SCENES.map((sd) => (
            <button
              key={sd.k}
              type="button"
              className="btn toggle toggle--accent app__scene"
              aria-pressed={scene === sd.k}
              onClick={() => pick(sd)}
            >
              {sd.name}
            </button>
          ))}
        </div>
      </div>
      <div className="app__phone-wrap">
        <div className="app__phone">
          <div className="app__screen">
            <div>
              <div className="app__unit">Tower B, Unit 401</div>
              <div className="app__greeting">Good to see you.</div>
            </div>
            <div className="app__voice" aria-live="polite">
              <div className="app__voice-label">You said</div>
              <div>{voiceLine}</div>
              <div className="app__voice-reply">{voiceReply}</div>
            </div>
            <div className="app__cards">
              <div className="app__card">
                <div className="app__card-label">Lights</div>
                <div className="app__card-value">{LIGHTS_TEXT[lights]}</div>
                <button
                  type="button"
                  className="app__act"
                  onClick={() => {
                    manual()
                    setLights(LIGHTS_NEXT[lights])
                  }}
                >
                  Change
                </button>
              </div>
              <div className="app__card">
                <div className="app__card-label">Climate</div>
                <div className="app__card-value">{temp}&deg;C</div>
                <div className="app__pair">
                  <button
                    type="button"
                    className="app__act app__act--big"
                    aria-label="Lower temperature"
                    onClick={() => {
                      manual()
                      setTemp(Math.max(18, temp - 1))
                    }}
                  >
                    &minus;
                  </button>
                  <button
                    type="button"
                    className="app__act app__act--big"
                    aria-label="Raise temperature"
                    onClick={() => {
                      manual()
                      setTemp(Math.min(30, temp + 1))
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="app__card">
                <div className="app__card-label">Front door</div>
                <div className="app__card-value">{locked ? 'Locked' : 'Unlocked'}</div>
                <button
                  type="button"
                  className="app__act"
                  aria-pressed={locked}
                  onClick={() => {
                    manual()
                    setLocked(!locked)
                  }}
                >
                  {locked ? 'Unlock' : 'Lock'}
                </button>
              </div>
              <div className="app__card">
                <div className="app__card-label">Cameras</div>
                <div className="app__card-value">{armed ? 'Armed' : 'Off'}</div>
                <button
                  type="button"
                  className="app__act"
                  aria-pressed={armed}
                  onClick={() => {
                    manual()
                    setArmed(!armed)
                  }}
                >
                  {armed ? 'Turn off' : 'Arm'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
