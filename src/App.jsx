
import { useState, useEffect } from 'react'
import Intro from './components/Intro.jsx'
import ContactForm from './components/ContactForm.jsx'
import './App.css'
import logoFull from './assets/logo-full.png'

export default function App(){
  const [showIntro, setShowIntro] = useState(true)
  const [showSite, setShowSite] = useState(false)

  useEffect(()=>{
    if(!showIntro) {
      const timerId = setTimeout(()=>setShowSite(true), 300)
      return ()=>clearTimeout(timerId)
    }
  },[showIntro])

  return (
    <>
      {showIntro && <Intro onFinish={()=>setShowIntro(false)} />}
      <div className={`site ${showSite ? 'visible' : ''}`}>
        <nav className="nav">
          <img src={logoFull} alt="Logoscript" className="nav-logo" />
          <div className="nav-links"><a href="#work">Work</a><a href="#servicios">Servicios</a><a href="#valores">Valores</a><a href="#contact">Contacto</a></div>
        </nav>

        <section className="hero">
          <div className="bulb-bg" />
          <h1>Ordena tu negocio.<br/><span>Libera tu tiempo.</span></h1>
          <p>Toda gran obra empieza con una palabra. Tomamos lo que tienes en la cabeza y lo convertimos en un sistema que funciona.</p>
          <a href="#contact" className="cta">Hablemos de tu idea</a>
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

        <section id="servicios" className="servicios">
          <div className="services-grid">
            <article className="service-card">
              <span className="service-tag">Negocios</span>
              <h3>Para tu negocio</h3>
              <p>Procesos claros, herramientas a la medida y sistemas que trabajan por ti. Deja de apagar fuegos y vuelve a dirigir tu empresa.</p>
            </article>
            <article className="service-card">
              <span className="service-tag">Creativos</span>
              <h3>Para creadores</h3>
              <p>Damos vida a proyectos de artistas, cantantes e influencers. Tu visión, ejecutada con precisión técnica.</p>
            </article>
            <article className="service-card">
              <span className="service-tag">Apps</span>
              <h3>Para problemas reales</h3>
              <p>Desarrollamos aplicaciones que resuelven necesidades concretas de las personas. Tecnología con propósito.</p>
            </article>
          </div>
        </section>

        <section className="manifesto">
          <p className="eyebrow">Nuestra forma de trabajar</p>
          <h2>Toda gran obra empieza<br/>con una <span>palabra.</span></h2>
          <p className="manifesto-body">
            Una idea clara que se ordena, se escribe y se ejecuta.
            Tomamos lo que tienes en la cabeza y lo convertimos en un sistema que funciona.
          </p>
        </section>

        <section className="vision">
          <h2>Hacia dónde <span>vamos</span></h2>
          <p>
            Queremos ser una empresa que construye con propósito.
            Que cada proyecto cuide lo que importa: la familia, la integridad
            y el tiempo de quien emprende. Nuestra meta es la libertad del emprendedor:
            que su negocio funcione con orden y que su vida no dependa de él.
          </p>
        </section>

        <section id="valores" className="valores">
          <h2>Lo que nos <span>mueve</span></h2>
          <div className="valores-grid">
            <div className="valor"><h3>Familia primero.</h3></div>
            <div className="valor"><h3>Orden que libera.</h3></div>
            <div className="valor"><h3>Soluciones a la medida, no plantillas.</h3></div>
            <div className="valor"><h3>Palabra cumplida: lo que se dice, se ejecuta.</h3></div>
          </div>
        </section>

        <footer id="contact" className="footer">
          <div>
            <h3>¿Hablamos?</h3>
            <p>Lagos de Moreno, Jalisco, MX</p>
            <p>hola@logoscript.dev</p>
          </div>
          <ContactForm />
        </footer>
      </div>
    </>
  )
}
