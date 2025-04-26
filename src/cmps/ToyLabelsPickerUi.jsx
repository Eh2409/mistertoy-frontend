import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toyService } from '../services/toy.service.remote.js';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    }
}

export function ToyLabelsPickerUi({ labels, onSaveLabels }) {
    const theme = useTheme()
    const [labelsPicked, setLabelsPicked] = useState([...labels])
    const [isMenuClose, setIsMenuClose] = useState(true)

    useEffect(() => {
        if (labels.sort().join(' ') !== labelsPicked.sort().join(' ') && isMenuClose) {
            onSaveLabels(labelsPicked)
        }
    }, [isMenuClose])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setLabelsPicked(
            typeof value === 'string' ? value.split(',') : value,
        )
    }


    function toggleIsMenuClose(isClose) {
        setIsMenuClose(isClose)
    }


    return (
        <div className="labels-picker">
            <FormControl sx={{ width: 100 + '%' }}>
                <InputLabel id="demo-multiple-name-label">Labels</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={labelsPicked}
                    onChange={handleChange}
                    onClose={() => toggleIsMenuClose(true)}
                    onOpen={() => toggleIsMenuClose(false)}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {toyService.getLabels().map((label) => (
                        <MenuItem
                            key={label}
                            value={label}
                            style={getStyles(label, labelsPicked, theme)}
                        >
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}