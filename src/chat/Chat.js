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
        participants: 0
    }])
    const [socket, setSocket] = useState(io(process.env.REACT_APP_SERVER_URL))
    const [channel, setChannel] = useState(null)

    useEffect (() => {
        loadChannels()
        configureSocket()
    }, [channel])

    const loadChannels = async () => {
        let res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getChannels`)

        setChannels(res.data.channels)
    }
    
    const configureSocket = () => {
        socket.on('connection', () => {
            if(channel){
                handleChannelSelect(channel.id)
            }
        })

        socket.on('channel', (channel) => {
            let tempChannels = channels
            tempChannels.forEach(c => {
                if(c.id === channel.id){
                    c.participants = channel.participants
                }
            })

            setChannels([{ tempChannels }])
        })

        socket.on('message', (message) => {
            let tempChannels = channels
            tempChannels.forEach(c => {
                if(c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message]
                    } else {
                        c.messages.push(message)
                    }
                }
            })

            setChannels([{ tempChannels }])
        })

        console.log('👻', channels)

    }

    const handleChannelSelect = (id) => {
        let tempChannel = channels.find(c => {
            return c.id === id
        })
        setChannel({ tempChannel })
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