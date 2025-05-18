import { httpService } from './http.service.js'

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getLabels,
    getDefaultFilter,
    getFilterFromSearchParams,
    getCahrtsData,
    getEmptyMsg,
    addMsg,
    removeMsg
}

const BASE_URL = 'toy/'

async function query(filterBy) {
    const res = await httpService.get(BASE_URL, filterBy)
    return res
}

async function get(toyId) {
    const res = await httpService.get(BASE_URL + toyId)
    return res
}

async function remove(toyId) {
    const res = await httpService.delete(BASE_URL + toyId)
    return res
}

async function save(toy) {
    const method = toy._id ? 'put' : 'post'
    const toyId = toy._id || ''

    try {
        const res = await httpService[method](BASE_URL + toyId, toy)
        return res
    } catch (err) {
        console.log(err)
        throw err
    }

}

async function getCahrtsData() {
    const res = await httpService.get(BASE_URL + 'charts')
    return res
}

async function getLabels() {
    const res = await httpService.get(BASE_URL + 'labels')
    return res
}

function getEmptyToy() {
    return {
        name: '',
        imgUrl: '',
        price: '',
        manufacturer: '',
        type: [],
        brand: '',
        releaseYear: '',
        description: '',
        createdAt: 0,
        inStock: true,
        msgs: []
    }
}
function getDefaultFilter() {
    return {
        name: '',
        price: 0,
        manufacturer: [],
        type: [],
        brand: [],
        inStock: undefined,
        sortType: 'createdAt',
        sortDir: -1,
        pageIdx: 0
    }
}

function getFilterFromSearchParams(searchParams) {

    const defaultFilterBy = { ...getDefaultFilter() }
    const filterBy = {}

    for (const field in defaultFilterBy) {
        if (field === 'price' || field === 'sortDir' || field === 'pageIdx') {
            filterBy[field] = +searchParams.get(`${field}`) || defaultFilterBy[field]
        } else if (field === 'manufacturer' || field === 'type' || field === 'brand') {
            filterBy[field] = searchParams.getAll(field) || defaultFilterBy[field]
        } else if (field === 'inStock') {
            var value = searchParams.get('inStock') || defaultFilterBy[field]
            switch (value) {
                case 'true':
                    filterBy[field] = true
                    break;
                case 'false':
                    filterBy[field] = false
                    break;
                case '':
                    filterBy[field] = undefined
                    break;
            }
        } else {
            filterBy[field] = searchParams.get(`${field}`) || defaultFilterBy[field]
        }
    }

    return filterBy
}

/// msg

function getEmptyMsg() {
    return {
        txt: '',
    }
}

async function addMsg(toyId, msg) {
    const route = `${toyId}/msg`
    const savedMsg = await httpService.post(BASE_URL + route, msg)
    return savedMsg
}

async function removeMsg(toyId, msgId) {
    const route = `${toyId}/msg/${msgId}`
    const savedMsg = await httpService.post(BASE_URL + route)
    return savedMsg
}
