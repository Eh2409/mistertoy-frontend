import { authService } from "../../services/auth.service.js"
import { store } from "../store.js"
import { SET_USER } from "../reducers/user.reducer.js"

export const userAction = {
    login,
    signup,
    logout
}

function login(credentials) {
    return authService.login(credentials)
        .then(user =>
            store.dispatch({ type: SET_USER, user })
        )
        .catch(err => {
            console.log('user action => Cannot login', err)
            throw err
        })
}

function signup(credentials) {
    return authService.signup(credentials)
        .then(user =>
            store.dispatch({ type: SET_USER, user })
        )
        .catch(err => {
            console.log('user action => Cannot signup', err)
            throw err
        })
}

function logout() {
    return authService.logout()
        .then(() =>
            store.dispatch({ type: SET_USER, user: null })
        )
        .catch(err => {
            console.log('user action => Cannot logout', err)
            throw err
        })
}
