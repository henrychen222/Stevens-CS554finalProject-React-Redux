import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/style.css';

class Footer extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return;
            default:
                return [
                    <li key="4"><i className="material-icons red600">favorite</i>Pet Me</li>,
                    <li key="3"><i className="material-icons">directions_walk</i>Walk Me</li>,
                    <li key="2"><i className="material-icons green600">local_dining</i>Feed Me</li>,
                    <li key="1"><i className="material-icons purple600">card_giftcard</i>Give Me Goodies</li>
                ]
        }
    }
    render() {
        //console.log(this.props)
        return (
            <div>
                <ul className="list-inline right">
                    {this.renderContent()}
                </ul>
                <footer className="page-footer #f5f5f5 grey lighten-4" id="petPalFooter">
                    © 2018 PetPal
        </footer>
            </div>
        );
    };
}
function mapStateToProps(state) {
    return { auth: state.auth }
}
export default connect(mapStateToProps)(Footer);