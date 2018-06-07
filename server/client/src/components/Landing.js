import React, { Component } from 'react';
import '../css/style.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Landing extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <div >
              <div className="parallax">
              </div>
              <div></div>
              <div className="caption">
                <span className="border">Signup and experience the joy of caring for a furry friend.</span>
              </div>
              <div className="parallax">
              </div>
              </div>;
      default:
      return <Redirect to="/dashboard" />;
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
//export default Landing;
export default connect(mapStateToProps)(Landing);