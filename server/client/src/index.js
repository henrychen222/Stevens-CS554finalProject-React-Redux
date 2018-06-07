import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.js'
import 'react-notifications/dist/react-notifications.css'

import reduxThunk from 'redux-thunk';
import App from './components/App';
import { getAllProducts } from './actions'
import './css/style.css';



const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
store.dispatch(getAllProducts())
//store.dispatch(populateCart())
ReactDOM.render(
<Provider store={store}><App /></Provider>,
document.querySelector('#root'));

