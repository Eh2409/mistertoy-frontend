import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import { utilService } from "../services/util.service.js"
import { useEffectOnUpdate } from '../hooks/useEffectOnUpdate.js'

import { ToyLabelsPicker } from "./ToyLabelsPicker.jsx"
import { ToyLabelsPickerUi } from "./ToyLabelsPickerUi.jsx"

import { useState, useEffect, useRef } from 'react'
import { toyService } from '../services/toy.service.remote.js'

export function ToyFilter({ filterBy, onSetFilterBy }) {
    const { name, price, labels, inStock, manufacturer, type, brand } = filterBy

    const [filterByToEdit, setFilterByToEdit] = useState({ name, price, labels, inStock, manufacturer, type, brand })
    const debounce = useRef(utilService.debounce(onSetFilterBy, 1000))
    console.log('Here:', filterByToEdit)
    console.log('Here:', filterByToEdit.inStock === undefined)



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
                case 'all':
                    value = undefined
                    break;
            }
        }

        setFilterByToEdit(prev => ({ ...prev, [name]: value }))
    }

    function onSaveLabels(labelsPicked, name) {
        setFilterByToEdit(prev => ({ ...prev, [name]: labelsPicked }))
    }


    return (
        <section className="toy-filter">
            <h2>Toy Filter</h2>
            <form >
                <Box sx={{ minWidth: 120 }}>

                    <TextField
                        id="name"
                        label="By Name"
                        variant="outlined"
                        type="text"
                        name="name"
                        className='text-field'
                        value={filterByToEdit.name}
                        onChange={handleChange}
                    />
                </Box>

                <Box>
                    <TextField
                        id="price"
                        label="By Min Price"
                        variant="outlined"
                        type="number"
                        name="price"
                        className='text-field'
                        value={filterByToEdit.price || ''}
                        onChange={handleChange}
                    />
                </Box>

                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">By Stock</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="inStock"
                            name="inStock"
                            value={filterByToEdit.inStock === undefined ? 'all' : String(filterByToEdit.inStock)}
                            label="inStock"
                            onChange={handleChange}
                        >
                            <MenuItem value={"all"}>All</MenuItem>
                            <MenuItem value={"true"}>In Stock</MenuItem>
                            <MenuItem value={"false"}>Out of Stock</MenuItem>
                        </Select>
                    </FormControl>
                </Box>



                <ToyLabelsPickerUi
                    name='Brands'
                    options={toyService.getBrands()}
                    labels={filterByToEdit.brand}
                    onSaveLabels={(labels) => onSaveLabels(labels, 'brand')}
                />

                <ToyLabelsPickerUi
                    name='Types'
                    options={toyService.getToyTypes()}
                    labels={filterByToEdit.type}
                    onSaveLabels={(labels) => onSaveLabels(labels, 'type')}
                />

                <ToyLabelsPickerUi
                    name='Manufacturers'
                    options={toyService.getManufacturers()}
                    labels={filterByToEdit.manufacturer}
                    onSaveLabels={(labels) => onSaveLabels(labels, 'manufacturer')}
                />


            </form>
        </section >
    )
}





