import { useState } from 'react'
import './ContactForm.css'

const PHONE = '523350517068'
const initialForm = { nombre: '', email: '', mensaje: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const validate = () => {
    const validationErrors = {}
    if (!form.nombre.trim() || form.nombre.trim().length < 2) {
      validationErrors.nombre = 'Dime cómo te llamas'
    }
    if (!form.mensaje.trim() || form.mensaje.trim().length < 10) {
      validationErrors.mensaje = 'Cuéntame un poco más (mínimo 10 caracteres)'
    }
    if (form.email && !emailPattern.test(form.email)) {
      validationErrors.email = 'Ese email no se ve bien'
    }
    return validationErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
    if (errors[name]) {
      setErrors(current => {
        const nextErrors = { ...current }
        delete nextErrors[name]
        return nextErrors
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('sending')
    setErrors({})

    const message = [
      `Hola Logoscript, soy ${form.nombre}.`,
      form.email ? `Mi email: ${form.email}` : null,
      '',
      form.mensaje,
    ].filter(Boolean).join('\n')
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`

    window.open(url, '_blank', 'noopener,noreferrer')
    setTimeout(() => {
      setStatus('success')
      setForm(initialForm)
      setTimeout(() => setStatus('idle'), 4000)
    }, 400)
  }

  return (
    <form onSubmit={handleSubmit} className="form" noValidate>
      <div className="form-field">
        <label htmlFor="nombre" className="sr-only">Tu nombre</label>
        <input
          id="nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Tu nombre"
          aria-invalid={!!errors.nombre}
        />
        {errors.nombre && <span className="form-error">{errors.nombre}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="email" className="sr-only">Tu email (opcional)</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Tu email (opcional)"
          aria-invalid={!!errors.email}
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="mensaje" className="sr-only">Cuéntame tu idea</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          value={form.mensaje}
          onChange={handleChange}
          placeholder="Cuéntame tu idea"
          aria-invalid={!!errors.mensaje}
        />
        {errors.mensaje && <span className="form-error">{errors.mensaje}</span>}
      </div>

      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Abriendo WhatsApp...' : 'Enviar por WhatsApp'}
      </button>
      {status === 'success' && (
        <p className="form-success">
          ¡Listo! Se abrió WhatsApp con tu mensaje. Solo dale enviar.
        </p>
      )}
    </form>
  )
}