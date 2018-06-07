import React from 'react'
import PropTypes from 'prop-types'

const CartItem = ({ price, quantity, title, image }) => (


  <div className="col m2">
    <div className="col" id="petCard">
      <div className="card">

        <div className="card-title"> <span >{title}</span></div>

        <div className="card-content">
          <p className="text">Price: {price} $</p>
          <p>Quantity: {quantity}</p>


        </div>
      </div>
    </div>
  </div>

)

CartItem.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string
}

export default CartItem
