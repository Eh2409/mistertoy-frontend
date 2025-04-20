
import { useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom';

import { toyActions } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { toyService } from '../services/toyService.js';

import { useEffectOnUpdate } from '../hooks/useEffectOnUpdate.js'

import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx';
import { ToySort } from '../cmps/ToySortBy.jsx';
import { Loader } from '../cmps/Loader.jsx';
import { Popup } from '../cmps/Popup.jsx';


export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoad = useSelector(storeState => storeState.toyModule.isLoad)
    const maxPageCount = useSelector(storeState => storeState.toyModule.maxPageCount)

    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState({ ...toyService.getFilterFromSearchParams(searchParams) })
    console.log('Here:', filterBy)


    useEffectOnUpdate(() => {
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
            <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <header className='flex justify-between align-center'>
                <h3>Toys List</h3>
                <ToySort filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <Link to='/toy/add'><button>Add toy</button></Link>
            </header>
            {isLoad ? <Loader /> :
                (toys.length > 0
                    ? < ToyList toys={toys} onRemoveToy={onRemoveToy} />
                    : <div className='no-toy'>No matching toy found.</div>)
            }

            {isPopupOpen
                ? <Popup onTogglePopup={onTogglePopup} />
                : <div className='popup-btn' onClick={onTogglePopup}>
                    <img src="/src/assets/img/chat.svg" alt="" />
                </div>
            }


            <div className='pagination-btns'>
                <button disabled={filterBy.pageIdx <= 0} onClick={() => onSetPage(-1)} className="pagination-btn">Prev page</button>

                {maxPageCount >
                    0 && Array.from({ length: maxPageCount })
                        .map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => onSetPageNumber(idx)}
                                className={`pagination-btn ${+filterBy.pageIdx === idx ? "active" : ""}`}
                            >
                                {idx + 1}
                            </button>
                        ))}

                <button disabled={filterBy.pageIdx >= maxPageCount - 1} onClick={() => onSetPage(1)} className="pagination-btn">Next page</button>
            </div>


        </section >
    )

}