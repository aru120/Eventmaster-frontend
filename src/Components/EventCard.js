import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Style/eventcard.scss'


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
            <div className="card">
                <img className="card__photo" src={this.props.eventObj.image} />
                <header className="card__container">
                    <NavLink to={`/get_events/${this.props.eventObj.ticketmasterid}`}  >
                        <h1 className="event-card__title event-card__fancy-font">{this.props.eventObj.title}</h1>
                    </NavLink>
                    <p> Date: {this.dateHandler(this.props.eventObj.date)}</p>
                </header>
            </div>
        )
    }
}

export default EventCard