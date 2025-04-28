import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function ToySelectUi({ name, options, select, onSaveSelect }) {
    const [optionSelected, setOptionSelected] = useState(select);

    useEffect(() => {
        onSaveSelect(optionSelected)
    }, [optionSelected])

    const handleChange = ({ target }) => {
        setOptionSelected(target.value);
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{name}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={optionSelected}
                    label={name}
                    onChange={handleChange}
                >
                    {options.map(option => {
                        return <MenuItem key={option} value={option}>{option}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
