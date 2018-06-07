import { FETCH_ALL_PETS } from '../actions/types';

export default function(state = [], action){
    // console.log("FETCH_ALL_PETS  "+JSON.stringify(state));
    switch(action.type){
        case FETCH_ALL_PETS: 
            return action.payload || false; 
        default: 
            return state;
    }
}