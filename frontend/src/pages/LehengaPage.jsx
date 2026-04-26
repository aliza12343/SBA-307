import { Link } from 'react-router-dom'
import StoreLayout from '../components/StoreLayout'

const lehengaCards = [
  {
    name: 'Emerald Darbar',
    category: 'Bridal Couture',
    price: '$5,400',
    image: '/legacy/images/saree1.jpg',
    description: 'Velvet bridal lehenga with ornate hand embroidery.',
  },
  {
    name: 'Rose Mehfil',
    category: 'Festive Bridal',
    price: '$4,100',
    image: '/legacy/images/saree5.jpg',
    description: 'Soft rose lehenga with crystal and threadwork accents.',
  },
  {
    name: 'Ivory Qasr',
    category: 'Reception',
    price: '$4,650',
    image: '/legacy/images/saree6.jpg',
    description: 'An ivory lehenga designed for modern bridal receptions.',
  },
]

const lehengaGrid = [
  { name: 'Crimson Heirloom', category: 'Bridal', image: '/legacy/images/saree2.jpg' },
  { name: 'Sandstone Gold', category: 'Bridal', image: '/legacy/images/saree3.jpg' },
  { name: 'Noor Garden', category: 'Festive', image: '/legacy/images/saree4.jpg' },
  { name: 'Midnight Mehfil', category: 'Reception', image: '/legacy/images/saree7.jpg' },
  { name: 'Champagne Riwaayat', category: 'Occasion', image: '/legacy/images/saree5.jpg' },
  { name: 'Jade Zari', category: 'Bridal', image: '/legacy/images/saree1.jpg' },
]

export default function LehengaPage() {
  return (
    <StoreLayout>
      <main className="store-page">
        <section className="single-hero">
          <img alt="Lehenga collection" src="/legacy/images/saree1.jpg" />
          <div className="single-hero-copy">
            <p className="eyebrow">Lehenga Collection</p>
            <h1>
              Bridal volume,
              <span> reimagined</span>
            </h1>
            <p className="lead">
              Couture lehengas shaped for ceremony, movement, and heirloom-level
              detail.
            </p>
            <div className="actions">
              <Link className="primary-btn" to="/contact">
                Book Bridal Appointment
              </Link>
              <Link className="secondary-btn" to="/jewelry">
                Pair With Jewelry
              </Link>
            </div>
          </div>
        </section>

        <section className="marquee-bar">
          <div className="marquee-track">
            {[
              'Bridal Couture',
              'Zardozi',
              'Velvet',
              'Raw Silk',
              'Gota Patti',
              'Reception Dressing',
              'Bridal Couture',
              'Zardozi',
              'Velvet',
              'Raw Silk',
              'Gota Patti',
              'Reception Dressing',
            ].map((word, index) => (
              <span key={`${word}-${index}`}>{word}</span>
            ))}
          </div>
        </section>

        <section className="home-section-block">
          <div className="section-heading left">
            <p className="eyebrow">Featured Lehengas</p>
            <h2>
              Ceremony <span>statements</span>
            </h2>
          </div>
          <div className="editorial-list">
            {lehengaCards.map((item, index) => (
              <article
                key={item.name}
                className={`editorial-card${index % 2 === 1 ? ' reverse' : ''}`}
              >
                <img alt={item.name} src={item.image} />
                <div className="editorial-copy">
                  <p className="eyebrow">{item.category}</p>
                  <h2>{item.name}</h2>
                  <p className="product-description">{item.description}</p>
                  <div className="product-meta">
                    <span className="product-price">{item.price}</span>
                    <Link className="primary-btn" to="/contact">
                      Inquire
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="editorial-banner">
          <img alt="Lehenga editorial" src="/legacy/images/saree7.jpg" />
          <div className="editorial-banner-copy">
            <h2>
              A lehenga should feel as ceremonial in motion as it does in
              stillness.
            </h2>
            <p className="eyebrow">Studio SA Bridal Notes</p>
          </div>
        </section>

        <section className="home-section-block">
          <div className="section-heading left">
            <p className="eyebrow">Collection Grid</p>
            <h2>
              Bridal looks to <span>save</span>
            </h2>
          </div>
          <div className="product-grid">
            {lehengaGrid.map((item) => (
              <article key={item.name} className="product-card compact">
                <div className="product-media">
                  <img alt={item.name} src={item.image} />
                  <span className="product-tag">{item.category}</span>
                </div>
                <div className="product-body">
                  <h3>{item.name}</h3>
                  <p className="product-fabric">Handcrafted lehenga set</p>
                  <div className="product-meta">
                    <span className="product-price">Made To Order</span>
                    <Link className="secondary-btn" to="/contact">
                      Request Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-band">
          <div>
            <h2>Styling a full bridal wardrobe?</h2>
            <p className="lead">
              We can pair lehengas, sarees, and jewelry into one coordinated
              bridal direction.
            </p>
          </div>
          <Link className="dark-btn" to="/contact">
            Start Your Consultation
          </Link>
        </section>
      </main>
    </StoreLayout>
  )
}
