import PropTypes from 'prop-types'

export default function Table({ caption, columns, rows }) {
  return (
    <div
      aria-label={caption || 'Data table'}
      className="table-wrap"
      role="region"
      tabIndex={0}
    >
      <table className="collection-table-react">
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id ?? i}>
              {columns.map((col) => (
                <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  caption: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func,
    }),
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
}
