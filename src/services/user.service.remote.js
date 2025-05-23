import { httpService } from "./http.service.js";

const KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    query,
    getById,
    remove,
    update,
    getEmptyCredentials
}

const BASE_URL = 'user/'

async function query() {
    const users = await httpService.get(BASE_URL)
    return users
}

async function getById(userId) {
    const user = await httpService.get(BASE_URL + userId)
    return user
}

async function remove(userId) {
    const res = await httpService.delete(BASE_URL + userId)
    return res
}

async function update(user) {

    const res = await httpService.put(BASE_URL + user?._id, user)
    _setLoggedInUser(res)
    console.log('res:', res)
    return res
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
        profileImg: '',
        isAdmin: false
    }
}

function _setLoggedInUser(user) {

    const userToSave = {
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        isAdmin: user.isAdmin,
        profileImg: user.profileImg
    }

    sessionStorage.setItem(KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}
