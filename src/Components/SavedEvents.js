import React from 'react'
import { connect } from 'react-redux'
import EventCard from './EventCard'

class SavedEvents extends React.Component {

    state = {
        saved_events: []
    }

    componentDidMount() {

        const user_id = localStorage.getItem("user_id")

        fetch(`http://localhost:3000/api/users/${user_id}`)
            .then(r => r.json())
            .then(data => {
                this.setState({ saved_events: data.events })
            })

    }

    renderSavedEvents = () => {
        return this.state.saved_events.map(event => <EventCard key={event.ticketmasterid} eventId={event.ticketmasterid} eventObj={event} eventName={event.title} eventImage={event.image} />)
    }

    render() {
        console.log("SAVED EVENTS",this.state.saved_events)
        return (
            <>
                <h1>Saved Events </h1>
                {this.state.saved_events.length === 0 ? <h2>Loading Saved Events...</h2> :
                    <>
                        {this.renderSavedEvents()}
                    </>
                }
            </>
        )
    }
}

function msp(state) {
    return ({
        user_state: state.user_state
    })
}
export default connect(msp)(SavedEvents)