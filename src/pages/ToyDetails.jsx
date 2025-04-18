import { toyService } from "../services/toyService.js"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Loader } from "../cmps/Loader.jsx"

export function ToyDetails() {

    const params = useParams()
    const { toyId } = params

    const [toy, setToy] = useState(null)
    console.log('toy:', toy)

    useEffect(() => {
        if (toyId) {
            loadToy()
        }
    }, [toyId])

    function loadToy() {
        toyService.get(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toy')
            })
    }

    if (!toy) return < Loader />

    const { imgUrl, name, price } = toy

    return (
        <section className="toy-details">
            <img src={imgUrl} alt={imgUrl} />
            <div className="toy-info">
                <div>{name}</div>
                <div>{price}$</div>
            </div>

            <Link to='/toy'><button>Back to list</button></Link>
        </section>
    )
}