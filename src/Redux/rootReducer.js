import {combineReducers} from 'redux'
const defaultState = {
    initialEvents: [],
    user_state: null,
    savedEvents: []
}

function homePageEvents(state = defaultState.initialEvents, action) {
    switch (action.type) {
        case "INITIAL_FETCH":
            // console.log(action)
            return action.payload;
            break;
        default:
            return state
            break;
    }
};

function setUser(state =  defaultState.user_state, action){
    console.log("IN SET USER", action)
    switch(action.type){
        case "SET_USER":
        return action.payload;
        break;
        case "UPDATE_USER":
        return action.payload;
        break;    
        default:
            return state
            break;
    }
}




const rootReducer = combineReducers({
    initialEvents: homePageEvents,
    user_state: setUser
})

export default rootReducer