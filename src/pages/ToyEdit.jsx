import { toyService } from "../services/toyService.js";
import { toyActions } from "../store/actions/toy.actions.js"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

import { ToyLabelsPicker } from "../cmps/ToyLabelsPicker.jsx";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

export function ToyEdit() {
    const params = useParams()
    const { toyId } = params

    const navigate = useNavigate()

    const [toyToEdit, setToyToEdit] = useState({ ...toyService.getEmptyToy() })
    const [toyEditLabels, setToyEditLabels] = useState(null)
    console.log('toyEditLabels:', toyEditLabels)

    useEffect(() => {
        if (toyId) {
            loadToy()
        }
    }, [toyId])

    function loadToy() {
        toyService.get(toyId)
            .then(toy => {
                setToyToEdit(prev => ({ ...prev, ...toy }))
                setToyEditLabels(toy.labels)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toy')
            })
    }

    function handleChange({ target }) {
        var { name, value } = target
        if (name === 'price') value = +value

        setToyToEdit(prev => ({ ...prev, [name]: value }))
    }

    function onSaveLabels(labelsPicked) {
        setToyToEdit(prev => ({ ...prev, labels: labelsPicked }))
    }

    function onSave(ev) {
        ev.preventDefault()

        if (!toyToEdit?._id) toyToEdit.createdAt = Date.now()

        const imageUrlRegex = /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i;
        toyToEdit.imgUrl = imageUrlRegex.test(toyToEdit.imgUrl) ? toyToEdit.imgUrl : 'src/assets/img/no img.jpg'

        toyActions.saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('toy saved')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot save toy')
            })

    }

    const { name, price, imgUrl, labels } = toyToEdit

    return (
        <section className="toy-edit">

            <h2>{toyToEdit._id ? "Edit Toy" : "Add Toy"}</h2>

            <form onSubmit={onSave}>
                <label htmlFor="name">Name:</label>
                <input type="text" name='name' id="name" value={name} onChange={handleChange} required />
                <label htmlFor="name">Price:</label>
                <input type="number" name='price' id="price" value={price || ''} onChange={handleChange} required />
                <label htmlFor="imgUrl">Img:</label>
                <input type="text" name='imgUrl' id="imgUrl" value={imgUrl} onChange={handleChange} />
                <span>Labels:</span>
                <ToyLabelsPicker labels={labels} onSaveLabels={onSaveLabels} toyEditLabels={toyEditLabels} />
                <button className="save-btn">Save</button>
                <Link to='/toy'><button>Back to list</button></Link>
            </form>
        </section>
    )
}