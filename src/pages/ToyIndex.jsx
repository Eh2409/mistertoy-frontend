
import { useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';

import { toyActions } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

import { ToyList } from '../cmps/ToyList.jsx'


export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    console.log('toys:', toys)

    useEffect(() => {
        toyActions.loadToys()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [])

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

    return (
        <section className='toy-index'>

            <header>
                <h2>toys list</h2>
                <Link to='/toy/add'><button>Add toy</button></Link>
            </header>

            <ToyList toys={toys} onRemoveToy={onRemoveToy} />

        </section >
    )

}