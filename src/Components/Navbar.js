import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'
import SearchBar from './SearchBar'
import '../Style/navbar.scss'

class Navbar extends React.Component {

    logoutHandler = () =>{
        localStorage.clear()
        window.location.href = '/get_events'
    }

    render(){
        console.log(this.props)
        return (
           
            <div>
                <NavLink to="/get_events">
                    <h5> Home Page </h5>
                </NavLink>
                <SearchBar />
          
    {this.props.user_state ? 
            <>
            <h5>{this.props.user_state.user.name}</h5> 
            <NavLink to="/saved_events">
                <h5> Saved Events </h5>
            </NavLink>

            <button onClick={this.logoutHandler}> Log Out </button>

            </>
            :
            <>
             <NavLink to="/signup">
                    <h5> Sign Up </h5>
                </NavLink>
                <NavLink to="/login">
                    <h5> Log In </h5>
                </NavLink>
            </>
        }
            
            
               
            </div>
        )
    }

}

function msp(state){
    return({
        user_state: state.user_state
    })
}

export default connect(msp)(Navbar)