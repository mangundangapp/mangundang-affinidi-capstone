import React from 'react'
import './ProductDisplay.css'

const ProductDisplay = ({ addToCart, products }) => {
  return (
    <div className="ProductDisplay">
      {products.map(product => (
        <div key={product.id} className="ProductItem">
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <p>Shipped from {product.country}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  )
}

export default ProductDisplay
