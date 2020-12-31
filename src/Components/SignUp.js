import React from 'react'

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
            body: JSON.stringify({user: this.state})
        })
            .then(response => response.json())
            .then(console.log)
            .catch(console.log)
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler} />
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} />
                <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.changeHandler} />
                <input type="text" name="zipcode" placeholder="zipcode" value={this.state.zipcode} onChange={this.changeHandler} />
                <button> Sign Up </button>
            </form>
        )
    }
}

export default SignUp