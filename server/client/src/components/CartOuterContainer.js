import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import { Component } from 'react';
import ReactTooltip from 'react-tooltip'
import Goodies from './Goodies'
import { getNoOfUserGoodies} from '../actions';

class CartOuterContainer extends Component {
  componentDidMount() {
    this.props.getNoOfUserGoodies();
  }
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return <div>
          <ReactTooltip />
          <ProductsContainer />
          <hr />
          <Goodies noOfgoodies={this.props.noOfgoodies} />
          <CartContainer />
        </div>;
    }
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}
function mapStateToProps(state) {
  console.log("Cart Outer container map state to props");
  console.log(state);
  return {
    noOfgoodies: state.userGoodies===false?0:state.userGoodies.quantity,
    auth: state.auth
  };
}

export default connect(mapStateToProps, { getNoOfUserGoodies })(CartOuterContainer);