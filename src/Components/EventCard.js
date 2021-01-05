import React from 'react'
import { NavLink } from 'react-router-dom'


class EventCard extends React.Component {

    dateHandler = (date) => {
        let arr = date.split("-")
        let month = arr[1]
        let day = arr[2]
        let year = arr[0]

        return `${month}/${day}/${year}`
    }

    render() {
        return (
            <div>
                <NavLink to={`/get_events/${this.props.eventId}`}  >
                    <h1 >{this.props.eventName}</h1>
                    <img src={this.props.eventImage} style={{ maxWidth: "200px", maxHeight: "115px" }} />
                </NavLink>
                    <h3> Date: {this.dateHandler(this.props.eventDate)}</h3>
            </div>
        )
    }
}

export default EventCard