import actionTypes from './actionTypes';
import history from '../History/history'
import { withRouter } from 'react-router-dom'



export function initialFetch(zipcode) {
    const api = process.env.REACT_APP_API_KEY
    let URL = ""
    // console.log("BBBBbBBBB", zipcode)
    if (zipcode) {
        URL = `https://app.ticketmaster.com/discovery/v2/events.json?postalCode=${zipcode}&locale=*&countryCode=US&segmentName=music&apikey=${api}`
    }
    else {
        URL = `https://app.ticketmaster.com/discovery/v2/events.json?city=New%20York&countryCode=US&segmentName=music&apikey=${api}`
    }
    return function (dispatch) {
        // console.log(URL)
        fetch(URL)
            .then(response => response.json())
            .then(eventsData => {
                console.log("eventsData", eventsData["_embedded"])
                if (eventsData["_embedded"]) {

                    const convertedData = convertTicketMaster(eventsData["_embedded"].events)
                    dispatch({ type: actionTypes.initialFetch, payload: convertedData })
                    // console.log(eventsData["_embedded"])
                }
                else {
                    dispatch({ type: actionTypes.noEvent, payload: null })
                }
            })
            .catch(console.log)
    }
}

function convertTicketMaster(array) {
    let newArr = []
    array.forEach(eventObj => {
        console.log("CONVERTER", eventObj["_embedded"].venues[0].address["line1"])
        let artistName
        if (eventObj["_embedded"].attractions) {
            artistName = eventObj["_embedded"].attractions.map(artist => artist.name)
        }
        else {
            artistName = []
        }

        let thisImage = findBiggestImage(eventObj.images)

        let obj = {
            ticketmasterid: eventObj.id,
            title: eventObj.name,
            image: thisImage,
            artists: artistName,
            date: eventObj.dates.start["localDate"],
            time: eventObj.dates.start["localTime"],
            url: eventObj.url,
            venue: eventObj["_embedded"].venues[0].name,
            address: eventObj["_embedded"].venues[0].address["line1"],
            city: eventObj["_embedded"].venues[0].city.name,
            state: eventObj["_embedded"].venues[0].state.name,
            zipcode: eventObj["_embedded"].venues[0].postalCode
        }
        newArr.push(obj)
    })
    return newArr
}

function findBiggestImage(array){
    let width = 0
    let url = ""

    array.forEach(eventObj =>{
       
        if(parseInt(eventObj.width) > width){
            width = eventObj.width;
            url = eventObj.url;
        }
    })
    
    return url
}


export function setUser(userObj, history) {
    console.log("INSIDE SET USER USEROBJ", userObj)
    return function (dispatch) {
        fetch('http://localhost:3000/api/login', {
            method: "POST",
            headers: {
                accepts: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({ user: userObj })
        })
            .then(response => response.json())
            .then(data => {
                console.log("LOCAL STORAGE", data)
                localStorage.setItem("token", data.jwt)
                localStorage.setItem("user_id", data.user.id)
                dispatch({ type: actionTypes.setUser, payload: data })
                history.push("/get_events")

                return fetch(`http://localhost:3000/api/users/${data.user.id}`)
                    .then(r => r.json())
                    .then(userData => {
                        console.log("Inside login - UserDataEvents:", userData.events)
                        dispatch({ type: actionTypes.makeFavorites, payload: userData.events})
                        // localStorage.setItem("savedEvents", userData.events)
                    })
                    
            })
            .catch(console.log)


    }
}

export function updateUser(userObj) {
    console.log("UPDATE USER:", userObj)
    return function (dispatch) {
        dispatch({ type: actionTypes.updateUser, payload: userObj })
  
        return fetch(`http://localhost:3000/api/users/${userObj.user.id}`)
                    .then(r => r.json())
                    .then(userData => {
                        console.log("Inside Update User - UserDataEvents:", userData.events)
                        dispatch({ type: actionTypes.makeFavorites, payload: userData.events})
                        
                        // localStorage.setItem("savedEvents", userData.events)
                    })
    }
}

export function initializeSavedEvents(events) {
    console.log("INSIDE ADDFAVORITE",events)
    return function (dispatch) {
        dispatch({ type: actionTypes.makeFavorites, payload: events})
    }
}

export function addFavorite(eventObj) {
    console.log("INSIDE ADDFAVORITE",eventObj)
    return function (dispatch) {
        dispatch({ type: actionTypes.addFavorite, payload: eventObj })
    }
}

export function deleteFavorite(eventObj) {
    return function (dispatch) {
        dispatch({ type: actionTypes.deleteFavorite, payload: eventObj.id })
    }
}


