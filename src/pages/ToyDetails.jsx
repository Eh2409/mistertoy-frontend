// import { toyService } from '../services/toy.service.js'
import { toyService } from '../services/toy.service.remote.js'
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Loader } from "../cmps/Loader.jsx"
import { ToyDetailsTable } from '../cmps/ToyDetailsTable.jsx'
import { ToyMsgs } from '../cmps/ToyMsgs.jsx'
import { Popup } from '../cmps/Popup.jsx'
import { ImageGallery } from '../cmps/ImageGallery.jsx'

export function ToyDetails() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const [toy, setToy] = useState(null)
    const [isPopupOpen, setIsPopupOpen] = useState({ type: '', isOpen: false })

    const params = useParams()
    const { toyId } = params

    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) {
            loadToy()
        }
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.get(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Cannot load toy:', err)
            showErrorMsg('Cannot load toy')
            setTimeout(() => navigate('/toy'), 500)
        }
    }

    async function onSendMsg(msg) {
        try {
            const savedMsg = await toyService.addMsg(toyId, msg)
            setToy(prev => ({ ...prev, msgs: [...prev.msgs, savedMsg] }))
        } catch (err) {
            console.log('Cannot save message:', err)
            showErrorMsg('Cannot save message')
        }
    }

    async function onRemoveMsg(msgId) {
        try {
            await toyService.removeMsg(toyId, msgId)
            setToy(prev => ({ ...prev, msgs: prev.msgs.filter(msg => msg.id !== msgId) }))
        } catch (err) {
            console.log('Cannot remove message:', err)
            showErrorMsg(`Cannot remove message ${msgId}`)
        }
    }

    function onTogglePopup(type) {
        setIsPopupOpen(prev => {
            if (isPopupOpen.isOpen) {
                return { type: '', isOpen: false }
            } else {
                return { type: type, isOpen: true }
            }
        })
    }

    if (!toy) return < Loader />

    const { name, description, brand, imgUrls } = toy

    return (
        <section className="toy-details">

            <header><Link to='/toy'>Toys</Link> &gt; {brand} &gt; {name}</header>


            <ImageGallery images={imgUrls}  >
                {/* <button className='expend-btn' onClick={() => onTogglePopup('image gallery')}>
                    <img src="/src/assets/img/expend.svg" alt="expend" />
                </button> */}
            </ImageGallery>

            {isPopupOpen.isOpen && isPopupOpen.type === 'image gallery' && <Popup
                onTogglePopup={onTogglePopup}
                header={<h2>Image gallery</h2>}
            >
                <ImageGallery images={imgUrls} />

            </Popup >}

            <div className="toy-info">
                <div className="toy-name">{name}</div>
                <div className="toy-description">{description}</div>

                <ToyDetailsTable toy={toy} />

                <button className='popup-btn' onClick={() => onTogglePopup('toy messages')}>
                    Toy messages
                </button>
                {isPopupOpen.isOpen && isPopupOpen.type === 'toy messages' && <Popup
                    onTogglePopup={onTogglePopup}
                    header={<h2>Toy messages</h2>}
                >
                    <ToyMsgs
                        loggedinUser={loggedinUser}
                        toyMsge={toy.msgs}
                        onSendMsg={onSendMsg}
                        onRemoveMsg={onRemoveMsg}
                    />

                </Popup >}


            </div>

        </section >
    )
}