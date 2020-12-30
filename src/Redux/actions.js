import actionTypes from './actionTypes';

export function initialFetch() {
    return function (dispatch) {
        fetch ('http://localhost:3000/api/get_events')
        .then(response => response.json())
        .then(eventsData => {
            dispatch({type: actionTypes.initialFetch, payload: eventsData["_embedded"]})
            console.log(eventsData["_embedded"])
        })
        .catch(console.log)
    }
}