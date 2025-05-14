import { toyService } from '../services/toy.service.remote'
import { useState, useEffect, useRef } from 'react'
import { utilService } from '../services/util.service.js'


export function ToyMsgs({ loggedinUser, toyMsge, onSendMsg, onRemoveMsg }) {

    const [message, setMessage] = useState(toyService.getEmptyMsg())

    const DefaultMessage = useRef(toyService.getEmptyMsg())
    const messagesEndRef = useRef(null)

    useEffect(() => {
        if (messagesEndRef) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
        }
    }, [toyMsge])

    function handleChange({ target }) {
        var { value } = target
        setMessage(prev => ({ ...prev, txt: value }))
    }

    function onSend(ev) {
        ev.preventDefault()

        onSendMsg(message)
        setMessage(DefaultMessage.current)
    }

    return (
        <section className="toy-msgs" >
            <ul className="body" ref={messagesEndRef}>
                {toyMsge.length > 0 && toyMsge.map(msg => {
                    return <li
                        key={msg.id}
                        className={loggedinUser && loggedinUser._id === msg.by._id ? 'my-msg' : 'other-msg '}>
                        <div className='flex justify-between'>
                            <span>{msg.by.fullname}</span>
                            <span>{new Date(msg.createAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</span>
                            {loggedinUser && loggedinUser.isAdmin && <button onClick={() => (onRemoveMsg(msg.id))}>x</button>}
                        </div>
                        <pre>{msg.txt}</pre>
                    </li>
                })}
            </ul>
            {loggedinUser
                ? <form onSubmit={onSend} >
                    <input type="text" value={message.txt} onChange={handleChange} required />
                    <button>send</button>
                </form>
                : <div className='login-msg'>Login to add a message</div>
            }

        </section>
    )
}