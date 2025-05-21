import { httpService } from './http.service.js'

export const reviewService = {
    query,
    get,
    remove,
    save,
    getEmptyReview,
    getDefaultFilter,
}

const BASE_URL = 'review/'

async function query(filterBy) {
    const res = await httpService.get(BASE_URL, filterBy)
    return res
}

async function get(reviewId) {
    const res = await httpService.get(BASE_URL + reviewId)
    return res
}

async function remove(reviewId) {
    const res = await httpService.delete(BASE_URL + reviewId)
    return res
}

async function save(review) {
    const method = review._id ? 'put' : 'post'
    const reviewId = review._id || ''

    try {
        const res = await httpService[method](BASE_URL + reviewId, review)
        return res
    } catch (err) {
        console.log(err)
        throw err
    }

}

function getEmptyReview() {
    return {
        byUserId: '',
        aboutToyId: '',
        txt: ''
    }
}
function getDefaultFilter() {
    return {
        byUserId: '',
        aboutToyId: '',
    }
}


