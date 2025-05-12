// import { authService } from "../../services/auth.service.js"
import { authService } from "../../services/auth.service.remote.js"
import { userService } from "../../services/user.service.remote.js"

import { store } from "../store.js"
import { SET_USER, SET_USERS, REMOVE_USER } from "../reducers/user.reducer.js"

export const userAction = {
    login,
    signup,
    logout,
    loadUsers,
    removeUser
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
    try {
        const users = await userService.query()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('user actions => Cannot load users:', err)
        throw err
    }
}

async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })

    } catch (err) {
        console.log('toy actions => Cannot remove toy:', err)
        throw err
    }
}