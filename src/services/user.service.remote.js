import { httpService } from "./http.service.js";

export const userService = {
    query,
    getById,
    remove,
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

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
        isAdmin: false
    }
}