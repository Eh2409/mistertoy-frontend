import { Chat } from "./Chat";

export function Popup({ onTogglePopup }) {

    return (
        <section className="popup">

            <header className="flex justify-between">
                <h2>Chat</h2>
                <button onClick={onTogglePopup}>X</button>
            </header>

            <main><Chat /></main>
            <footer></footer>

        </section>
    )
}