// import { toyService } from '../services/toy.service.js'
import { toyService } from '../services/toy.service.remote.js'

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Loader } from "../cmps/Loader.jsx"

export function ToyDetails() {

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

    if (!toy) return < Loader />

    const { imgUrl, name, price } = toy

    return (
        <section className="toy-details">
            <img src={imgUrl} alt={imgUrl} />
            <div className="toy-info">
                <div className="toy-name">{name}</div>
                <div>${price}</div>
            </div>

            <Link to='/toy'><button>Back to list</button></Link>
        </section>
    )
}