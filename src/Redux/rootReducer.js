import {combineReducers} from 'redux'
const defaultState = {
    initialEvents: [],
}

function homePageEvents(state = defaultState.initialEvents, action) {
    switch (action.type) {
        case "INITIAL_FETCH":
            console.log(action)
            return action.payload;
            break;
        default:
            return state
            break;
    }
};

const rootReducer = combineReducers({
    initialEvents: homePageEvents,
})

export default rootReducer