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

export function ToyDetails() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const [toy, setToy] = useState(null)
    const [isImgLoading, setIsImgLoading] = useState(true)
    const [isPopupOpen, setIsPopupOpen] = useState(false)

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

    function handleImageLoad() {
        setIsImgLoading(false)
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

    function onTogglePopup() {
        setIsPopupOpen(!isPopupOpen)
    }

    if (!toy) return < Loader />

    const { imgUrl, name, description, brand } = toy

    return (
        <section className="toy-details">

            <header><Link to='/toy'>Toys</Link> &gt; {brand} &gt; {name}</header>

            <div className="toy-img-container">
                {isImgLoading && <div className="image-loader"></div>}
                <img
                    src={imgUrl}
                    alt={imgUrl}
                    onLoad={handleImageLoad}
                    style={{ display: isImgLoading ? 'none' : 'block' }}
                />
            </div>

            <div className="toy-info">
                <div className="toy-name">{name}</div>
                <div className="toy-description">{description}</div>

                <ToyDetailsTable toy={toy} />

                <button className='popup-btn' onClick={onTogglePopup}>
                    Toy messages
                </button>
                {isPopupOpen && <Popup
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