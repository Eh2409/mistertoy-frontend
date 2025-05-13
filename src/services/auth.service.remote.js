import { httpService } from "./http.service.js"

export const authService = {
    login,
    signup,
    logout,
    getLoggedInUser,
}

const KEY_LOGGEDIN_USER = 'loggedinUser'
const BASE_URL = 'auth/'

async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        return _setLoggedInUser(user)
    } catch (err) {
        console.error('Login failed:', err)
        throw err
    }
}

async function signup({ username, password, fullname }) {
    try {
        const newUser = await httpService.post(BASE_URL + 'signup', { username, password, fullname })
        return _setLoggedInUser(newUser)
    } catch (err) {
        console.error('Signup failed:', err)
        throw err
    }
}

async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(KEY_LOGGEDIN_USER)
    } catch (error) {
        console.log('Could not logout')
        throw error
    }
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(KEY_LOGGEDIN_USER))
}

function _setLoggedInUser(user) {

    const userToSave = {
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        isAdmin: user.isAdmin
    }

    sessionStorage.setItem(KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}
