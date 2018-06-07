import { GET_NO_OF_USER_GOODIES } from '../actions/types';


export default function(state = [], action){
    //console.log("GET_NO_OF_USER_GOODIES  "+JSON.stringify(state));
    switch(action.type){
        case GET_NO_OF_USER_GOODIES: 
            return action.payload || false; 
        default: 
            return state;
    }
}