import React from 'react'
import { NavLink } from 'react-router-dom'


class EventCard extends React.Component {


    render() {
        return (
            <div>
                <NavLink to={`/get_events/${this.props.eventObj.id}`} onClick={this.localClickHandler} >
                    <h1 >{this.props.eventObj.name}</h1>
                    <img src={this.props.eventObj.images[0].url} style={{ maxWidth: "200px", maxHeight: "115px" }} />
                </NavLink>
            </div>
        )
    }
}

export default EventCard