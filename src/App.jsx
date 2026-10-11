
import { useState, useEffect, useRef } from 'react'
import Intro from './components/Intro.jsx'
import './App.css'
import logoFull from './assets/logo-full.png'

export default function App(){
  const [showIntro, setShowIntro] = useState(true)
  const [showSite, setShowSite] = useState(false)

  useEffect(()=>{
    if(!showIntro) {
      setTimeout(()=>setShowSite(true), 300)
    }
  },[showIntro])

  return (
    <>
      {showIntro && <Intro onFinish={()=>setShowIntro(false)} />}
      <div className={`site ${showSite ? 'visible' : ''}`}>
        <nav className="nav">
          <img src={logoFull} alt="Logoscript" className="nav-logo" />
          <div className="nav-links"><a href="#work">Work</a><a href="#lab">Lab</a><a href="#contact">Contacto</a></div>
        </nav>

        <section className="hero">
          <div className="bulb-bg" />
          <h1>Código que se convierte en<br/><span>negocio.</span></h1>
          <p>Desarrollamos webs que no solo se ven bien, venden.</p>
          <a href="#work" className="cta">Ver proyectos</a>
        </section>

        <section id="work" className="work">
          <h2><span>&lt;</span>Work <span>/&gt;</span></h2>
          <div className="grid">
            <div className="card"><div className="mock">E-Commerce</div><h3>E-Commerce Modular</h3><span>Desarrollo Web</span></div>
            <div className="card"><div className="mock">Landing</div><h3>Landing High-Conversion</h3><span>Diseño + Dev</span></div>
            <div className="card featured">
              <div className="badge">EN DESARROLLO • 70%</div>
              <div className="mock pos">POS Dashboard</div>
              <h3>POS Logoscript</h3>
              <p>Sistema de Punto de Venta offline-first, inventario inteligente.</p>
              <span>Sistema POS • React + Electron</span>
            </div>
          </div>
        </section>

        <section id="lab" className="lab">
          <div className="code-line"><span className="tag">&lt;Service&gt;</span> Desarrollo Web <span className="tag">&lt;/Service&gt;</span></div>
          <div className="code-line"><span className="tag">&lt;Service&gt;</span> Sistemas POS <span className="tag">&lt;/Service&gt;</span></div>
          <div className="code-line"><span className="tag">&lt;Service&gt;</span> Automatización <span className="tag">&lt;/Service&gt;</span></div>
        </section>

        <section className="manifesto">
          <h2>No usamos plantillas.<br/>Escribimos <span>Logoscripts.</span></h2>
        </section>

        <footer id="contact" className="footer">
          <div>
            <h3>¿Hablamos?</h3>
            <p>Lagos de Moreno, Jalisco, MX</p>
            <p>hola@logoscript.dev</p>
          </div>
          <form onSubmit={e=>e.preventDefault()} className="form">
            <input placeholder="Tu nombre" />
            <input placeholder="Tu email" />
            <textarea placeholder="Cuéntame tu idea"></textarea>
            <button>Enviar idea</button>
          </form>
        </footer>
      </div>
    </>
  )
}
