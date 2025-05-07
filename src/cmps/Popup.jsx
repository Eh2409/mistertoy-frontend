

export function Popup({ header, footer, children, onTogglePopup }) {

    return (
        <section className="popup-backdrop" onClick={onTogglePopup}>

            <div className="popup" onClick={(event) => event.stopPropagation()}>



                < header className="flex">
                    {header}
                    <button className="close-btn" onClick={onTogglePopup}>X</button>
                </header>

                <main>
                    {children}
                </main>

                {footer &&
                    <footer>
                        {footer}
                    </footer>
                }

            </div>
        </section >
    )
}