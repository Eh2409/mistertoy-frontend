import { utilService } from "../services/util.service.js";
import { useEffectOnUpdate } from '../hooks/useEffectOnUpdate.js'

import { ToyLabelsPicker } from "./ToyLabelsPicker.jsx";

import { useState, useEffect, useRef } from 'react'
import { ToyLabelsPickerUi } from "./ToyLabelsPickerUi.jsx";

export function ToyFilter({ filterBy, onSetFilterBy }) {
    const { name, price, labels, inStock } = filterBy

    const [filterByToEdit, setFilterByToEdit] = useState({ name, price, labels, inStock })
    const debounce = useRef(utilService.debounce(onSetFilterBy, 1000))



    useEffectOnUpdate(() => {
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


    return (
        <section className="toy-filter">
            <h2>Toy Filter</h2>
            <form >
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="By Name"
                    value={filterByToEdit.name}
                    onChange={handleChange} />
                <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="By Min Price"
                    value={filterByToEdit.price || ''}
                    onChange={handleChange} />

                <select
                    name="inStock"
                    id="inStock"
                    onChange={handleChange}
                    value={filterByToEdit.inStock === undefined ? '' : String(filterByToEdit.inStock)}>
                    <option value=''>All</option>
                    <option value='true'>In Stock</option>
                    <option value='false'>Out of Stock</option>
                </select>

                {/* <ToyLabelsPicker labels={filterByToEdit.labels} onSaveLabels={onSaveLabels} /> */}
                <ToyLabelsPickerUi labels={filterByToEdit.labels} onSaveLabels={onSaveLabels} />

            </form>
        </section >
    )
}