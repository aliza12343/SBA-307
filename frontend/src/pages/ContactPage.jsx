import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import StoreLayout from '../components/StoreLayout'
import { contactApi } from '../api/contactApi'

const showcaseCards = [
  {
    title: 'Bridal Couture',
    subtitle: 'Collection One',
    description:
      'Handcrafted lehengas, bridal sets, and occasionwear for your most ceremonial moments.',
    image: '/legacy/images/saree5.jpg',
    to: '/lehenga',
  },
  {
    title: 'Casual Pret',
    subtitle: 'Collection Two',
    description:
      'Modern South Asian dressing for everyday elegance, dinners, and festive gatherings.',
    image: '/legacy/images/saree6.jpg',
    to: '/shop',
  },
  {
    title: 'Traditional Jewelry',
    subtitle: 'Collection Three',
    description:
      'Kundan, Polki, and statement finishing pieces rooted in heritage and handcrafted detail.',
    image: '/legacy/images/saree2.jpg',
    to: '/jewelry',
  },
]

const showroomItems = [
  'The Heritage Lehenga',
  'Ivory Linen Kurta Set',
  'Kundan Maang Tikka',
  'Bridal Dupatta',
  'Festive Co-Ord Set',
  'Polki Jhumka Earrings',
]

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  message: '',
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm)
  const [notice, setNotice] = useState('')
  const [noticeType, setNoticeType] = useState('') // 'success' | 'error'
  const [submitting, setSubmitting] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterNotice, setNewsletterNotice] = useState('')

  const onChange = useCallback((event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }, [])

  const submitForm = useCallback(async (event) => {
    event.preventDefault()

    if (!form.firstName || !form.email || !form.service) {
      setNoticeType('error')
      setNotice('Please fill in your name, email, and collection interest.')
      return
    }

    setSubmitting(true)
    try {
      const data = await contactApi.submit({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        service: form.service,
        message: form.message,
      })
      setNoticeType('success')
      setNotice(data.message || 'Thank you. Our Columbus studio will be in touch within 24 hours.')
      setForm(initialForm)
    } catch {
      setNoticeType('error')
      setNotice('We could not send your inquiry. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }, [form])

  function subscribe(event) {
    event.preventDefault()

    if (!newsletterEmail.trim()) {
      setNewsletterNotice('Please enter your email to subscribe.')
      return
    }

    setNewsletterNotice('Welcome to the Studio Circle.')
    setNewsletterEmail('')
  }

  return (
    <StoreLayout>
      <main className="store-page">
        <section className="lookbook-hero contact-hero">
          <img alt="Contact" src="/legacy/images/saree4.jpg" />
          <div className="lookbook-hero-copy">
            <p className="eyebrow">Columbus, Ohio</p>
            <h1>
              Begin your <span>journey</span>
            </h1>
          </div>
        </section>

        <section className="home-section-block">
          <div className="section-heading center">
            <p className="eyebrow">What We Offer</p>
            <h2>
              Three <span>worlds</span> of style
            </h2>
          </div>
          <div className="contact-showcase-grid">
            {showcaseCards.map((card) => (
              <Link key={card.title} className="contact-showcase-card" to={card.to}>
                <img alt={card.title} src={card.image} />
                <div className="contact-showcase-overlay">
                  <p>{card.subtitle}</p>
                  <h3>{card.title}</h3>
                  <span>{card.description}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="showroom-grid">
            {showroomItems.map((item) => (
              <div key={item} className="showroom-item">
                <strong>{item}</strong>
                <span>Studio sample and consultation favorite</span>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-layout">
          <div className="contact-info-panel">
            <p className="eyebrow">The Studio</p>
            <h2>
              Every story begins with a <span>conversation</span>
            </h2>
            <p className="lead">
              Whether you are searching for bridal couture, a bespoke order, or
              the right finishing jewelry, we begin with listening.
            </p>
            <div className="contact-detail-stack">
              <div>
                <strong>Location</strong>
                <span>Columbus, Ohio, USA</span>
                <small>By appointment, Short North District</small>
              </div>
              <div>
                <strong>Email</strong>
                <span>hello@studiosa.com</span>
                <small>We respond within 24 hours</small>
              </div>
              <div>
                <strong>Phone & WhatsApp</strong>
                <span>(614) 555-0192</span>
                <small>Mon-Sat, 10am-7pm EST</small>
              </div>
            </div>
            <div className="service-chip-row">
              {[
                'Bridal Styling',
                'Jewelry Customization',
                'Casual Wardrobe',
                'Bespoke Orders',
                'Virtual Consultations',
                'Press & Media',
              ].map((service) => (
                <span key={service} className="service-chip">
                  {service}
                </span>
              ))}
            </div>
          </div>

          <form className="contact-form-panel" onSubmit={submitForm}>
            <h3>Consultation Request</h3>
            <p className="lead">
              Tell us your vision and we&apos;ll be in touch within 24 hours.
            </p>
            {notice ? (
              <div
                className={`form-notice${noticeType === 'error' ? ' error' : ''}`}
                role={noticeType === 'error' ? 'alert' : 'status'}
              >
                {notice}
              </div>
            ) : null}
            <div className="field-grid two">
              <Field
                label="First Name"
                name="firstName"
                onChange={onChange}
                value={form.firstName}
              />
              <Field
                label="Last Name"
                name="lastName"
                onChange={onChange}
                value={form.lastName}
              />
            </div>
            <Field
              label="Email"
              name="email"
              onChange={onChange}
              type="email"
              value={form.email}
            />
            <Field
              label="Phone"
              name="phone"
              onChange={onChange}
              value={form.phone}
            />
            <label className="field">
              <span>I&apos;m Interested In</span>
              <select name="service" onChange={onChange} value={form.service}>
                <option value="">Select a collection...</option>
                <option>Bridal Couture</option>
                <option>Casual Pret</option>
                <option>Traditional Jewelry</option>
                <option>Full Bridal Package</option>
                <option>Bespoke / Custom Order</option>
                <option>Other</option>
              </select>
            </label>
            <label className="field">
              <span>Your Vision</span>
              <textarea
                name="message"
                onChange={onChange}
                rows="5"
                value={form.message}
              />
            </label>
            <button
              className="primary-btn order-button"
              disabled={submitting}
              type="submit"
            >
              {submitting ? <Spinner size="sm" label="Sending" /> : null}
              {submitting ? 'Sending…' : 'Send Inquiry'}
            </button>
          </form>
        </section>

        <section className="hours-grid">
          <div className="hours-card">
            <p className="eyebrow">Studio Hours</p>
            <h3>Mon-Fri 10am-7pm</h3>
            <span>Saturday 11am-5pm, Sunday by appointment</span>
          </div>
          <div className="hours-card">
            <p className="eyebrow">Consultations</p>
            <h3>Bridal 90 min</h3>
            <span>Jewelry 45 min, complimentary first visit</span>
          </div>
          <div className="hours-card">
            <p className="eyebrow">Service Area</p>
            <h3>Columbus and Beyond</h3>
            <span>Nationwide shipping and virtual consultations available</span>
          </div>
        </section>

        <section className="newsletter-panel">
          <div>
            <h2>Join the Studio Circle</h2>
            <p className="lead">
              Be the first to hear about new collections, trunk shows, and
              exclusive events.
            </p>
          </div>
          <form className="newsletter-form-react" onSubmit={subscribe}>
            <input
              onChange={(event) => setNewsletterEmail(event.target.value)}
              placeholder="your@email.com"
              type="email"
              value={newsletterEmail}
            />
            <button className="primary-btn" type="submit">
              Subscribe
            </button>
          </form>
          {newsletterNotice ? (
            <p className="newsletter-note">{newsletterNotice}</p>
          ) : null}
        </section>
      </main>
    </StoreLayout>
  )
}

function Field({ label, name, onChange, type = 'text', value }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input name={name} onChange={onChange} type={type} value={value} />
    </label>
  )
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
}
