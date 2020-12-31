import { Route, Switch } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import EventList from '../Containers/EventList'
import SignUp from './SignUp'
import LogIn from './LogIn'
// import Navbar from 'react-router-dom'

function Header() {


    return (
        <div>
            <Switch>
                <>
                    <Route path="/get_events" component={EventList} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={LogIn} />
                </>
            </Switch>

        </div>
    )
}

export default Header
