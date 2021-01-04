import actionTypes from './actionTypes';


export function initialFetch(zipcode) {
    const api = process.env.REACT_APP_API_KEY
    let URL = ""
    console.log("BBBBbBBBB",zipcode)
    if (zipcode){
        URL = `https://app.ticketmaster.com/discovery/v2/events.json?postalCode=${zipcode}&locale=*&countryCode=US&segmentName=music&apikey=${api}`
    }
    else {
        URL = `https://app.ticketmaster.com/discovery/v2/events.json?city=New%20York&countryCode=US&segmentName=music&apikey=${api}`
    }
    return function (dispatch) {
        // console.log(URL)
        fetch (URL)
        .then(response => response.json())
        .then(eventsData => {
            if(eventsData["_embedded"]){
            dispatch({type: actionTypes.initialFetch, payload: eventsData["_embedded"]})
            console.log(eventsData["_embedded"])
            }
            else {
                dispatch({type: actionTypes.noEvent, payload: null})
            }
        })
        .catch(console.log)
    }
}


export function setUser(userObj){
    return function(dispatch){   
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

export function updateUser(userObj){
    return function(dispatch){
        dispatch({type: actionTypes.updateUser, payload: userObj})
    }
}


