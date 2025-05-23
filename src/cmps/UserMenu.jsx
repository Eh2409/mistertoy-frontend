import { Link } from 'react-router-dom'

export function UserMenu({ loggedinUser, onLogout }) {

    return <section className="user-menu">
        <header className="user-menu-header">
            <img
                src={loggedinUser?.profileImg ? loggedinUser.profileImg : '/src/assets/img/profile-img.jpg'}
                alt="profile image"
                className="profile-image" />
            <div className="user-greeting flex flex-column">
                <span>Welcome back {loggedinUser.fullname}</span>
                <span className="logout-btn" onClick={onLogout}>Logout</span>
            </div>
        </header>
        <ul className='menu-btns'>
            <Link to={`/user/${loggedinUser?._id}`} >
                <li>
                    My Profile
                </li>
            </Link >
            {loggedinUser?.isAdmin && <Link to={`/user`} >
                <li>
                    Users
                </li>
            </Link >}
        </ul>
    </section>
}