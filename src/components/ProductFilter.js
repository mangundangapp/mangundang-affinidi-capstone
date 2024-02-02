import './ProductFilter.css'

const ProductFilter = ({
  availableCountries,
  selectedCountry,
  onChangeCountry,
}) => {
  return (
    <div className="ProductFilter">
      <label>Filter by country:</label>
      <div className="InputSelectWrapper">
        <select
          value={selectedCountry}
          onChange={e => onChangeCountry(e.target.value)}
        >
          <option value="">All</option>
          {availableCountries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  )
}

export default ProductFilter
