import React from 'react'
import { connect } from 'react-redux'
import history from '../History/history'
import { withRouter } from 'react-router'
import { setUser } from '../Redux/actions'
import '../Style/login.scss'

class SignUp extends React.Component {

    state = {
        username: "",
        password: "",
        name: "",
        zipcode: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()


        fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify({ user: this.state })
        })
            .then(response => response.json())
            .then(data => {

                let loginState = {
                    username: this.state.username,
                    password: this.state.password
                }
                console.log("login state", data)
                this.props.user(loginState, this.props.history)
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="form">
                <div className="form-panel">
                    <div className="form-header">
                        <h1> Sign Up </h1>
                    </div>
                    <div className="form-content"></div>
                    <form onSubmit={this.submitHandler}>
                        <div className="form-group">
                            <label>Username </label>
                            <input type="text" name="username"  value={this.state.username} onChange={this.changeHandler} required/>
                        </div>
                        <div className="form-group">

                            <label> Password </label>
                            <input type="password" name="password"  value={this.state.password} onChange={this.changeHandler} required/>
                        </div>
                        <div className="form-group">

                            <label> Name </label>
                            <input type="text" name="name"  value={this.state.name} onChange={this.changeHandler} required/>
                        </div>
                        <div className="form-group">

                            <label> Zipcode </label>
                            <input type="text" name="zipcode"  value={this.state.zipcode} onChange={this.changeHandler} required/>
                        </div>
                        <div className="form-group">
                            <button> Sign Up </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function mdp(dispatch) {
    return (
        {
            user: (userObj, history) => dispatch(setUser(userObj, history)),
        }
    )
}

export default withRouter(connect(null, mdp)(SignUp))