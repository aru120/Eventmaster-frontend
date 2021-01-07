import logo from './logo.svg';
import './App.scss';
import { connect } from 'react-redux'
import { updateUser } from './Redux/actions'
import { withRouter } from 'react-router'

// import EventList from './Containers/EventList'
import Header from './Components/Header'
import Navbar from './Components/Navbar'
import React from 'react'
import {initialFetch}  from './Redux/actions';
import './Style/eventlist.scss'
import './Style/navbar.scss'

class App extends React.Component {

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch('http://localhost:3000/api/profile', {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(r => r.json())
        .then(data => {
          console.log(data)
          this.props.user(data)
          this.props.initialFetch(data.user.zipcode)


        }

        )
    }
  }


  render() {

    return (
      <div className="body">
        <nav className="cont" >
          <Navbar />
        </nav>
        <div className="mainbody">
          <Header />
        </div>
      </div>
    );
  }
}

function mdp(dispatch) {
  return (
    {
      user: (userObj) => dispatch(updateUser(userObj)),
      initialFetch: (zipcode) => dispatch(initialFetch(zipcode))
    }
  )
}

export default withRouter(connect(null, mdp)(App));
