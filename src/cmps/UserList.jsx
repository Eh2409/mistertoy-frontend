
export function UserList({ users, onRemoveUser, loggedinUser }) {
    return (
        <ul className='user-list'>
            {users.length > 0 &&
                users.map(user => {
                    return <li className="user-preview" key={user._id} >
                        <div className="user-info">
                            <img
                                className="profile-image"
                                src={user?.profileImg ? user.profileImg : '/src/assets/img/profile-img.jpg'}
                                alt="profile-image" />
                            <div className="flex flex-column justify-center">
                                <span><b>Username:</b> {user.username}</span>
                                <span><b>Full Name:</b> {user.fullname}</span>
                            </div>
                        </div>
                        {loggedinUser?.isAdmin &&
                            <button onClick={() => onRemoveUser(user._id)}>Remove</button>
                        }
                    </li>
                })
            }
        </ul>
    )
}