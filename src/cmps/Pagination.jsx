
export function Pagination({ filterBy, maxPageCount, onSetPage, onSetPageNumber }) {

    return (
        <section className='pagination-btns'>
            <button disabled={filterBy.pageIdx <= 0} onClick={() => onSetPage(-1)} className="pagination-btn">Prev page</button>

            {maxPageCount >
                0 && Array.from({ length: maxPageCount })
                    .map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => onSetPageNumber(idx)}
                            className={`pagination-btn ${+filterBy.pageIdx === idx ? "active" : ""}`}
                        >
                            {idx + 1}
                        </button>
                    ))}

            <button disabled={filterBy.pageIdx >= maxPageCount - 1} onClick={() => onSetPage(1)} className="pagination-btn">Next page</button>
        </section>)
}