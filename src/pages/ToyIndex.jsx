
import { useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom';

import { toyActions } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { toyService } from '../services/toyService.js';

import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx';


export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState({ ...toyService.getFilterFromSearchParams(searchParams) })


    useEffect(() => {
        setSearchParams(filterBy)
        toyActions.loadToys(filterBy)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        toyActions.removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prev => ({ ...prev, ...filterByToEdit }))
    }

    return (
        <section className='toy-index'>

            <header>
                <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <h3>toys list</h3>
                <Link to='/toy/add'><button>Add toy</button></Link>
            </header>

            <ToyList toys={toys} onRemoveToy={onRemoveToy} />

        </section >
    )

}