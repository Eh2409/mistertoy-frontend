
import { useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { toyActions } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

// import { toyService } from '../services/toy.service.js'
import { toyService } from '../services/toy.service.remote.js'

import { useEffectOnUpdate } from '../hooks/useEffectOnUpdate.js'

import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToySort } from '../cmps/ToySortBy.jsx'
import { Loader } from '../cmps/Loader.jsx'
import { Popup } from '../cmps/Popup.jsx'

import chatImg from '../assets/img/chat.svg'
import { Pagination } from '../cmps/pagination.jsx'

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const toysLabels = useSelector(storeState => storeState.toyModule.labels)
    const isLoad = useSelector(storeState => storeState.toyModule.isLoad)
    const maxPageCount = useSelector(storeState => storeState.toyModule.maxPageCount)

    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState({ ...toyService.getFilterFromSearchParams(searchParams) })


    useEffectOnUpdate(() => {
        setSearchParams(filterBy)
        toyActions.loadToys(filterBy)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    useEffect(() => {
        toyActions.loadLabels()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load labels')
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

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prev => ({ ...prev, ...filterByToEdit }))
    }

    function onTogglePopup() {
        setIsPopupOpen(!isPopupOpen)
    }

    function onSetPage(diff) {
        setFilterBy(prev => ({ ...prev, pageIdx: filterBy.pageIdx + diff }))
    }

    function onSetPageNumber(pageNum) {
        setFilterBy(prev => ({ ...prev, pageIdx: pageNum }))
    }

    return (
        <section className='toy-index'>

            {Object.keys(toysLabels).length > 0 && <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} toysLabels={toysLabels} />}

            < header className='flex justify-between align-center'>
                <h3>Toys List</h3>
                <ToySort filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <Link to='/toy/add'><button>Add toy</button></Link>
            </header>

            {
                isLoad ? <Loader /> :
                    (toys.length > 0
                        ? < ToyList toys={toys} onRemoveToy={onRemoveToy} />
                        : <div className='no-toy'>No matching toy found.</div>)
            }

            {
                isPopupOpen
                    ? <Popup onTogglePopup={onTogglePopup} />
                    : <div className='popup-btn' onClick={onTogglePopup}>
                        <img src={chatImg} alt="" />
                    </div>
            }

            <Pagination filterBy={filterBy} maxPageCount={maxPageCount} onSetPage={onSetPage} onSetPageNumber={onSetPageNumber} />


        </section >
    )

}