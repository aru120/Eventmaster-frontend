import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'
import SearchBar from './SearchBar'
import '../Style/navbar.scss'
import '../App.scss'
import {initialFetch} from '../Redux/actions'

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


                <div className="logo">
                    <h1> CONCERT.io </h1>
                </div>
                {this.props.user_state ? (<p className="pmenu"> {this.props.user_state.user.name}</p>) : <p className="pmenu"> Welcome </p>}
                <br/>
                <SearchBar />

                <ul className="menu">
                    <NavLink to="/get_events" onClick={this.checkUser}>
                        <li><h4>Home</h4></li>
                    </NavLink>

                    {this.props.user_state ?
                        <>
                            {/* <h5>{this.props.user_state.user.name}</h5> */}
                            <NavLink to="/saved_events">
                                <li><h4> Saved Events </h4></li>
                            </NavLink>

                            <li onClick={this.logoutHandler}> <h4>Log Out</h4></li>

                        </>
                        :
                        <>
                            <NavLink to="/signup">
                                <li><h4> Sign Up </h4></li>
                            </NavLink>
                            <NavLink to="/login">
                                <li><h4> Log In </h4></li>
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