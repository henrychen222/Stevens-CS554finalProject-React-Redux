import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout} from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'

class CartContainer extends Component  {
  onCheckoutClicked = () => {
    console.log("this.props.products"+JSON.stringify(this.props.products));
    this.props.checkout(this.props.products)
  };
  render(){
    return(
      <div>
       <Cart
      products={this.props.products}
      total={this.props.total}
      onCheckoutClicked={this.onCheckoutClicked}
      
      /> 
      </div>
    )
  }
 

}
 
CartContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    console.log("CartContainer state"+JSON.stringify(state));

  return {
    products: getCartProducts(state),
    total: getTotal(state) 
    };

}

export default connect(
  mapStateToProps,
  { checkout }
)(CartContainer)
