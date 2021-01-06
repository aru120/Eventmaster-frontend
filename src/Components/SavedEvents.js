import React from 'react'
import { connect } from 'react-redux'
import EventCard from './EventCard'



class SavedEvents extends React.Component {

 

    // componentDidMount() {
        
    //     // const user_id = localStorage.getItem("user_id")

    //     // fetch(`http://localhost:3000/api/users/${user_id}`)
    //     //     .then(r => r.json())
    //     //     .then(data => {
    //     //         this.props.addToFavs(data.events)
    //     //     })

    // }

    renderSavedEvents = () => {
        console.log(this.props.savedEvents)
        return this.props.savedEvents.map(event =>  <EventCard eventObj={event} key={event.id} />)
    }



    render() {
        console.log(this.props.savedEvents)
        return (
            <>
                <h1>Saved Events </h1>
                {this.props.savedEvents.length === 0 ? null :
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
        user_state: state.user_state,
        savedEvents: state.savedEvents
    })
}

// function mdp(dispatch){
//     return(
//         {
//         addToFavs: (eventObj) => dispatch(addFavorite(eventObj))
//     }
//     )
// }
export default connect(msp)(SavedEvents)

