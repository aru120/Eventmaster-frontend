import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../Redux/actions'
import { Redirect } from 'react-router-dom'
import history from '../History/history'
import { withRouter } from 'react-router'
import { addFavorite } from '../Redux/actions'
import '../Style/login.scss'

class LogIn extends React.Component {

    state = {
        username: "",
        password: ""

    }



    logInHandler = (e) => {
        e.preventDefault()
        console.log("INSIDE LOGIN HISTORY", this.props.history)
        this.props.user(this.state, this.props.history)
        // let user = async () => { return this.props.user(this.state)}
        // user().then(this.props.history.push("/get_events")
        // )

    }

    changeHandler = (e) => {

        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="form">
                <div className="form-panel">
                <div className="form-header">
                    <h1> LOG IN</h1>
                </div>
                <div className="form-content">
                <form onSubmit={this.logInHandler} >
                    <div className="form-group">
                        
                      <label>Username </label> 
                      <input type="text" name="username"  value={this.state.username} onChange={this.changeHandler} required />
                    </div>
                    <div className="form-group">
                    <label>Password </label> 
                        <input type="password" name="password"  value={this.state.password} onChange={this.changeHandler} required />
                    </div>
                    <div className="form-group">
                        <button>Log In</button>

                    </div>
                </form>
                </div>
                </div>
            </div>
        )
    }
}

function mdp(dispatch) {
    return (
        {
            user: (userObj, history) => dispatch(setUser(userObj, history)),
            addToFavs: (eventObj) => dispatch(addFavorite(eventObj))
        }
    )
}


export default withRouter(connect(null, mdp)(LogIn))


