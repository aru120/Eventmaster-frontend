import React from 'react'
import { connect } from 'react-redux'
import EventCard from '../Components/EventCard'
import { initialFetch } from '../Redux/actions';
import { Route, Switch } from 'react-router-dom'
import EventDetails from '../Components/EventDetails';
import {addFavorite} from '../Redux/actions'


class EventList extends React.Component {

    componentDidMount() {

        if(this.props.user_state){
          this.props.initialFetch(this.props.user_state.user.zipcode)  
        }else{
            this.props.initialFetch()
        }

        const data = localStorage.getItem("savedEvents")
        
        if(data){
          const parsedData = JSON.parse(data)
          console.log(data)
            this.props.addToFavs(parsedData)
        }


    }

   

    renderHomePageEvents = () => {


       if (this.props.initialEvents){

           return this.props.initialEvents.map(event => <EventCard key={event.id} eventId={event.id} eventObj={event} eventDate={event.dates.start["localDate"]} eventObj={event} eventName={event.name} eventImage={event.images[0].url} />)
       }
       else {
           return <h2>No Events Nearby</h2>
       }
    }


    render() {
        // console.log("IN EVENT LIST",this.props.user_state.user.zipcode)
        return (
            <>
                <Switch>
                    <Route path="/get_events/:id" render={(routerProps) => {
                        console.log("Router Props:", routerProps)
                        let foundEventObj
                        let favEventObj
                        let eventId

                        console.log("1",this.props.initialEvents["events"])
                        console.log("2",this.props.savedEvents)



                        if(this.props.initialEvents["events"]){
                            eventId = (routerProps.match.params.id)
                            foundEventObj = this.props.initialEvents["events"].find(event => event.id === eventId)
                        }

                        if(this.props.savedEvents){
                            eventId = (routerProps.match.params.id)
                            favEventObj = this.props.savedEvents.find(event => event.ticketmasterid === eventId)
                        }

                        let mergeArray = this.props.initialEvents["events"].concat(this.props.savedEvents[0])
                        console.log("MERGE ARRAY", mergeArray)
                    //    console.log("ticketmasterid",eventId)
                    //    console.log("foundEventObj",foundEventObj)
                    //    console.log("foundfavoriteObj", favEventObj)
                    //    console.log("eventId",eventId)
                        
                        
                         
                        let event
                        if (foundEventObj) {
                            let attractions = foundEventObj["_embedded"].attractions.map(artist => artist.name)
                            event = <EventDetails key={foundEventObj.id} eventName={foundEventObj.name} attractions={attractions}eventObj={foundEventObj} eventDate={foundEventObj.dates.start["localDate"]} eventTime={foundEventObj.dates.start["localTime"]} eventImg={foundEventObj.images[0].url}/>
                            
                        }
                        else if(favEventObj){
                            event = <EventDetails key={favEventObj.id} eventObj={favEventObj} eventName={favEventObj.title} eventImg={favEventObj.image} eventDate={favEventObj.date} eventTime={favEventObj.time} attractions={favEventObj.artists} />
     

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