import React from 'react'
import { NavLink } from 'react-router-dom'

class EventCard extends React.Component {

    state = {
        clicked: false
    }

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
        this.setState((prevState) => ({ clicked: !prevState.clicked }))
        console.log(this.state.clicked)
    }


    render() {
        return (
            <div>
                <NavLink to={`/get_events/${this.props.eventObj.id}`} onClick={this.clickHandler} >
                    <h1 >{this.props.eventObj.name}</h1>
                    <img src={this.props.eventObj.images[0].url} style={{ maxWidth: "200px", maxHeight: "115px" }} />
                </NavLink>
                {this.state.clicked ?
                    <>
                        <h5>{this.dateHandler(this.props.eventObj.dates.start["localDate"])}</h5>
                        <h5>{this.timeHandler(this.props.eventObj.dates.start["localTime"])}</h5>

                        <h3>{this.props.eventObj["_embedded"].attractions.map(artist => <p> {artist.name} </p>)}</h3>
                    </>
                    :
                    null
                }

            </div>
        )
    }
}

export default EventCard