import { Link, Navigate, useParams } from 'react-router-dom'

export default function LegacyPage({ pages }) {
  const { slug } = useParams()
  const page = pages.find((item) => item.slug === slug)

  if (page?.route) {
    return <Navigate replace to={page.route} />
  }

  if (!page) {
    return (
      <main className="frame-layout">
        <div className="frame-topbar">
          <Link className="back-link" to="/">
            Back
          </Link>
        </div>
        <div className="missing-state">Page not found.</div>
      </main>
    )
  }

  return (
    <main className="frame-layout">
      <header className="frame-topbar">
        <div>
          <Link className="back-link" to="/">
            Back To React Home
          </Link>
          <h2>{page.label}</h2>
        </div>
        <a className="direct-link" href={`/legacy/${page.file}`} target="_blank" rel="noreferrer">
          Open Direct
        </a>
      </header>

      <iframe
        className="legacy-frame"
        src={`/legacy/${page.file}`}
        title={page.label}
      />
    </main>
  )
}
