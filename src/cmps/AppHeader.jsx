import { Link, NavLink } from 'react-router-dom'
import { UserMsg } from './UserMsg.jsx'
import { Popup } from './Popup.jsx'
import { useState, useEffect, useRef } from 'react'
import { LoginSignup } from './LoginSignup.jsx'
import { useSelector } from 'react-redux'
import { userAction } from '../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


export function AppHeder(props) {

    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [isSignup, setIsSignup] = useState(false)

    console.log('Here:', loggedinUser)

    function onTogglePopup() {
        setIsPopupOpen(!isPopupOpen)
    }
    function onToggleIsSignup() {
        setIsSignup(!isSignup)
    }

    async function onLogout() {
        try {
            await userAction.logout()
            showSuccessMsg('Logged out successfully')
        } catch (err) {
            console.log(err)
            showErrorMsg(`Couldn't logout...`)
        }
    }

    return (
        <header className='main-header main-layout'>
            <div className='flex justify-between align-center '>
                <NavLink to="/" > <h1>Mister Toys</h1></NavLink>

                <nav className='flex justify-between align-center '>
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    <NavLink to="/review" >Reviews</NavLink>
                </nav>

                <div>
                    {loggedinUser && <span>{loggedinUser.fullname}</span>}
                    <button onClick={loggedinUser ? onLogout : onTogglePopup}>
                        {loggedinUser ? 'Logout' : "Login / Signup"}
                    </button>
                </div>

                <Link to={`/user/${loggedinUser?._id}`} >
                    <div>pro</div>
                </Link >

                {isPopupOpen && !loggedinUser &&
                    <Popup
                        onTogglePopup={onTogglePopup}
                        header={<h2>{isSignup ? 'Singup' : "Login"}</h2>}
                    >
                        <LoginSignup
                            onTogglePopup={onTogglePopup}
                            isSignup={isSignup}
                            onToggleIsSignup={onToggleIsSignup} />
                    </Popup>}

            </div>
            <UserMsg />
        </header >
    )
}