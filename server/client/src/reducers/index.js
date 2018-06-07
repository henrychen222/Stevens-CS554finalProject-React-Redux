import { combineReducers } from 'redux';
import authReducer from './authReducer';
import petsReducer from './petsReducer';
import activePetReducer from './activePetReducer';
import filterReducer from './filterReducer';
import activeUserPetReducer from './activeUserPetReducer';
import userGoodiesReducer from './userGoodiesReducer';
import cart, * as fromCart from './cart'
import products, * as fromProducts from './products'

export default combineReducers({
    auth: authReducer,
    pets: petsReducer,
    activepet :activePetReducer,
    filterpets:filterReducer,
    activeUserPet :activeUserPetReducer,
    cart,
    products,
    userGoodies: userGoodiesReducer
});

const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

export const getTotal = state =>
  getAddedIds(state)
    .reduce((total, id) =>
      total + getProduct(state, id).price * getQuantity(state, id),
      0
    )
    .toFixed(2)

export const getCartProducts = state =>
  getAddedIds(state).map(id => ({
    ...getProduct(state, id),
    quantity: getQuantity(state, id)
  }))

