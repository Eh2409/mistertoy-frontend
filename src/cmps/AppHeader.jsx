import { Link, NavLink } from 'react-router-dom'
export function AppHeder(props) {

    return (
        <header>
            <h1>mister toys</h1>

            <nav>
                <NavLink to="/" >Home</NavLink>
            </nav>
        </header>
    )
}