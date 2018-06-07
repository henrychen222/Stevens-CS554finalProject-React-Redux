import React,{ Component } from 'react';
import { BrowserRouter, Route, Switch}  from 'react-router-dom';

import {connect} from 'react-redux';
import * as actions  from '../actions';

import Header from './Header';
import Footer from './Footer';

import Dashboard from './Dashboard';
import Landing from './Landing';
import Search from "./Search";
import CartOuterContainer from "./CartOuterContainer";
import PetProfile from './PetProfile';

class App extends Component{
    componentDidMount(){
        this.props.fetchUser();

    }
    render(){
        return(
            <div className="container-fluid">
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Switch>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/search" component={Search}/>
                        <Route exact path="/cart" component={CartOuterContainer}/>
                        <Route exact path="/pet/:petId" component={PetProfile}/>
                        <Route  exact path="*" component={Landing}/>
                        </Switch>
                        <Footer/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
    
};

export default connect(null,actions) (App);