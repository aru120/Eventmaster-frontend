import logo from './logo.svg';
import './App.scss';
import { connect } from 'react-redux'
import { updateUser } from './Redux/actions'

// import EventList from './Containers/EventList'
import Header from './Components/Header'
import Navbar from './Components/Navbar'
import React from 'react'
// import {initialFetch}  from './Redux/actions';
import './Style/eventlist.scss'

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
          this.props.user(data)
        }

        )
    }
  }


  render() {

    return (
      <>
        <nav>
          <Navbar />
        </nav>
        <div class="mainbody">
          <Header />
        </div>
      </>
    );
  }
}

function mdp(dispatch) {
  return (
    {
      user: (userObj) => dispatch(updateUser(userObj))
    }
  )
}

export default connect(null, mdp)(App);
