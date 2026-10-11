
import { useState, useEffect } from 'react'
import Intro from './components/Intro.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
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
          <div className="nav-links"><a href="#servicios">Servicios</a><a href="#valores">Valores</a><a href="#contact">Contacto</a></div>
        </nav>

        <section className="hero">
          <div className="bulb-bg" />
          <h1>Ordena tu negocio.<br/><span>Libera tu tiempo.</span></h1>
          <p>Toda gran obra empieza con una palabra. Tomamos lo que tienes en la cabeza y lo convertimos en un sistema que funciona — para tu negocio, tu proyecto creativo o esa idea que no te deja dormir.</p>
          <a href="#contact" className="cta">Hablemos de tu idea</a>
        </section>

        <section className="manifesto">
          <p className="eyebrow">Nuestra forma de trabajar</p>
          <h2>Toda gran obra empieza<br/>con una <span>palabra.</span></h2>
        </section>

        <section id="servicios" className="servicios">
          <div className="services-header">
            <p className="eyebrow">Qué hacemos</p>
            <h2>Soluciones para <span>cada etapa.</span></h2>
          </div>
          <div className="services-grid">
            <article className="service-card">
              <span className="service-tag">Negocios</span>
              <h3>Para tu negocio</h3>
              <p>Procesos claros, herramientas a la medida y sistemas que trabajan por ti. Deja de apagar fuegos y vuelve a dirigir tu empresa.</p>
            </article>
            <article className="service-card">
              <span className="service-tag">Creadores</span>
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
          <div className="valores-header">
            <p className="eyebrow">Lo que nos mueve</p>
            <h2>Cuatro principios, <span>una forma de trabajar.</span></h2>
          </div>
          <div className="valores-grid">
            <div className="valor">
              <span className="valor-num">01</span>
              <h3>Familia primero.</h3>
              <p>Cada decisión que tomamos cuida a las personas que confían en nosotros.</p>
            </div>
            <div className="valor">
              <span className="valor-num">02</span>
              <h3>Orden que libera.</h3>
              <p>Un negocio ordenado es un negocio que no depende de ti para funcionar.</p>
            </div>
            <div className="valor">
              <span className="valor-num">03</span>
              <h3>Soluciones a la medida, no plantillas.</h3>
              <p>Cada proyecto se diseña desde cero para resolver lo que realmente necesitas.</p>
            </div>
            <div className="valor">
              <span className="valor-num">04</span>
              <h3>Palabra cumplida.</h3>
              <p>Lo que se dice, se ejecuta. Sin excusas, sin letras chiquitas.</p>
            </div>
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
        <WhatsAppButton />
      </div>
    </>
  )
}
