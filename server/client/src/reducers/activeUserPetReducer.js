import { FETCH_USER_PET } from '../actions/types';


export default function(state = [], action){
    // console.log("FETCH_USER_PET  ACTION"+JSON.stringify(action));
    // console.log("FETCH_USER_PET STATE "+JSON.stringify(state));

    switch(action.type){
        case FETCH_USER_PET:
            return action.payload ;
        default: 
            return state;
    }
}