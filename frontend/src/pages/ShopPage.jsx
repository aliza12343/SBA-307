import { useCallback, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Skeleton from '../components/Skeleton'
import Spinner from '../components/Spinner'
import StoreLayout from '../components/StoreLayout'
import { useCart } from '../context/CartContext'
import { productsApi } from '../api/productsApi'
import { shopProducts } from '../data/products'

const filters = ['All', 'Bridal', 'Festive', 'Pret', 'Accessories']

export default function ShopPage() {
  const { addItem } = useCart()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeFilter = searchParams.get('filter') || 'All'

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    productsApi
      .getAll()
      .then((data) => {
        if (!cancelled) setProducts(data)
      })
      .catch(() => {
        if (!cancelled) {
          setProducts(shopProducts)
          setError('Live inventory unavailable — showing cached data.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const visibleProducts =
    activeFilter === 'All'
      ? products
      : products.filter((product) => product.category === activeFilter)

  const handleFilter = useCallback(
    (filter) => {
      setSearchParams(filter === 'All' ? {} : { filter })
    },
    [setSearchParams],
  )

  const handleAddItem = useCallback(
    (product) => {
      addItem(product)
    },
    [addItem],
  )

  return (
    <StoreLayout>
      <main className="store-page" id="main-content">
        <section aria-label="Shop hero" className="store-hero">
          <div>
            <p className="eyebrow">The Collection</p>
            <h1>Shop the edit.</h1>
            <p className="lead">
              Browse, add items to cart, and continue straight into checkout.
            </p>
          </div>
          <div className="spotlight-box">
            <p className="spotlight-tag">Bridal Spotlight</p>
            <h2>The Saree collection is live.</h2>
            <p>Explore the curated saree edit or jump directly to checkout.</p>
            <div className="actions">
              <Link className="primary-btn" to="/saree">
                Browse Sarees
              </Link>
              <Link className="secondary-btn" to="/checkout">
                Go To Checkout
              </Link>
            </div>
          </div>
        </section>

        <section aria-label="Filter products" className="filter-bar">
          <div className="filter-set" role="group" aria-label="Product category filters">
            {filters.map((filter) => (
              <button
                key={filter}
                aria-pressed={activeFilter === filter}
                className={`filter-chip${activeFilter === filter ? ' is-active' : ''}`}
                onClick={() => handleFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="item-count">
            {loading ? null : `${visibleProducts.length} pieces showing`}
          </p>
        </section>

        {error ? (
          <p className="error-notice" role="alert">
            {error}
          </p>
        ) : null}

        <section aria-label="Product grid" className="product-grid">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="product-card product-card-skeleton">
                <Skeleton className="skeleton-media" height={340} />
                <div className="product-body">
                  <Skeleton height={12} width="50%" />
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={12} width="65%" />
                  <Skeleton height={12} width="90%" />
                  <div className="product-meta">
                    <Skeleton height={20} width={80} />
                    <Skeleton height={38} width={110} />
                  </div>
                </div>
              </div>
            ))
          ) : visibleProducts.length === 0 ? (
            <p className="empty-notice">No products in this category yet.</p>
          ) : (
            visibleProducts.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-media">
                  <img alt={product.name} src={product.image} />
                  <span className="product-tag">{product.tagline}</span>
                </div>
                <div className="product-body">
                  <p className="product-category">{product.category}</p>
                  <h2>{product.name}</h2>
                  <p className="product-fabric">{product.fabric}</p>
                  <p className="product-description">{product.description}</p>
                  <div className="product-meta">
                    <span className="product-price">
                      ${product.price.toLocaleString()}
                    </span>
                    <button
                      aria-label={`Add ${product.name} to cart`}
                      className="primary-btn"
                      onClick={() => handleAddItem(product)}
                      type="button"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

        {loading ? (
          <div className="loading-center" aria-live="polite">
            <Spinner label="Loading products" size="lg" />
          </div>
        ) : null}
      </main>
    </StoreLayout>
  )
}
