import React from 'react'

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
        fetch ('http://localhost:3000/api/events',{
            method:"POST",
            headers:{
               accepts: "application/json",
               "content-type": "application/json"
                },
                body: JSON.stringify(eventObject)
            })
                .then(response => response.json())
                .then(data =>{
                    console.log(data)
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

                    <button onClick={this.saveEventHandler}>Save This Event</button>
                </>


            </div>
        )
    }
}

export default EventDetails