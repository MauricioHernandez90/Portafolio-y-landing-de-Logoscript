
import { useState, useEffect, useRef } from 'react'
import './Intro.css'
import logoIcon from '../assets/logo-icon.png'
import logoFull from '../assets/logo-full.png'

export default function Intro({ onFinish }){
  const [phase, setPhase] = useState('fadeIn') // fadeIn, loading, shake, explode, bulb
  const [progress, setProgress] = useState(0)
  const [particles, setParticles] = useState([])
  const canvasRef = useRef(null)

  // Loading progress = pressure
  useEffect(()=>{
    if(phase==='fadeIn'){
      const t = setTimeout(()=>setPhase('loading'), 1200)
      return ()=>clearTimeout(t)
    }
    if(phase==='loading'){
      const interval = setInterval(()=>{
        setProgress(p=>{
          const next = p + (Math.random()*3 + 1.2)
          if(next>=100){ clearInterval(interval); setPhase('shake'); return 100 }
          return next
        })
      }, 60)
      return ()=>clearInterval(interval)
    }
    if(phase==='shake'){
      const t = setTimeout(()=>{
        // create particles
        const parts = []
        for(let i=0;i<1200;i++){
          parts.push({
            x:0, y:0,
            vx:(Math.random()-0.5)*18,
            vy:(Math.random()-0.5)*18,
            size: Math.random()*5+2,
            color: Math.random()>0.5 ? '#FDB913' : '#ffffff',
            life:1
          })
        }
        setParticles(parts)
        setPhase('explode')
      }, 1800)
      return ()=>clearTimeout(t)
    }
    if(phase==='explode'){
      const t = setTimeout(()=>setPhase('bulb'), 800)
      return ()=>clearTimeout(t)
    }
    if(phase==='bulb'){
      const t = setTimeout(()=>{ onFinish() }, 5500)
      return ()=>clearTimeout(t)
    }
  },[phase])

  // Particle canvas animation
  useEffect(()=>{
    if(phase!=='explode' || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let animParts = particles.map(p=>({...p, x: canvas.width/2, y: canvas.height/2}))
    let raf
    const draw = ()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height)
      animParts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy; p.vx*=0.98; p.vy*=0.98; p.life-=0.012
        ctx.globalAlpha = Math.max(0,p.life)
        ctx.fillStyle = p.color
        ctx.fillRect(p.x,p.y,p.size,p.size)
      })
      animParts = animParts.filter(p=>p.life>0)
      if(animParts.length>0) raf = requestAnimationFrame(draw)
    }
    draw()
    return ()=>cancelAnimationFrame(raf)
  },[phase, particles])

  const shakeIntensity = progress < 40 ? 0 : progress < 70 ? 2 : progress < 90 ? 6 : 12
  const glowOpacity = progress/100 * 0.35
  const glowScale = 0.5 + (progress/100)*2

  return (
    <div className="intro">
      {phase!=='bulb' && phase!=='explode' && (
        <>
          <div className="glow" style={{opacity: glowOpacity, transform:`translate(-50%,-50%) scale(${glowScale})`}} />
          <img 
            src={progress<85 ? logoFull : logoIcon} 
            className={`intro-logo ${phase==='shake' ? 'shaking' : ''}`}
            style={{ '--shake': `${shakeIntensity}px` }}
            alt="Logoscript"
          />
          {phase!=='fadeIn' && (
            <div className="bar-wrap">
              <div className="bar-track">
                <div className="bar-fill" style={{width:`${progress}%`}}>
                  <div className="bar-dot" />
                </div>
              </div>
              <div className="bar-label">ACUMULANDO IDEAS... {Math.round(progress)}%</div>
            </div>
          )}
        </>
      )}

      {phase==='explode' && (
        <>
          <div className="flash" />
          <canvas ref={canvasRef} className="particles" />
        </>
      )}

      {phase==='bulb' && (
        <div className="bulb-phase">
          <div className="bulb-container">
            <svg width="320" height="520" viewBox="0 0 200 320" className="bulb-svg">
              <defs>
                <filter id="glow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <radialGradient id="innerGlow"><stop offset="0%" stopColor="#FDB913" stopOpacity="0.9"/><stop offset="100%" stopColor="#FDB913" stopOpacity="0"/></radialGradient>
              </defs>
              {/* Bulb outline */}
              <path d="M100 20 C 40 20, 15 70, 35 115 C 45 135, 60 150, 60 180 L 60 210 L 140 210 L 140 180 C 140 150, 155 135, 165 115 C 185 70, 160 20, 100 20 Z" 
                fill="none" stroke="#FDB913" strokeWidth="3" filter="url(#glow)" className="bulb-outline"/>
              {/* Inner glow */}
              <ellipse cx="100" cy="110" rx="55" ry="70" fill="url(#innerGlow)" opacity="0.6" />
              {/* Filament trembling */}
              <g className="filament">
                <path d="M70 125 L78 105 L86 125 L94 105 L102 125 L110 105 L118 125 L126 105 L134 125" fill="none" stroke="#FFD60A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="70" y1="125" x2="70" y2="165" stroke="#FFD60A" strokeWidth="1.5"/>
                <line x1="134" y1="125" x2="134" y2="165" stroke="#FFD60A" strokeWidth="1.5"/>
                <circle cx="102" cy="113" r="6" fill="white" className="filament-dot" />
              </g>
              {/* Base */}
              <g>
                <rect x="60" y="212" width="80" height="12" rx="4" fill="#2a2a2a" stroke="#444" strokeWidth="1"/>
                <rect x="60" y="228" width="80" height="12" rx="4" fill="#2a2a2a" stroke="#444" strokeWidth="1"/>
                <rect x="60" y="244" width="80" height="12" rx="4" fill="#2a2a2a" stroke="#444" strokeWidth="1"/>
                <path d="M75 260 Q100 275, 125 260" fill="none" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round"/>
              </g>
            </svg>
            <div className="bulb-halo" />
            <p className="bulb-text">DETRÁS DE CADA<br/><span>SCRIPT, UNA IDEA.</span></p>
          </div>
        </div>
      )}
    </div>
  )
}
