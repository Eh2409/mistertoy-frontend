
export function Popup({ onTogglePopup }) {

    return (
        <section className="popup">

            <header className="flex justify-between">
                <h2>popup</h2>
                <button onClick={onTogglePopup}>X</button>
            </header>

            <main>chat</main>

            <footer></footer>

        </section>
    )
}