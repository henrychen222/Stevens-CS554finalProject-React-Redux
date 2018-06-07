import React from 'react'
import PropTypes from 'prop-types'
import CartItem from './CartItem'
import ReactTooltip from 'react-tooltip'

const Cart = ({ products, total, onCheckoutClicked }) => {

  const hasProducts = products.length > 0
  const nodes = hasProducts ? (
    products.map(product =>
      <CartItem
        title={product.title}
        price={product.price}
        quantity={product.quantity}
        key={product.id}
        image={product.image}
      />
    )
  ) : (
      <em>Please add some products to cart.</em>
    )

  return (

    <div>
      <ReactTooltip />
      <h2>Your Cart</h2>
      <div className="row">{nodes}</div>
      <p>Total: &#36;{total}</p>
      <button className="  pulse waves-effect waves-light " onClick={onCheckoutClicked}
        disabled={hasProducts ? '' : 'disabled'}>
        <i className="medium material-icons " id="shopping_cart" data-tip="Checkout">shopping_cart</i>
      </button>
      <br />
      <br />
    </div>


  )
}

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func
}

export default Cart
