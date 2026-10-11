import { useState } from 'react'

const initialValues = { name: '', email: '', message: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  function handleChange(event) {
    const { name, value } = event.target
    setValues(current => ({ ...current, [name]: value }))
    if (errors[name]) {
      setErrors(current => ({ ...current, [name]: '' }))
    }
  }

  function validate() {
    const nextErrors = {}
    const name = values.name.trim()
    const email = values.email.trim()
    const message = values.message.trim()

    if (name.length < 2) {
      nextErrors.name = 'Escribe tu nombre (mínimo 2 caracteres).'
    }
    if (!email) {
      nextErrors.email = 'El email es obligatorio.'
    } else if (!emailPattern.test(email)) {
      nextErrors.email = 'Escribe un email válido.'
    }
    if (message.length < 10) {
      nextErrors.message = 'Cuéntame tu idea (mínimo 10 caracteres).'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('idle')
    if (!validate()) return

    setStatus('sending')
    try {
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        if (!response.ok) throw new Error('Contact request failed')
      } else {
        await new Promise(resolve => setTimeout(resolve, 800))
      }
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form" noValidate>
      <div className="form-field">
        <label htmlFor="contact-name">Nombre</label>
        <input
          id="contact-name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
        />
        {errors.name && <span id="contact-name-error" className="field-error">{errors.name}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Tu email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
        />
        {errors.email && <span id="contact-email-error" className="field-error">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="contact-message">Mensaje</label>
        <textarea
          id="contact-message"
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder="Cuéntame tu idea"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message && <span id="contact-message-error" className="field-error">{errors.message}</span>}
      </div>

      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : 'Enviar idea'}
      </button>
      {status === 'success' && <p className="form-feedback success" role="status">¡Gracias! Te contactaré pronto.</p>}
      {status === 'error' && <p className="form-feedback error" role="alert">Algo salió mal. Intenta de nuevo.</p>}
    </form>
  )
}