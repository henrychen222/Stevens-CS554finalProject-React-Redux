import React, { Component } from 'react';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import '../css/style.css';
import PetListSearch from './PetListSearch';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../actions';

class Search extends Component {

  constructor(props) {
    super(props);
    console.log("Search page")
    console.log(this.props)
    this.state = {
      type: -1

    };
  }

  onChange = (selected) => {
    this.setState({
      type: selected,

    });
    console.log("onChange selected" + selected);

  };
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return <div >
          <br />
          <RadioGroup id="search" onChange={this.onChange} horizontal>
            <RadioButton value="1">
              Cat
                  </RadioButton>
            <RadioButton value="0" >
              Dog
                  </RadioButton>
          </RadioGroup>
          <div>
            <PetListSearch
              type={this.state.type}
            />
          </div>
        </div>;
    }
  }

  render() {
    return (
      <div>{this.renderContent()}</div>
    );
  }


}
function mapStateToProps(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(Search);