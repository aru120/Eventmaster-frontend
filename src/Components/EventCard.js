import React from 'react'
import { NavLink } from 'react-router-dom'


class EventCard extends React.Component {


    render() {
        return (
            <div>
                <NavLink to={`/get_events/${this.props.eventId}`} onClick={this.localClickHandler} >
                    <h1 >{this.props.eventName}</h1>
                    <img src={this.props.eventImage} style={{ maxWidth: "200px", maxHeight: "115px" }} />
                </NavLink>
            </div>
        )
    }
}

export default EventCard