import actionTypes from './actionTypes';

export function initialFetch() {
    const api = process.env.REACT_APP_API_KEY
    return function (dispatch) {
        fetch (`https://app.ticketmaster.com/discovery/v2/events.json?city=New%20York&countryCode=US&segmentName=music&apikey=${api}`)
        .then(response => response.json())
        .then(eventsData => {
            dispatch({type: actionTypes.initialFetch, payload: eventsData["_embedded"]})
            console.log(eventsData["_embedded"])
        })
        .catch(console.log)
    }
}


export function setUser(userObj){
    return function(dispatch){   
        console.log("AAAAAAAA",userObj) 
        fetch ('http://localhost:3000/api/login',{
            method:"POST",
            headers:{
               accepts: "application/json",
               "content-type": "application/json"
                },
                body: JSON.stringify({user: userObj})
            })
                .then(response => response.json())
                .then(data =>{
                    localStorage.setItem("token", data.jwt)
                    dispatch({type: actionTypes.setUser, payload: data})
                })
                
}}