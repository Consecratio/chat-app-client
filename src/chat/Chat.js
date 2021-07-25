import React from 'react'
import { useState } from 'react'
import ChannelList from './ChannelList'
import MessagesPanel from './MessagesPanel'
import './chat.css'

const Chat = () => {
    const [channels, setChannels] = useState([{
        id: 1,
        name: 'first',
        participants: 10
    }])

    return (
        <div className="chat-app">
            <ChannelList channels={channels} />
            <MessagesPanel />
        </div>
    )
}

export default Chat