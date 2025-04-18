import { useState, useEffect, useRef } from 'react'

export function ToySort({ filterBy, onSetFilterBy }) {
    const { sortType, sortDir } = filterBy
    const [editSortBy, setEditSortBy] = useState({ sortType, sortDir })

    useEffect(() => {
        onSetFilterBy(editSortBy)
    }, [editSortBy])


    function handleChange({ target }) {
        var { name, value, checked } = target

        if (name === 'sortDir') value = checked ? 1 : -1

        setEditSortBy(prev => ({ ...prev, [name]: value }))
    }

    return (
        <section className="sort-by">
            <label htmlFor="sortType">
                <span>Sort By: </span>
                <select name="sortType" id="sortType" value={editSortBy.sortType || ''} onChange={handleChange}>
                    <option value="createdAt">Create at</option>
                    <option value="title">Title</option>
                    <option value="price">Price</option>
                </select>
            </label>
            <label htmlFor="sortDir">
                <span>ascending: </span>
                <input type="checkbox" id="sortDir" name="sortDir"
                    checked={+editSortBy.sortDir === 1 ? true : false}
                    onChange={handleChange} />
            </label>
        </section>
    )
}