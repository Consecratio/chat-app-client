import React from 'react'

const Message = (props) => {
    return (
        <div className='message-item'>
            <div>
                <strong>{props.senderName}</strong>
                <span>{props.text}</span>
            </div>
        </div>
    )
}

export default Message