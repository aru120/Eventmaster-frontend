import React from 'react'
import {connect} from 'react-redux'
import {addFavorite} from '../Redux/actions'


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
        console.log(eventObject)
        

        let artistArray = eventObject["_embedded"].attractions.map(artist => artist.name)
        console.log("SAVED EVENTS",artistArray)

       const eventObj = {
            title: eventObject.name,
            date: eventObject.dates.start["localDate"],
            image: eventObject.images[0].url,
            ticketmasterid: eventObject.id,
            time: eventObject.dates.start["localTime"],
            artists: artistArray

        }


        // console.log(eventObject)
        fetch ('http://localhost:3000/api/events',{
            method:"POST",
            headers:{
               accepts: "application/json",
               "content-type": "application/json"
                },
                body: JSON.stringify(eventObj)
            })
                .then(response => response.json())
                .then(data =>{
                    this.props.addToFavs(data)

                    return fetch('http://localhost:3000/api/user_events',{
                        method:"POST",
                        headers:{
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
           

      let foundObj =  this.props.savedEvents.find(event => event.ticketmasterid === eventObject.id)
      console.log("foundOBJ",foundObj)
        fetch (`http://localhost:3000/api/events/${foundObj.id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(console.log)
        .catch(console.log)
    }

    render() {
        console.log(this.props.savedEvents)
        return (
            <div>
                <>
                    <h1>{this.props.eventName}</h1>
                    <img src={this.props.eventImg} style={{ maxWidth: "200px", maxHeight: "115px" }} />
                    <h5>{this.dateHandler(this.props.eventDate)}</h5>
                    <h5>{this.timeHandler(this.props.eventTime)}</h5>

                    <h3>{this.props.attractions.map(artist => <p> {artist} </p>)}</h3>

                    <button onClick={this.clickHandler} >Buy Tickets</button>


                    {localStorage.getItem("token") ? <button onClick={this.saveEventHandler}>Save This Event</button> : null}
                    <button onClick={this.deleteSavedEventHandler}> Remove Saved Event</button>
                </>


            </div>
        )
    }
}
function msp(state){
    return({
        user_state: state.user_state,
        savedEvents: state.savedEvents
    })
}

function mdp(dispatch){
    return(
        {
        addToFavs: (eventObj) => dispatch(addFavorite(eventObj))
    }
    )
}

export default connect(msp,mdp)(EventDetails)