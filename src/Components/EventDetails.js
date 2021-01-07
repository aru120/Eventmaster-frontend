import React from 'react'
import { connect } from 'react-redux'
import { addFavorite } from '../Redux/actions'
import { deleteFavorite } from '../Redux/actions'
import '../Style/eventdetails.scss'

class EventDetails extends React.Component {

    timeHandler = (time) => {
        let arr = time.split(":")
        let amOrPm = arr[0] >= 12 ? "pm" : "am"
        let hour = 0
        let minutes = arr[1]
        if (arr[0] > 12) {
            hour = arr[0] - 12
        }
        return `${hour}:${minutes} ${amOrPm}`
    }

    dateHandler = (date) => {
        let arr = date.split("-")
        let month = arr[1]
        let day = arr[2]
        let year = arr[0]

        return `${month}/${day}/${year}`
    }

    clickHandler = () => {
        const eventObject = this.props.eventObj
        return window.open(eventObject.url)
    }

    saveEventHandler = () => {
        const eventObject = this.props.eventObj
        console.log(eventObject.url)


        // let artistArray = eventObject["_embedded"].attractions.map(artist => artist.name)
        // console.log("SAVED EVENTS",artistArray)

        const eventObj = {
            title: eventObject.title,
            date: eventObject.date,
            image: eventObject.image,
            ticketmasterid: eventObject.ticketmasterid,
            time: eventObject.time,
            artists: eventObject.artists,
            url: eventObject.url

        }


        // console.log(eventObject)
        fetch('http://localhost:3000/api/events', {
            method: "POST",
            headers: {
                accepts: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(eventObj)
        })
            .then(response => response.json())
            .then(data => {
                this.props.addToFavs(data)

                return fetch('http://localhost:3000/api/user_events', {
                    method: "POST",
                    headers: {
                        accepts: "application/json",
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: this.props.user_state.user.id,
                        event_id: data.id
                    })
                })
                    .then(response => response.json())
                    .then(savedEventData => {
                        console.log("User Event Data:", savedEventData)
                    })
                    .catch(console.log)
            })
    }

    deleteSavedEventHandler = () => {
        const eventObject = this.props.eventObj
        console.log(eventObject.ticketmasterid)

        let foundObj = this.props.savedEvents.find(event => event.ticketmasterid === eventObject.ticketmasterid)
        //   console.log("foundOBJ",foundObj)
        fetch(`http://localhost:3000/api/events/${foundObj.id}`, {
            method: "DELETE"
        })
            .then(this.props.deleteFav(foundObj)
            )
            .catch(console.log)
    }

    findSavedEvent = () => {
        const eventObject = this.props.eventObj
        let flag = false
        let foundObj = this.props.savedEvents.find(event => event.ticketmasterid === eventObject.ticketmasterid)
        if (foundObj) {
            flag = true
        } else {
            flag = false
        }
        return flag
    }

    filterSaveButton = () =>{
        let flag = true
        if(localStorage.getItem("token") && this.findSavedEvent()){
             flag = false
        }else if (localStorage.getItem("token")){
             flag = true
        }
        else{
            flag = false
        }    
        return flag 

    }

    render() {
        console.log("localStorage", localStorage.getItem("savedEvents"))
        return (
            <div className="event-details">
                <>
                    <h1>{this.props.eventObj.title}</h1>
                    <img className="event-details-img" src={this.props.eventObj.image}/>
                    <h5>Date: {this.dateHandler(this.props.eventObj.date)}</h5>
                    <h5>Time: {this.timeHandler(this.props.eventObj.time)}</h5>
                    <h5>Venue: {this.props.eventObj.venue} </h5>
                    <br/>
                    { this.props.eventObj.artists.length === 0 ? null : <h3>Lineup {this.props.eventObj.artists.map(artist => <p> {artist} </p>)}</h3>}


                    <button onClick={this.clickHandler} >Buy Tickets</button>
                    { this.filterSaveButton() ? <button onClick={this.saveEventHandler}>Save This Event</button> : null }
                    
                    {this.findSavedEvent() ?
                        
                        <button onClick={this.deleteSavedEventHandler}> Remove Saved Event</button> : null
                    }
                </>


            </div>
        )
    }
}
function msp(state) {
    return ({
        user_state: state.user_state,
        savedEvents: state.savedEvents
    })
}

function mdp(dispatch) {
    return (
        {
            addToFavs: (eventObj) => dispatch(addFavorite(eventObj)),
            deleteFav: (eventObj) => dispatch(deleteFavorite(eventObj))
        }
    )
}

export default connect(msp, mdp)(EventDetails)