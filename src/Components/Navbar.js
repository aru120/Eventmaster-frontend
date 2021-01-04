import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'

class Navbar extends React.Component {

    logout = ()=>{
            
    }

    render(){
        console.log(this.props)
        return (
           
            <>
                <NavLink to="/get_events">
                    <h5> Home Page </h5>
                </NavLink>
          
    {this.props.user_state ? 
            <>
            <h5>{this.props.user_state.user.name}</h5> 
            <NavLink to="/saved_events">
                <h5> Saved Events </h5>
            </NavLink>
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
            
            
               
            </>
        )
    }

}

function msp(state){
    return({
        user_state: state.user_state
    })
}

export default connect(msp)(Navbar)