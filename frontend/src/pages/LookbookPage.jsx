import { useMemo, useState } from 'react'
import StoreLayout from '../components/StoreLayout'

const lookbookItems = [
  {
    id: 1,
    name: 'The Heritage Set',
    category: 'Bridal',
    fabric: 'Raw Silk',
    status: 'In Stock',
    image: '/legacy/images/saree1.jpg',
  },
  {
    id: 2,
    name: 'Golden Hour',
    category: 'Festive',
    fabric: 'Chiffon',
    status: 'Pre-Order',
    image: '/legacy/images/saree2.jpg',
  },
  {
    id: 3,
    name: 'Midnight Jharokha',
    category: 'Pret',
    fabric: 'Velvet',
    status: 'Limited Edition',
    image: '/legacy/images/saree3.jpg',
  },
  {
    id: 4,
    name: 'Saffron Nights',
    category: 'Festive',
    fabric: 'Organza',
    status: 'In Stock',
    image: '/legacy/images/saree4.jpg',
  },
  {
    id: 5,
    name: 'Royal Umber',
    category: 'Bridal',
    fabric: 'Banarasi Silk',
    status: 'Sold Out',
    image: '/legacy/images/saree5.jpg',
  },
  {
    id: 6,
    name: 'Ivory Petals',
    category: 'Pret',
    fabric: 'Handmade Lace',
    status: 'In Stock',
    image: '/legacy/images/saree6.jpg',
  },
]

const filters = ['All', 'Bridal', 'Festive', 'Pret']

export default function LookbookPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const visibleItems = useMemo(
    () =>
      activeFilter === 'All'
        ? lookbookItems
        : lookbookItems.filter((item) => item.category === activeFilter),
    [activeFilter],
  )

  return (
    <StoreLayout>
      <main className="store-page">
        <section className="lookbook-hero">
          <img alt="Lookbook" src="/legacy/images/saree1.jpg" />
          <div className="lookbook-hero-copy">
            <p className="eyebrow">Autumn / Winter 2026</p>
            <h1>
              The <span>Silk Road</span> gallery
            </h1>
          </div>
        </section>

        <section className="filter-bar">
          <div className="filter-set">
            {filters.map((filter) => (
              <button
                key={filter}
                aria-pressed={activeFilter === filter}
                className={`filter-chip${activeFilter === filter ? ' is-active' : ''}`}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
          <p className="item-count">{visibleItems.length} looks showing</p>
        </section>

        <section className="lookbook-masonry">
          {visibleItems.map((item, index) => (
            <article
              key={item.id}
              className="lookbook-tile"
              style={{ marginTop: index % 3 === 1 ? 36 : 0 }}
            >
              <img alt={item.name} src={item.image} />
              <span className="lookbook-tag">{item.category}</span>
              <div className="lookbook-overlay-copy">
                <p>AW 2026</p>
                <h2>{item.name}</h2>
              </div>
            </article>
          ))}
        </section>

        <section className="quote-block">
          <p>
            Fashion is the armor to survive the reality of everyday life, but
            South Asian fashion is a poem worn on the body.
          </p>
          <span>Studio SA, 2026</span>
        </section>

        <section className="home-section-block">
          <div className="section-heading left">
            <p className="eyebrow">Availability</p>
            <h2>
              Collection <span>index</span>
            </h2>
          </div>
          <div className="table-wrap">
            <table className="collection-table-react">
              <thead>
                <tr>
                  <th>Piece</th>
                  <th>Fabric</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {lookbookItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.fabric}</td>
                    <td>{item.category}</td>
                    <td>
                      <span className={`status-pill ${slugify(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </StoreLayout>
  )
}

function slugify(value) {
  return value.toLowerCase().replace(/\s+/g, '-')
}
