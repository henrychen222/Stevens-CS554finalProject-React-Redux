import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import PetList from './PetList';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class Dashboard extends Component {
  componentDidMount() {
    var d = new Date();
    var n = d.getHours();

    let message = 'Time to Pet your Pets';
    //n=18;
    if ((n >= 9 && n <= 11) || (n >= 14 && n <= 16) || (n > 20 && n <= 22)) {
      message = 'Time to Feed your Pets';
    } else if (n >= 18 && n <= 20) {
      message = 'Time to Walk your Pets';

    }
    setTimeout(this.createNotification('info', message), 500);
  }
  createNotification = (type, message) => () => {

    switch (type) {
      case 'info':
        NotificationManager.info(message, '', 1500);

        break;
      case 'success':
        NotificationManager.success('Success message', 'Title here');
        break;
      case 'warning':
        NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
        break;
      case 'error':
        NotificationManager.error('Error message', 'Click me!', 5000, () => {
          alert('callback');
        });
        break;
      default:
        break;
    }
  };
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return <div>
          <br />
          <br />
          <NotificationContainer />
          <PetList />
        </div>;
    }
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }


}
function mapStateToProps(state) {
  return { auth: state.auth }
}
export default connect(mapStateToProps)(Dashboard);