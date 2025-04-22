// import { toyService } from '../services/toy.service.js'
import { toyService } from '../services/toy.service.remote.js'

import { toyActions } from "../store/actions/toy.actions.js"
import { useConfirmTabClose } from '../hooks/useConfirmTabClose.js'


import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { ToyLabelsPicker } from "../cmps/ToyLabelsPicker.jsx"
import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Loader } from "../cmps/Loader.jsx"

export function ToyEdit() {
    const params = useParams()
    const { toyId } = params

    const navigate = useNavigate()

    const [toyToEdit, setToyToEdit] = useState({ ...toyService.getEmptyToy() })
    const [toyEditLabels, setToyEditLabels] = useState(null)

    const hasChanges = useRef(false)
    useConfirmTabClose(hasChanges)

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
        hasChanges.current = true
    }

    function onSaveLabels(labelsPicked) {
        setToyToEdit(prev => ({ ...prev, labels: labelsPicked }))
        hasChanges.current = true
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

    if (toyId && !toyToEdit._id) return <Loader />

    const { name, price, imgUrl, labels } = toyToEdit

    return (
        <section className="toy-edit">

            <h2>{toyToEdit._id ? "Edit Toy" : "Add Toy"}</h2>

            <form onSubmit={onSave}>
                <label htmlFor="name">Name:</label>
                <input type="text" name='name' id="name" value={name} onChange={handleChange} required />
                <label htmlFor="name">Price:</label>
                <input type="number" name='price' id="price" value={price || ''} onChange={handleChange} required />
                <label htmlFor="imgUrl">Image Url:</label>
                <input type="text" name='imgUrl' id="imgUrl" value={imgUrl} onChange={handleChange} />
                <span>Labels:</span>
                <ToyLabelsPicker labels={labels} onSaveLabels={onSaveLabels} toyEditLabels={toyEditLabels} />
                <button className="save-btn">Save</button>
                <Link to='/toy'><button>Back to list</button></Link>
            </form>
        </section>
    )
}