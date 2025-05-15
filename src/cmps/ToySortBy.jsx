import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect, useRef, Fragment } from "react"


export function ToySort({ filterBy, onSetFilterBy }) {
    const { sortType, sortDir } = filterBy
    const [editSortBy, setEditSortBy] = useState({ sortType, sortDir })

    useEffect(() => {
        onSetFilterBy(editSortBy)
    }, [editSortBy])


    function handleChange({ target }) {
        var { value } = target

        var sortType = ''
        var sortDir = 0

        if (value === 'new' || value === 'old') sortType = 'createdAt'
        else if (value === 'a' || value === 'z') sortType = 'name'
        else if (value === 'low' || value === 'high') sortType = 'price'

        sortDir = (value === 'new' || value === 'z' || value === 'high') ? -1 : 1

        setEditSortBy(prev => ({ ...prev, sortType: sortType, sortDir: sortDir }))
    }

    function getValueFromFilterBy({ sortType, sortDir }) {
        if (sortType === 'createdAt') return sortDir === -1 ? 'new' : 'old'
        if (sortType === 'name') return sortDir === -1 ? 'z' : 'a'
        if (sortType === 'price') return sortDir === -1 ? 'high' : 'low'
        return ''
    }

    return (
        <Box className='toy-sort'>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={getValueFromFilterBy(editSortBy)}
                    label="sortBy"
                    onChange={handleChange}
                >
                    <MenuItem value={"new"}>Products: New to Old</MenuItem>
                    <MenuItem value={"old"}>Products: Old to New</MenuItem>
                    <MenuItem value={"a"}>Name: A to Z</MenuItem>
                    <MenuItem value={"z"}>Name: Z to A</MenuItem>
                    <MenuItem value={"low"}>Price: Low to High</MenuItem>
                    <MenuItem value={"high"}>Price: High to Low</MenuItem>

                </Select>
            </FormControl>
        </Box>
    );
}
