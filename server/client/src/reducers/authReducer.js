import { FETCH_USER } from '../actions/types';


export default function(state = null, action){
    // console.log("FETCH_USER  "+JSON.stringify(state));
    switch(action.type){
        case FETCH_USER: 
            return action.payload || false; //'' || false will be false
        default: 
            return state;
    }
}