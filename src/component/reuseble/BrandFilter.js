import React from 'react';

const BrandFilter = ({ selectedBrand, handleBrandFilterChange, brands }) => {
  return (
    <div className="col-md-3">
      <h4>Filter by Brand</h4>
      <select
        value={selectedBrand}
        onChange={(e) => handleBrandFilterChange(e.target.value)}
        className="form-select"
      >
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BrandFilter;