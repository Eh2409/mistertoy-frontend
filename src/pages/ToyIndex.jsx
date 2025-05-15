
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
import { Chat } from '../cmps/Chat.jsx'

import chatImg from '../assets/img/chat.svg'
import { Pagination } from '../cmps/pagination.jsx'

export function ToyIndex() {

    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const toysLabels = useSelector(storeState => storeState.toyModule.labels)
    const isLoad = useSelector(storeState => storeState.toyModule.isLoad)
    const maxPageCount = useSelector(storeState => storeState.toyModule.maxPageCount)

    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState({ ...toyService.getFilterFromSearchParams(searchParams) })


    useEffectOnUpdate(() => {
        onLoadToys()
    }, [filterBy])

    useEffect(() => {
        onLoadLabels()
    }, [])


    async function onLoadToys() {
        try {
            setSearchParams(filterBy)
            await toyActions.loadToys(filterBy)
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot load toys')
        }
    }

    async function onLoadLabels() {
        try {
            await toyActions.loadLabels()
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot load labels')
        }
    }

    async function onRemoveToy(toyId) {
        try {
            await toyActions.removeToy(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot remove toy')
        } finally {
            onLoadToys()
        }
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

            < header>
                <h3>Toys List</h3>
                <ToySort filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                {loggedinUser && loggedinUser.isAdmin && <Link to='/toy/add'><button>Add toy</button></Link>}
            </header>

            {
                isLoad ? <Loader /> :
                    (toys.length > 0
                        ? < ToyList
                            toys={toys}
                            onRemoveToy={onRemoveToy}
                            loggedinUser={loggedinUser}
                        />
                        : <div className='no-toy'>No matching toy found.</div>)
            }

            {
                isPopupOpen
                    ? <Popup
                        onTogglePopup={onTogglePopup}
                        header={<h2>Chat</h2>}
                    >
                        <Chat loggedinUser={loggedinUser} />
                    </Popup >
                    : <div className='popup-btn' onClick={onTogglePopup}>
                        <img src={chatImg} alt="" />
                    </div>
            }

            <Pagination
                filterBy={filterBy}
                maxPageCount={maxPageCount}
                onSetPage={onSetPage}
                onSetPageNumber={onSetPageNumber}
            />


        </section >
    )

}