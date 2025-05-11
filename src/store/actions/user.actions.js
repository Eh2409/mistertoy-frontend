import { authService } from "../../services/auth.service.js"
import { store } from "../store.js"
import { SET_USER } from "../reducers/user.reducer.js"

export const userAction = {
    login,
    signup,
    logout
}

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
