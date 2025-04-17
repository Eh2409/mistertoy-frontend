import { Link, NavLink } from 'react-router-dom'
import { UserMsg } from './UserMsg.jsx'

export function AppHeder(props) {

    return (
        <header>
            <h1>mister toys</h1>

            <nav>
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/toy" >Toys</NavLink>
            </nav>
            <UserMsg />
        </header>
    )
}