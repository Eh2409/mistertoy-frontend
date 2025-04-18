
import { toyService } from '../services/toyService.js'

import { useState, useEffect, useRef } from 'react'


export function ToyLabelsPicker({ labels, onSaveLabels, toyEditLabels = null }) {

    const [isLabelPickerOpen, setIsLabelPickerOpen] = useState(false)
    const [labelsPicked, setLabelsPicked] = useState([...labels])

    const selectBtnTitleRef = useRef()
    const labelsListRef = useRef()

    useEffect(() => {
        if (toyEditLabels) {
            setLabelsPicked([...toyEditLabels])
        }
    }, [toyEditLabels])

    useEffect(() => {
        if (labelsPicked.length > 0) {
            selectBtnTitleRef.current.innerText = `${labelsPicked.length} selected`
        } else {
            selectBtnTitleRef.current.innerText = 'Select Label'
        }
    }, [labelsPicked])

    useEffect(() => {
        if (isLabelPickerOpen) {
            setTimeout(() => {
                document.addEventListener('click', handleClickOutside)
            }, 100)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isLabelPickerOpen, labelsPicked])


    function onToggleLabelPicker() {
        setIsLabelPickerOpen(prev => prev = !isLabelPickerOpen)

        if (isLabelPickerOpen) {
            onSaveLabels(labelsPicked)
        }
    }

    function handleClickOutside({ target }) {
        if (target !== labelsListRef.current) {
            onSaveLabels(labelsPicked)
            setIsLabelPickerOpen(false)
        }

        document.removeEventListener('click', handleClickOutside)
    }

    function onPickLabel({ target }) {
        const { name } = target

        setLabelsPicked(prev => {

            if (prev.includes(name)) {
                prev = prev.filter(label => label !== name)
            } else {
                prev = ([name, ...prev])
            }

            return prev
        })
    }

    return (
        <section className="labels-picker">
            <div className="select-btn" onClick={onToggleLabelPicker}>
                <span className="btn-text" ref={selectBtnTitleRef}>
                    Select Label
                </span>
            </div>
            {isLabelPickerOpen && <ul className="label-list" ref={labelsListRef} onClick={(event) => event.stopPropagation()}>
                {toyService.getLabels().map(label => {
                    return <li key={label} className={`label-item ${labelsPicked.includes(label) ? 'active' : 'false'}`}>
                        <input type="checkbox" id={label} name={label}
                            onChange={onPickLabel}
                            checked={labelsPicked.includes(label) ? true : false}
                        />
                        <label htmlFor={label}>{label}</label>
                    </li>
                })}
            </ul>}
        </section>
    )
}