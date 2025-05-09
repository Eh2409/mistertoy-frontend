// import { toyService } from '../services/toy.service.js'
import { toyService } from '../services/toy.service.remote.js'

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Loader } from "../cmps/Loader.jsx"
import { ToyDetailsTable } from '../cmps/ToyDetailsTable.jsx'

export function ToyDetails() {
    const [isImgLoading, setIsImgLoading] = useState(true)

    const params = useParams()
    const { toyId } = params

    const navigate = useNavigate()

    const [toy, setToy] = useState(null)

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
            console.log('err:', err)
            showErrorMsg('Cannot load toy')
            setTimeout(() => navigate('/toy'), 500)
        }
    }

    function handleImageLoad() {
        setIsImgLoading(false)
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

            </div>


        </section >
    )
}