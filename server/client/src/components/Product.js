import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ price, quantity, title, image, onAddToCart }) => (


    <div className="col m4 l4">
        <div className="col" id="petCard">
            <div className="card">
                <div className="card-image">
                    <img src={window.location.origin + '/images/' + image} alt="Product here" height="286" />
                    <span className="card-title black">{title}</span>
                </div>
                <div className="card-content">
                    <p>This will increase your pets happiness by 1</p>
                    <p>Price: {price}$</p>
                    <button id="add_btn" className="btn-floating black "
                        style={{ margin: '5px' }}
                        onClick={onAddToCart}>
                        <i className="material-icons black" id="add_icon" data-tip="Add to cart" >add_shopping_cart</i>
                    </button>
                </div>
            </div>
        </div>
    </div>

)

Product.propTypes = {
    price: PropTypes.number,
    quantity: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string
}

export default Product
