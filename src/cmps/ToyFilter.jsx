import { utilService } from "../services/util.service.js";

import { ToyLabelsPicker } from "./ToyLabelsPicker.jsx";

import { useState, useEffect, useRef } from 'react'

export function ToyFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debounce = useRef(utilService.debounce(onSetFilterBy, 1))

    useEffect(() => {
        debounce.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        var { name, value } = target
        if (name === 'price') value = +value


        if (name === 'inStock') {
            switch (value) {
                case 'true':
                    value = true
                    break;
                case 'false':
                    value = false
                    break;
                case '':
                    value = undefined
                    break;
            }
        }

        setFilterByToEdit(prev => ({ ...prev, [name]: value }))
    }

    function onSaveLabels(labelsPicked) {
        setFilterByToEdit(prev => ({ ...prev, labels: labelsPicked }))
    }

    const { name, price, labels, inStock } = filterByToEdit

    return (
        <section className="toy-filter">
            <h2>Toy Filter</h2>
            <form >
                <input type="text" name="name" id="name" placeholder="By Name" value={name} onChange={handleChange} />
                <input type="number" name="price" id="price" placeholder="By Min Price" value={price || ''} onChange={handleChange} />

                <select name="inStock" id="inStock" onChange={handleChange} value={inStock === undefined ? '' : String(inStock)}>
                    <option value=''>All</option>
                    <option value='true'>In Stock</option>
                    <option value='false'>Out of Stock</option>
                </select>

                <ToyLabelsPicker labels={labels} onSaveLabels={onSaveLabels} />

            </form>
        </section >
    )
}