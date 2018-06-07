import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCart } from '../actions'
import { getVisibleProducts } from '../reducers/products'
import ProductItem from './ProductItem'
import ProductsList from './ProductsList'

const ProductsContainer = ({ products, addToCart }) => (
  <ProductsList title="Products">
    {products.map(product =>
      <ProductItem
        key={product.id}
        product={product}
        onAddToCartClicked={() => addToCart(product.id)} />
    )}
  </ProductsList>
)

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  })).isRequired,
  addToCart: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  console.log("Products container state" + JSON.stringify(state));
  return {
    products: getVisibleProducts(state.products)
  }

}

export default connect(
  mapStateToProps,
  { addToCart }
)(ProductsContainer)
