import React from 'react'
import { connect } from 'react-redux'
import {setUser} from '../Redux/actions'
import { Redirect } from 'react-router-dom'
import history from '../History/history'
import { withRouter } from 'react-router'

class LogIn extends React.Component{

    state ={
        username: "",
        password: ""

    }

  

    logInHandler =(e) => {
        e.preventDefault()

        this.props.user(this.state)
        
        //         accepts: "application/json"
        //     },
        //     body: JSON.stringify({user: this.state})
        // })
        //     .then(response => response.json())
        //     .then(console.log)
        //     .catch(console.log)
        history.push("/get_events")

    }

    changeHandler = (e) => {
      
        this.setState({ [e.target.name]: e.target.value })
    }

    render(){
        return(
            <form onSubmit={this.logInHandler}>
            <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler} />
            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} />
            <button>Log In</button>
            </form>
        )
    }
}

function mdp(dispatch){
    return(
        {
        user: (userObj) => dispatch(setUser(userObj))
    }
    )
}


export default connect(null,mdp)(LogIn)