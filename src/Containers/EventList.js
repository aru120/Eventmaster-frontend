import React from 'react'
import { connect } from 'react-redux'
import EventCard from '../Components/EventCard'
import { initialFetch } from '../Redux/actions';
import { Route, Switch } from 'react-router-dom'

class EventList extends React.Component {

    componentDidMount() {
        this.props.initialFetch()
    }

    renderHomePageEvents = () => {
        console.log(this.props.initialEvents["events"])
        return this.props.initialEvents["events"].map(event => <EventCard key={event.id} eventObj={event} />)
    }
    render() {
        return (
            <>
                <Switch>
                    <Route path="/get_events/:id" render={(routerProps) => {
                        console.log("Router Props:", routerProps)

                        const eventId = (routerProps.match.params.id)
                        const foundEventObj = this.props.initialEvents["events"].find(event => event.id === eventId)
                         
                        let event
                        if (foundEventObj) {
                            event = <EventCard key={foundEventObj.id} eventObj={foundEventObj} />
                        }
                        else {
                            event = <h2>Loading...</h2>
                        }

                        return event
                    }} />

                    <Route path="/get_events" render={() => {
                        return (
                            <>
                                {!(this.props.initialEvents["events"]) ? <h1>Loading...</h1> :
                                    <>
                                        <h1> Hello </h1>
                                        {this.renderHomePageEvents()}
                                    </>
                                }
                            </>
                        )
                    }} />
                </Switch>
            </>
        )
    }
}

function msp(state) {
    return ({
                    initialEvents: state.initialEvents,
    })
}
function mdp(dispatch) {
    return (
                {
                    initialFetch: () => dispatch(initialFetch())
        }
    )
}

export default connect(msp, mdp)(EventList)