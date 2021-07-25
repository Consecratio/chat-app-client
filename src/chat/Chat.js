import React from 'react'
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
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
    const [socket, setSocket] = useState(io(process.env.REACT_APP_SERVER_URL))
    const [channel, setChannel] = useState(null)

    useEffect (() => {
        const loadChannels = async () => {
            let res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getChannels`)

            setChannels(res.data.channels)
        }

        loadChannels()
    }, [channel])

    socket.on('connection', () => {
        console.log('Im connected with the backend')
    })

    const handleChannelSelect = (id) => {
        let channel = channels.find(c => {
            return c.id === id
        })
        setChannel({ channel })
        socket.emit('channel-join', id, ack => {
            // will be filled out later
        })
    }

    return (
        <div className="chat-app">
            <ChannelList channels={channels} onSelectChannel={handleChannelSelect} />
            <MessagesPanel />
        </div>
    )
}

export default Chat