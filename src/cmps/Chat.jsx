
import { useState, useEffect, useRef } from 'react'
import { utilService } from '../services/util.service.js'

export function Chat(props) {

    const [chat, setChat] = useState([{ createAt: Date.now(), content: 'Hello! How can I assist you today?', sender: 'chat-agent' }])
    const [message, setMessage] = useState({ createAt: 0, content: '', sender: 'user' })

    const DefaultMessage = useRef({ createAt: 0, content: '', sender: 'user' })
    const debounce = useRef(utilService.debounce(autoMessage, 1000))
    const messagesEndRef = useRef(null)

    useEffect(() => {
        if (messagesEndRef) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
        }
    }, [chat])

    function handleChange({ target }) {
        var { value } = target
        setMessage(prev => ({ ...prev, content: value }))
    }

    function autoMessage() {
        const messages = [`I'm sorry, I didn't understand that. Could you please rephrase?`, 'Your request has been submitted successfully', 'Please hold on while I check that information for you.', 'Thank you for contacting us. Have a great day!', `I'm here to help 24/7, so feel free to ask me anything!`]
        const autoMesss = { createAt: Date.now(), content: messages[utilService.getRandomIntInclusive(0, 4)], sender: 'chat-agent' }
        setChat(prev => [...prev, autoMesss])
    }

    function onSend(ev) {
        ev.preventDefault()
        message.createAt = Date.now()
        setChat(prev => [...prev, message])
        setMessage(DefaultMessage.current)

        debounce.current()
    }

    return (
        <section className="chat" >
            <ul className="body" ref={messagesEndRef}>
                {chat.length > 0 && chat.map(m => {
                    return <li key={m.createAt} className={m.sender}>
                        <div className='flex justify-between'><span>{m.sender}</span>
                            <span>{new Date(m.createAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</span>
                        </div>
                        <pre>{m.content}</pre>
                    </li>
                })}
            </ul>
            <form onSubmit={onSend} >
                <input type="text" value={message.content} onChange={handleChange} required />
                <button>send</button>
            </form>
        </section>
    )
}