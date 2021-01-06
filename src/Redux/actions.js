import actionTypes from './actionTypes';
import history from '../History/history'
import { withRouter } from 'react-router-dom'


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
            console.log("eventsData", eventsData["_embedded"].events)
            if(eventsData["_embedded"]){

         const convertedData = convertTicketMaster(eventsData["_embedded"].events)
            dispatch({type: actionTypes.initialFetch, payload: convertedData})
            console.log(eventsData["_embedded"])
            }
            else {
                dispatch({type: actionTypes.noEvent, payload: null})
            }
        })
        .catch(console.log)
    }
}

function convertTicketMaster(array){
    let newArr = []
   array.forEach(eventObj => {
       console.log("CONVERTER",eventObj)
     let artistName =  eventObj["_embedded"].attractions.map(artist => artist.name)
     let obj =   {
           ticketmasterid: eventObj.id,
           title: eventObj.name,
           image: eventObj.images[0].url,
           artists: artistName,
           date: eventObj.dates.start["localDate"],
           time: eventObj.dates.start["localTime"]
       }
       newArr.push(obj)
   } )
   return newArr
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
                console.log("LOCAL STORAGE", data)
                localStorage.setItem("token", data.jwt)
                localStorage.setItem("user_id", data.user.id)
                dispatch({type: actionTypes.setUser, payload: data})
                
                return fetch(`http://localhost:3000/api/users/${data.user.id}`)
                    .then(r => r.json())
                    .then(userData => {
                        dispatch({type: actionTypes.addFavorite, payload: userData.events})
                    })
                
            })
                
                
                
}}

export function updateUser(userObj){
    return function(dispatch){
        dispatch({type: actionTypes.updateUser, payload: userObj})
    }
}

export function addFavorite(eventObj){
    // console.log("INSIDE ADDFAVORITE",eventObj)
    return function(dispatch){
        dispatch({type: actionTypes.addFavorite, payload: eventObj})
    }
}


