import React from 'react'
import Message from './Message.js'

const MessagesPanel = (props) => {
    let list = <div className='no-content-message'>There is no messages to show</div>

    if(props.channel && props.channel.messages){
        list = props.channel.messages.map((m) => {
            return (
                <Message key={m.id} id={m.id} sendername={m.sendername} text={m.text} />
            )
        })
    }

    return(
        <div className='messages-panel'>
            <div className='messages-list'>{list}</div>
            <div className='messages-input'>
                <input type='text' />
                <button>Send</button>
            </div>
        </div>
    )
}

export default MessagesPanel