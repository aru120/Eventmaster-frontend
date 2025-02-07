import React from 'react'
import { connect } from 'react-redux'
import EventCard from '../Components/EventCard'
import { initialFetch } from '../Redux/actions';
import { Route, Switch } from 'react-router-dom'
import EventDetails from '../Components/EventDetails';
import { addFavorite } from '../Redux/actions'
import '../Style/eventlist.scss'
import '../App.scss'

class EventList extends React.Component {

    componentDidMount() {
        // const data = localStorage.getItem("token")
        
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


        if (this.props.initialEvents.length > 0) {

            return this.props.initialEvents.map(event => <li className="card_list-item"><EventCard key={event.id} eventObj={event} /></li>)
        }
        else {
            return <h2 className="mainheader">No Events Nearby</h2>
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
        console.log("Event State", this.props.initialEvents)
        return (
            <div >
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
                          return  event = <EventDetails key={mergeEventObj.id} eventObj={mergeEventObj} />
                        }
                
                    }} />

                    <Route exact path="/get_events" render={() => {
                        return (
                            <> 
                                {!(this.props.initialEvents) ? <h1>Loading...</h1> :
                                    <>
                                        <h1 className="mainheader sign__word"> Nearby Events </h1>
                                        <ul className="card_list">
                                        {this.renderHomePageEvents()}
                                        </ul>
                                    </>
                                }
                            </>
                        )
                    }} />

                </Switch>
            </div>
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