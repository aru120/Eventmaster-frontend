import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'
import SearchBar from './SearchBar'
import '../Style/navbar.scss'
import '../App.scss'
import {initialFetch} from '../Redux/actions'
import '../Style/icons.scss'

class Navbar extends React.Component {

    logoutHandler = () => {
        localStorage.clear()
        window.location.href = '/get_events'
    }

    checkUser = () => {
        if (this.props.user_state) {
            this.props.initialFetch(this.props.user_state.user.zipcode)
        }
    }



    render() {
        console.log(this.props)
        return (

            <div className="menu-fixed">


                <div className="sign__word logo">
                    <h1> Eventify.io </h1>
                </div>
                {this.props.user_state ? (<p className="pmenu"> {this.props.user_state.user.name}</p>) : <p className="pmenu"> Welcome </p>}
                <br/>
                <SearchBar />
                <br/>
                <ul className="menu">
                    <NavLink to="/get_events" onClick={this.checkUser}>
                        <li><a href="#" class="active about"></a><h4>Home</h4></li>
                    </NavLink>

                    {this.props.user_state ?
                        <>
                            {/* <h5>{this.props.user_state.user.name}</h5> */}
                            <NavLink to="/saved_events">
                                <li><a href="#" class="active saved"></a><h4> My Events </h4></li>
                            </NavLink>

                            <li onClick={this.logoutHandler}> <a href="#" class="active logout"></a><h4>Log Out</h4></li>

                        </>
                        :
                        <>
                            <NavLink to="/signup">
                                <li><a href="#" class="active signin"></a><h4> Sign Up </h4></li>
                            </NavLink>
                            <NavLink to="/login">
                                <li><a href="#" class="active login"></a><h4> Log In </h4></li>
                            </NavLink>
                        </>
                    }
                </ul>



            </div>
        )
    }

}

function msp(state) {
    return ({
        user_state: state.user_state
    })
}

function mdp(dispatch) {
    return (
        {
            initialFetch: (zipcode) => dispatch(initialFetch(zipcode)),

        }
    )
}

export default connect(msp, mdp)(Navbar)