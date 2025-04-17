
import { toyService } from '../../services/toyService.js'
import { store } from '../store.js'
import { SET_TOYS, REMOVE_TOY, ADD_TOY, UPDATE_TOY } from "../reducers/toy.reducer.js"

export const toyActions = {
    loadToys,
    removeToy,
    saveToy,
}

function loadToys() {
    return toyService.query()
        .then(toys => store.dispatch({ type: SET_TOYS, toys: toys }))
        .catch(err => {
            console.log('toy actions => Cannot load toys:', err)
            throw err
        })
}

function removeToy(toyId) {
    return toyService.remove()
        .then(() => store.dispatch({ type: REMOVE_TOY, toyId: toyId }))
        .catch(err => {
            console.log('toy actions => Cannot remove toy:', err)
            throw err
        })
}
function saveToy(toy) {
    const type = toy._id ? ADD_TOY : UPDATE_TOY
    return toyService.save()
        .then(() => store.dispatch({ type, toy }))
        .catch(err => {
            console.log('toy actions => Cannot save toy:', err)
            throw err
        })
}

