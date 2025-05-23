import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserMsg } from './UserMsg.jsx'
import { Popup } from './Popup.jsx'
import { useState, useEffect, useRef } from 'react'
import { LoginSignup } from './LoginSignup.jsx'
import { useSelector } from 'react-redux'
import { userAction } from '../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { UserMenu } from './UserMenu.jsx'

export function AppHeder(props) {

    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
    const navigate = useNavigate()

    function onTogglePopup() {
        setIsPopupOpen(!isPopupOpen)
    }

    function onToggleIsSignup() {
        setIsSignup(!isSignup)
    }

    function onToggleIsMobileNavOpen() {
        setIsMobileNavOpen(!isMobileNavOpen)
    }

    function handleNavClick() {
        setIsMobileNavOpen(false)
    }

    async function onLogout() {
        try {
            await userAction.logout()
            showSuccessMsg('Logged out successfully')
            navigate('/')
        } catch (err) {
            console.log(err)
            showErrorMsg(`Couldn't logout...`)
        }
    }

    return (
        <header className='main-header main-layout'>
            <div className='flex justify-between align-center '>
                <NavLink to="/" > <h1>Mister Toys</h1></NavLink>

                <nav className={isMobileNavOpen ? 'nav-open' : ''}>
                    <button
                        className='mobile-nav-btn'
                        onClick={handleNavClick}
                    >X
                    </button>

                    <NavLink to="/" onClick={handleNavClick}>Home</NavLink>
                    <NavLink to="/about" onClick={handleNavClick} >About</NavLink>
                    <NavLink to="/toy" onClick={handleNavClick} >Toys</NavLink>
                    <NavLink to="/dashboard" onClick={handleNavClick}>Dashboard</NavLink>
                    <NavLink to="/review" onClick={handleNavClick}>Reviews</NavLink>
                </nav>

                <div className='user-btn-container'>
                    {loggedinUser
                        ? <button className='user-btn'>
                            <img className='profile-img'
                                src={loggedinUser?.profileImg ? loggedinUser.profileImg : '/src/assets/img/profile-img.jpg'}
                                alt="profile image" />
                            <span>{loggedinUser?.fullname}</span>
                            <div className='user-menu-wrapper'>
                                <UserMenu loggedinUser={loggedinUser} onLogout={onLogout} />
                            </div>
                        </button>
                        : <button className='user-btn' onClick={onTogglePopup}>
                            <div className='profile-Symbol'>👤</div>
                            <span> Login / Signup</span>
                        </button>
                    }

                </div>

                <button
                    className='mobile-nav-btn'
                    onClick={onToggleIsMobileNavOpen}
                >
                    <img src='/src/assets/img/bar.svg' alt="bar" />
                </button>


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

            <div
                className={`mobile-nav-black-wrapper ${isMobileNavOpen ? 'active' : ''}`}
                onClick={onToggleIsMobileNavOpen}
            ></div>

            <UserMsg />
        </header >
    )
}