import { Link } from 'react-router-dom'
import StoreLayout from '../components/StoreLayout'
import { useCart } from '../context/CartContext'
import { sareeProducts } from '../data/products'

const featuredProducts = sareeProducts.slice(0, 2)
const collectionProducts = sareeProducts.slice(2)

export default function SareePage() {
  const { addItem } = useCart()

  return (
    <StoreLayout>
      <main className="store-page">
        <section className="editorial-hero">
          <img alt="Bridal Saree" src="/legacy/images/saree1.jpg" />
          <div className="editorial-overlay">
            <p className="eyebrow">Studio SA Bridal Collection</p>
            <h1>
              The art of
              <span> the saree</span>
            </h1>
            <p className="lead">
              Handcrafted pieces for the woman who carries heritage with grace.
            </p>
            <div className="actions">
              <Link className="primary-btn" to="/checkout">
                View Cart
              </Link>
              <Link className="secondary-btn" to="/shop">
                Back To Shop
              </Link>
            </div>
          </div>
        </section>

        <section className="editorial-list">
          {featuredProducts.map((product, index) => (
            <article
              key={product.id}
              className={`editorial-card${index % 2 === 1 ? ' reverse' : ''}`}
            >
              <img alt={product.name} src={product.image} />
              <div className="editorial-copy">
                <p className="eyebrow">{product.tagline}</p>
                <h2>{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-fabric">{product.fabric}</p>
                <div className="product-meta">
                  <span className="product-price">
                    ${product.price.toLocaleString()}
                  </span>
                  <button
                    className="primary-btn"
                    onClick={() => addItem(product)}
                    type="button"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="section-head">
          <p className="eyebrow">The Full Collection</p>
          <h2>More bridal sarees to discover.</h2>
        </section>

        <section className="product-grid">
          {collectionProducts.map((product) => (
            <article key={product.id} className="product-card compact">
              <div className="product-media">
                <img alt={product.name} src={product.image} />
                <span className="product-tag">{product.tagline}</span>
              </div>
              <div className="product-body">
                <h3>{product.name}</h3>
                <p className="product-fabric">{product.fabric}</p>
                <div className="product-meta">
                  <span className="product-price">
                    ${product.price.toLocaleString()}
                  </span>
                  <button
                    className="primary-btn"
                    onClick={() => addItem(product)}
                    type="button"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="atelier-banner">
          <div>
            <p className="eyebrow">Bespoke Service</p>
            <h2>Your saree, your story.</h2>
            <p className="lead">
              Every bride is singular. Our atelier works with you from fabric
              selection to final drape.
            </p>
          </div>
          <Link className="secondary-btn" to="/contact">
            Book A Consultation
          </Link>
        </section>
      </main>
    </StoreLayout>
  )
}
