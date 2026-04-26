import { Link } from 'react-router-dom'
import StoreLayout from '../components/StoreLayout'

const featuredJewelry = [
  {
    name: 'Heirloom Kundan Set',
    tag: 'Bridal Signature',
    price: '$1,850',
    image: '/legacy/images/saree2.jpg',
  },
  {
    name: 'Moonlit Polki Choker',
    tag: 'Evening Edit',
    price: '$1,200',
    image: '/legacy/images/saree3.jpg',
  },
  {
    name: 'Zarina Jhumkas',
    tag: 'Occasion',
    price: '$640',
    image: '/legacy/images/saree4.jpg',
  },
]

const jewelryGrid = [
  { name: 'Pearl Tikka', category: 'Headpiece', price: '$320', image: '/legacy/images/saree5.jpg' },
  { name: 'Noor Choker', category: 'Statement Neckline', price: '$980', image: '/legacy/images/saree6.jpg' },
  { name: 'Royal Bangles', category: 'Stacked Set', price: '$410', image: '/legacy/images/saree7.jpg' },
  { name: 'Emerald Drops', category: 'Bridal Earrings', price: '$540', image: '/legacy/images/saree1.jpg' },
  { name: 'Nawab Passa', category: 'Heritage Detail', price: '$450', image: '/legacy/images/saree2.jpg' },
  { name: 'Champagne Matha Patti', category: 'Ceremony', price: '$600', image: '/legacy/images/saree3.jpg' },
]

export default function JewelryPage() {
  return (
    <StoreLayout>
      <main className="store-page">
        <section className="split-hero jewelry-hero">
          <div className="split-hero-image">
            <img alt="Jewelry collection" src="/legacy/images/saree2.jpg" />
          </div>
          <div className="split-hero-copy">
            <p className="eyebrow">Studio SA Jewelry</p>
            <h1>
              Ornament as
              <span> ceremony</span>
            </h1>
            <p className="lead">
              Kundan, Polki, pearls, and bridal finishing pieces designed to
              complete the full Studio SA silhouette.
            </p>
            <div className="actions">
              <Link className="primary-btn" to="/contact">
                Book Jewelry Styling
              </Link>
              <Link className="secondary-btn" to="/checkout">
                View Cart
              </Link>
            </div>
          </div>
        </section>

        <section className="marquee-bar">
          <div className="marquee-track">
            {[
              'Kundan',
              'Polki',
              'Pearls',
              'Bridal Gold',
              'Heirloom Finish',
              'Ceremony Dressing',
              'Kundan',
              'Polki',
              'Pearls',
              'Bridal Gold',
              'Heirloom Finish',
              'Ceremony Dressing',
            ].map((word, index) => (
              <span key={`${word}-${index}`}>{word}</span>
            ))}
          </div>
        </section>

        <section className="home-section-block">
          <div className="section-heading left">
            <p className="eyebrow">Featured Pieces</p>
            <h2>
              The jewelry <span>edit</span>
            </h2>
          </div>
          <div className="feature-grid feature-grid-tight">
            {featuredJewelry.map((item, index) => (
              <article
                key={item.name}
                className={`feature-card${index === 0 ? ' feature-card-large' : ''}`}
              >
                <img alt={item.name} src={item.image} />
                <div className="feature-overlay">
                  <p>{item.tag}</p>
                  <h3>{item.name}</h3>
                  <span className="feature-price">{item.price}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="editorial-banner">
          <img alt="Jewelry editorial" src="/legacy/images/saree4.jpg" />
          <div className="editorial-banner-copy">
            <h2>Jewelry is the final line of the story.</h2>
            <p className="eyebrow">Studio SA Atelier</p>
          </div>
        </section>

        <section className="home-section-block">
          <div className="section-heading left">
            <p className="eyebrow">Collection Grid</p>
            <h2>
              More to <span>discover</span>
            </h2>
          </div>
          <div className="product-grid">
            {jewelryGrid.map((item) => (
              <article key={item.name} className="product-card compact">
                <div className="product-media">
                  <img alt={item.name} src={item.image} />
                  <span className="product-tag">{item.category}</span>
                </div>
                <div className="product-body">
                  <h3>{item.name}</h3>
                  <p className="product-fabric">Hand-finished bridal jewelry</p>
                  <div className="product-meta">
                    <span className="product-price">{item.price}</span>
                    <Link className="secondary-btn" to="/contact">
                      Inquire
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-band">
          <div>
            <h2>Need a full bridal jewelry pairing?</h2>
            <p className="lead">
              We style jewelry with sarees and lehengas during private
              consultations.
            </p>
          </div>
          <Link className="dark-btn" to="/contact">
            Book Consultation
          </Link>
        </section>
      </main>
    </StoreLayout>
  )
}
