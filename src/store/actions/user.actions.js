// import { authService } from "../../services/auth.service.js"
import { authService } from "../../services/auth.service.remote.js"
import { userService } from "../../services/user.service.remote.js"

import { store } from "../store.js"
import { SET_USER, SET_USERS, REMOVE_USER, UPDATE_USER } from "../reducers/user.reducer.js"
import { SET_LOADER } from "../reducers/toy.reducer.js"

export const userAction = {
    login,
    signup,
    logout,
    loadUsers,
    removeUser,
    updateUser
}

// auth

async function login(credentials) {
    try {
        const user = await authService.login(credentials)
        store.dispatch({ type: SET_USER, user })
    } catch (err) {
        console.log('user action => Cannot login', err)
        throw err
    }
}

async function signup(credentials) {
    try {
        const user = await authService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
    } catch (err) {
        console.log('user action => Cannot signup', err)
        throw err
    }
}

async function logout() {
    try {
        await authService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.log('user action => Cannot logout', err)
        throw err
    }
}

// user 

async function loadUsers() {
    store.dispatch({ type: SET_LOADER, isLoad: true })
    try {
        const users = await userService.query()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('user actions => Cannot load users:', err)
        throw err
    } finally {
        setTimeout(() => {
            store.dispatch({ type: SET_LOADER, isLoad: false })
        }, 350)
    }
}

async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })

    } catch (err) {
        console.log('user actions => Cannot remove user:', err)
        throw err
    }
}

async function updateUser(user) {
    try {
        const updatedUser = await userService.update(user)
        store.dispatch({ type: UPDATE_USER, user: updatedUser })
    } catch (err) {
        console.log('user actions => Cannot update user:', err)
        throw err
    }
}

