
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { userAction } from '../store/actions/user.actions.js'
import { Loader } from '../cmps/Loader.jsx'
import { UserList } from '../cmps/UserList.jsx'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { useNavigate } from "react-router-dom"


export function UserIndex(props) {

    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const users = useSelector(storeState => storeState.userModule.users)
    const isLoad = useSelector(storeState => storeState.toyModule.isLoad)
    const navigate = useNavigate()

    console.log(users);

    useEffect(() => {
        if (loggedinUser?.isAdmin) {
            loadUsers()
        } else {
            showErrorMsg('You are not authorized to access this page.')
            navigate('/')
        }
    }, [])

    async function loadUsers() {
        try {
            await userAction.loadUsers()
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot load users')
        }
    }


    async function onRemoveUser(userId) {
        try {
            await userAction.removeUser(userId)
            showSuccessMsg('User removed')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot remove user')
        } finally {
            loadUsers()
        }
    }

    return (
        <section className="user-index">
            {isLoad
                ? <Loader />
                : <UserList
                    users={users}
                    onRemoveUser={onRemoveUser}
                    loggedinUser={loggedinUser}
                />
            }
        </section>
    )
}