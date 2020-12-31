import { NavLink } from 'react-router-dom'

function Navbar() {

    return (
        <>
            <NavLink to="/get_events">
                <h5> Home Page </h5>
            </NavLink>

            <NavLink to="/signup">
                <h5> Sign Up </h5>
            </NavLink>

            <NavLink to="/login">
                <h5> Log In </h5>
            </NavLink>
        </>
    )
}

export default Navbar