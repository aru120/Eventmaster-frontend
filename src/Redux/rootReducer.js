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
    switch(action.type){
        case "SET_USER":
        console.log("setUser", action)
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