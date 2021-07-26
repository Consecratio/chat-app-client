import { useEffect, useState } from 'react'
import { Button, Form, Card } from 'react-bootstrap'

const Chatbox = props => {
    const [message, setMessage] = useState("")
    const [msgHistory, setMsgHistory] = useState([])
    
    useEffect(() => {
        if(!props.socket) {
            console.log('no socket is available')
            return;
        }
        console.log('success socket')
        props.socket.on('chat message', msg => addToMsgHistory(msg))
    }, [props.socket])

    const addToMsgHistory = msg => {
        console.log('something happened', msg)
        setMsgHistory(prev => [{
            username: msg.username,
            content: msg.content
        }, ...prev])
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.socket.emit('chat message', {
            username: props.username,
            content: message
        })
        setMessage('')
    }

    const handleChange = e => { setMessage(e.target.value) }

    return (
        <div className="chatbox">
            <Card bg="dark" text="white" style={{ width: '100vw', height: '75vh' }} className="mb-2">
                <Card.Header>Chat App</Card.Header>
                <Card.Body>
                    <Card.Text className="overflow-auto" style={{ width: '100%', height: '100%'}}>
                        {msgHistory.map((msg, idx) => <p key={idx}>{msg.username} says: {msg.content}</p>)}
                    </Card.Text>
                </Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Control type="text" value={message} onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" size="sm" type="submit">Send</Button>
                </Form>
            </Card>
        </div>
    )
}

export default Chatbox