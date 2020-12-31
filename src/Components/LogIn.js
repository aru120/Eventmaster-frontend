import React from 'react'
import { connect } from 'react-redux'
import {setUser} from '../Redux/actions'

class LogIn extends React.Component{

    state ={
        username: "",
        password: ""

    }

    holdState = () =>{
       let currentstate = this.state
        return currentstate
    }

    logInHandler =(e) => {
        e.preventDefault()
        
        this.props.user(this.holdState())


        // fetch("http://localhost:3000/api/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         accepts: "application/json"
        //     },
        //     body: JSON.stringify({user: this.state})
        // })
        //     .then(response => response.json())
        //     .then(console.log)
        //     .catch(console.log)


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
        user: () => dispatch(setUser({user:this.state}))
    }
    )
}


export default connect(null,mdp)(LogIn)