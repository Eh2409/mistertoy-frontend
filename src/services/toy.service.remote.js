import Axios from 'axios'

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getLabels,
    getDefaultFilter,
    getFilterFromSearchParams
}

const BASE_URL = '//localhost:3030/api/toy/'

const axios = Axios.create({ withCredentials: true })


function query(filterBy) {
    console.log('Here:', filterBy)
    return axios.get(BASE_URL, { params: { ...filterBy } })
        .then(res => res.data)
}

function get(toyId) {
    return axios.get(BASE_URL + toyId).then(res => res.data)
}

function remove(toyId) {
    return axios.delete(BASE_URL + toyId).then(res => res.data)
}

function save(toy) {
    const method = toy._id ? 'put' : 'post'
    const toyId = toy._id || ''

    return axios[method](BASE_URL + toyId, toy).then(res => res.data)
        .catch(err => {
            console.log(err)
            throw err
        })
}

function getLabels() {
    return ['Dragon Ball Z', 'Goku', 'Anime', 'Vegeta', 'Frieza', 'Piccolo', 'Trunks', 'Android 18']
}

function getEmptyToy() {
    return {
        name: '',
        imgUrl: '',
        price: 0,
        labels: [],
        createdAt: 0,
        inStock: true,
    }
}
function getDefaultFilter() {
    return {
        name: '',
        price: 0,
        labels: [],
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
        } else if (field === 'labels') {
            filterBy[field] = searchParams.getAll('labels') || defaultFilterBy[field]
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

