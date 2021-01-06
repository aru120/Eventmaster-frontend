import React from 'react'
import { connect } from 'react-redux'
import EventCard from '../Components/EventCard'
import { initialFetch } from '../Redux/actions';
import { Route, Switch } from 'react-router-dom'
import EventDetails from '../Components/EventDetails';
import { addFavorite } from '../Redux/actions'


class EventList extends React.Component {

    componentDidMount() {
        // const data = localStorage.getItem("savedEvents")

        if (this.props.user_state) {
            this.props.initialFetch(this.props.user_state.user.zipcode)
            // this.props.addToFavs(data)
        } 
        // else if (this.props.user_state) {
        //     this.props.initialFetch(this.props.user_state.user.zipcode)
        // }
        else {
            this.props.initialFetch()
        }




    }



    renderHomePageEvents = () => {


        if (this.props.initialEvents) {

            return this.props.initialEvents.map(event => <EventCard key={event.id} eventObj={event} />)
        }
        else {
            return <h2>No Events Nearby</h2>
        }
    }

    filterArray = (array)=>{
        let flag = {}
        let arr = []
        array.forEach(eventObj => {
            if (!flag[eventObj.ticketmasterid]){
                flag[eventObj.ticketmasterid] = true;
                arr.push(eventObj)
            }
        } )
        return arr
    }


    render() {
        // console.log("IN EVENT LIST",this.props.user_state.user.zipcode)
        return (
            <>
                <Switch>
                    <Route path="/get_events/:id" render={(routerProps) => {
                        console.log("Router Props:", routerProps)
                        
                        let mergeEventObj
                        let eventId

                        console.log("1", this.props.initialEvents)
                        console.log("2", this.props.savedEvents)

                        const listOfEvents = this.props.initialEvents
                        const listOfSavedEvents = this.props.savedEvents

                        if (listOfEvents && listOfSavedEvents) {
                            eventId = (routerProps.match.params.id)
                            let mergeArray = listOfEvents.concat(listOfSavedEvents)
                            console.log("MERGE ARRAY", mergeArray)

                            let newMergeArr = this.filterArray(mergeArray)
                            console.log('NEW MERGE ARRAY:', newMergeArr)
                            mergeEventObj = newMergeArr.find(event => event.ticketmasterid === eventId)
                        }

                        // if (listOfEvents) {
                        //     eventId = (routerProps.match.params.id)
                        //     foundEventObj = listOfEvents.find(event => event.ticketmasterid === eventId)
                        // }

                        // if (listOfSavedEvents) {
                        //     eventId = (routerProps.match.params.id)
                        //     favEventObj = listOfSavedEvents.find(event => event.ticketmasterid === eventId)
                        // }

                        //    console.log("ticketmasterid",eventId)
                        //    console.log("foundEventObj",foundEventObj)
                        //    console.log("foundfavoriteObj", favEventObj)
                        //    console.log("eventId",eventId)



                        let event
                        if (mergeEventObj) {
                            // let attractions = foundEventObj["_embedded"].attractions.map(artist => artist.name)
                            event = <EventDetails key={mergeEventObj.id} eventObj={mergeEventObj} />
                        }
                        else {
                            event = <h2>Loading...</h2>
                        }



                        return event
                    }} />

                    <Route exact path="/get_events" render={() => {
                        return (
                            <>
                                {!(this.props.initialEvents) ? <h1>Loading...</h1> :
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
        user_state: state.user_state,
        savedEvents: state.savedEvents
    })
}
function mdp(dispatch) {
    return (
        {
            initialFetch: (zipcode) => dispatch(initialFetch(zipcode)),
            addToFavs: (eventObj) => dispatch(addFavorite(eventObj))

        }
    )
}

export default connect(msp, mdp)(EventList)