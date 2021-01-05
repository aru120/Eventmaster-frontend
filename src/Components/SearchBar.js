import React from 'react'
import { connect } from 'react-redux'
import { initialFetch } from '../Redux/actions'

class SearchBar extends React.Component {

    state = {
        searchZipcode: ""
    }

    changeHandler = (e) => {
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }

    searchHandler = (e) => {
        e.preventDefault()
        console.log("SEARCH BAR",this.state.searchZipcode)
        this.props.initialFetch(this.state.searchZipcode)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.searchHandler}>
                    <input type="number" name="searchZipcode" placeholder="search" value={this.state.searchZipcode} onChange={this.changeHandler} />
                    <button> Search</button>
                </form>
            </div>
        )
    }
}

function mdp(dispatch) {
    return (
        {
            initialFetch: (zipcode) => dispatch(initialFetch(zipcode))
        }
    )
}

export default connect(null, mdp)(SearchBar)