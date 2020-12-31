import actionTypes from './actionTypes';


export function initialFetch(zipcode) {
    const api = process.env.REACT_APP_API_KEY
    let URL = ""
    console.log("BBBBbBBBB",zipcode)
    if (zipcode){
        URL = `https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&postalCode=${zipcode}&locale=*&countryCode=US&segmentName=music&apikey=${api}`
    }
    else {
        URL = `https://app.ticketmaster.com/discovery/v2/events.json?city=New%20York&countryCode=US&segmentName=music&apikey=${api}`
    }
    return function (dispatch) {
        fetch (URL)
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


