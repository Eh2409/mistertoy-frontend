import { Link, NavLink } from 'react-router-dom'
import { UserMsg } from './UserMsg.jsx'

export function AppHeder(props) {

    return (
        <header className='main-header main-layout'>
            <div className='flex justify-between align-center '>
                <NavLink to="/" > <h1>Mister Toys</h1></NavLink>

                <nav className='flex justify-between align-center '>
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                </nav>
            </div>
            <UserMsg />
        </header>
    )
}