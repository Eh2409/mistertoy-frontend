
// import { toyService } from '../../services/toy.service.js'
import { toyService } from '../../services/toy.service.remote.js'

import { store } from '../store.js'
import { SET_TOYS, REMOVE_TOY, ADD_TOY, UPDATE_TOY, SET_LOADER, SET_MAX_PAGE_COUNT } from "../reducers/toy.reducer.js"

export const toyActions = {
    loadToys,
    removeToy,
    saveToy,
}

function loadToys(filterBy) {
    store.dispatch({ type: SET_LOADER, isLoad: true })
    return toyService.query(filterBy)
        .then(({ toys, maxPageCount }) => {
            store.dispatch({ type: SET_TOYS, toys })
            store.dispatch({ type: SET_MAX_PAGE_COUNT, maxPageCount })
        })
        .catch(err => {
            console.log('toy actions => Cannot load toys:', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_LOADER, isLoad: false })
        })
}

function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => store.dispatch({ type: REMOVE_TOY, toyId: toyId }))
        .catch(err => {
            console.log('toy actions => Cannot remove toy:', err)
            throw err
        })
}
function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(toyToSave => store.dispatch({ type, toy: toyToSave }))
        .catch(err => {
            console.log('toy actions => Cannot save toy:', err)
            throw err
        })
}

