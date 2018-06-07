import { FETCH_FILTER } from '../actions/types';



export default function(state = [], action){
    // console.log("FETCH_FILTER  "+JSON.stringify(state));
    //console.log("FETCH_FILTER  "+action);
    switch(action.type){
        case FETCH_FILTER: 
        //console.log(action.payload);
            return action.payload ; 
        default: 
            return state;
    }
}