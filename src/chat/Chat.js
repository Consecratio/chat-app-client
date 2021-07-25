import React from 'react'
import { useState, useEffect } from 'react'
import ChannelList from './ChannelList'
import MessagesPanel from './MessagesPanel'
import axios from 'axios'
import './chat.css'

const Chat = () => {
    const [channels, setChannels] = useState([{
        id: 1,
        name: 'first',
        participants: 10
    }])

    useEffect (() => {
        const loadChannels = async () => {
            let res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getChannels`)

            setChannels(res.data.channels)
        }

        loadChannels()
    }, [])

    return (
        <div className="chat-app">
            <ChannelList channels={channels} />
            <MessagesPanel />
        </div>
    )
}

export default Chat