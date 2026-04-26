import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StoreLayout from '../components/StoreLayout'

const heroSlides = [
  '/legacy/images/saree1.jpg',
  '/legacy/images/saree2.jpg',
  '/legacy/images/saree3.jpg',
]

const featuredCards = [
  {
    to: '/shop',
    image: '/legacy/images/saree2.jpg',
    tag: 'Bestseller',
    name: 'The Heritage Set',
  },
  {
    to: '/saree',
    image: '/legacy/images/saree4.jpg',
    tag: 'Bridal Sarees',
    name: 'Golden Hour',
  },
  {
    to: '/jewelry',
    image: '/legacy/images/saree5.jpg',
    tag: 'Limited Edition',
    name: 'Midnight Jharokha',
  },
  {
    to: '/site/lookbook',
    image: '/legacy/images/saree6.jpg',
    tag: 'New',
    name: 'Saffron Nights',
  },
]

const craftCards = [
  {
    number: '01',
    title: 'Heritage Fabrics',
    body: 'We source from generational weavers and ateliers so every look carries craft, texture, and story.',
  },
  {
    number: '02',
    title: 'Hand Embroidery',
    body: 'Each piece is detailed by hand with bridal techniques that bring depth, movement, and ceremony to the surface.',
  },
  {
    number: '03',
    title: 'Conscious Design',
    body: 'Our collections are designed for longevity, with small runs and silhouettes meant to outlast trend cycles.',
  },
]

const lookbookImages = [
  '/legacy/images/saree3.jpg',
  '/legacy/images/saree4.jpg',
  '/legacy/images/saree5.jpg',
  '/legacy/images/saree6.jpg',
  '/legacy/images/saree7.jpg',
]

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <StoreLayout>
      <main className="home-page">
        <section className="home-hero">
          <div className="hero-slides">
            {heroSlides.map((image, index) => (
              <img
                key={image}
                alt={`Studio SA slide ${index + 1}`}
                className={`hero-slide${index === activeSlide ? ' active' : ''}`}
                src={image}
              />
            ))}
          </div>

          <div className="home-hero-content">
            <p className="eyebrow">Autumn / Winter 2026</p>
            <h1>
              Where heritage
              <span> meets couture</span>
            </h1>
            <p className="lead">
              South Asian craftsmanship, reimagined for a modern bridal and
              occasionwear world.
            </p>
            <div className="actions">
              <Link className="primary-btn" to="/shop">
                Explore Collection
              </Link>
              <Link className="secondary-btn" to="/lookbook">
                View Lookbook
              </Link>
            </div>
          </div>

          <div className="hero-dots">
            {heroSlides.map((image, index) => (
              <button
                key={image}
                className={`hero-dot${index === activeSlide ? ' active' : ''}`}
                onClick={() => setActiveSlide(index)}
                type="button"
              />
            ))}
          </div>
        </section>

        <section className="marquee-bar">
          <div className="marquee-track">
            {[
              'Raw Silk',
              'Banarasi Weave',
              'Zardozi',
              'Handcrafted',
              'Heritage',
              'Couture',
              'Gota Patti',
              'Luxury',
            ]
              .concat([
                'Raw Silk',
                'Banarasi Weave',
                'Zardozi',
                'Handcrafted',
                'Heritage',
                'Couture',
                'Gota Patti',
                'Luxury',
              ])
              .map((word, index) => (
                <span key={`${word}-${index}`}>{word}</span>
              ))}
          </div>
        </section>

        <section className="story-grid">
          <div className="story-image-panel">
            <img alt="Studio SA story" src="/legacy/images/saree7.jpg" />
          </div>
          <div className="story-copy">
            <p className="eyebrow">Our Story</p>
            <h2>
              Born from
              <span> tradition</span>
            </h2>
            <p className="lead">
              Studio SA bridges ancestral South Asian craft and contemporary
              luxury, creating pieces that feel ceremonial, refined, and deeply
              personal.
            </p>
            <div className="story-stats">
              <div>
                <strong>12+</strong>
                <span>Artisan Partners</span>
              </div>
              <div>
                <strong>3</strong>
                <span>Collections</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Handcrafted</span>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section-block">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Featured</p>
              <h2>
                The <span>Silk Road</span> edit
              </h2>
            </div>
            <Link className="secondary-btn" to="/shop">
              Shop All
            </Link>
          </div>

          <div className="feature-grid">
            {featuredCards.map((card, index) => (
              <Link
                key={card.name}
                className={`feature-card${index === 0 ? ' feature-card-large' : ''}`}
                to={card.to}
              >
                <img alt={card.name} src={card.image} />
                <div className="feature-overlay">
                  <p>{card.tag}</p>
                  <h3>{card.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-section-block">
          <div className="section-heading center">
            <p className="eyebrow">Why Studio SA</p>
            <h2>
              The art of <span>making</span>
            </h2>
          </div>
          <div className="craft-grid-home">
            {craftCards.map((card) => (
              <article key={card.number} className="craft-card-home">
                <strong>{card.number}</strong>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="consultation-banner">
          <img alt="Consultation banner" src="/legacy/images/saree1.jpg" />
          <div className="consultation-overlay">
            <p className="eyebrow">Bridal & Festive Consultations Open</p>
            <h2>Dressed in a thousand years of craft.</h2>
            <Link className="primary-btn" to="/contact">
              Book A Consultation
            </Link>
          </div>
        </section>

        <section className="home-section-block">
          <div className="section-heading">
            <p className="eyebrow">As Seen In</p>
            <h2>
              The <span>lookbook</span>
            </h2>
          </div>
          <div className="lookbook-row">
            {lookbookImages.map((image, index) => (
              <Link key={image} className="lookbook-card" to="/lookbook">
                <img alt={`Lookbook ${index + 1}`} src={image} />
                <span>View Look</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </StoreLayout>
  )
}
