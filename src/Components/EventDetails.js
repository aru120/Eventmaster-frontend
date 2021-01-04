import React from 'react'
import {connect} from 'react-redux'


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

       const eventObj = {
            title: eventObject.name,
            date: eventObject.dates.start["localDate"],
            image: eventObject.images,
            ticketmasterid: eventObject.id
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

    render() {
        
        return (
            <div>
                <>
                    <h1>{this.props.eventObj.name}</h1>
                    <img src={this.props.eventObj.images[0].url} style={{ maxWidth: "200px", maxHeight: "115px" }} />
                    <h5>{this.dateHandler(this.props.eventObj.dates.start["localDate"])}</h5>
                    <h5>{this.timeHandler(this.props.eventObj.dates.start["localTime"])}</h5>

                    <h3>{this.props.eventObj["_embedded"].attractions.map(artist => <p> {artist.name} </p>)}</h3>

                    <button onClick={this.clickHandler} >Buy Tickets</button>

                    {localStorage.getItem("token") ? <button onClick={this.saveEventHandler}>Save This Event</button> : null}
                   
                </>


            </div>
        )
    }
}
function msp(state){
    return({
        user_state: state.user_state
    })
}

export default connect(msp)(EventDetails)