import { useEffect, useState } from 'react'
import { Button, Form, Card, InputGroup, FormControl } from 'react-bootstrap'

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
            content: msg.content,
            color: msg.color,
            time: msg.time
        }, ...prev])
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.socket.emit('chat message', {
            username: props.username,
            content: message,
            color: props.color,
            time: new Date().toLocaleTimeString()
        })
        setMessage('')
    }

    const handleChange = e => { setMessage(e.target.value) }

    let messages = msgHistory.map((msg, idx) => {
        return (
            <div key={idx} className="mt-3" style={{ backgroundColor: 'rgb(75, 75, 75)', borderRadius: '20px', padding: '5px 15px' }}>
                <p style={{ marginBottom: '0', color: msg.color }}>{msg.username}  <span style={{ color: 'lightgrey' }}>{msg.time}</span></p>
                <p style={{ marginBottom: '0' }}>{msg.content}</p>
            </div>
        )
    })

    return (
        <div className="container mt-4">
            <Card bg="dark" text="white" style={{ minWidth: '50vw', height: '90vh' }} className="mx-auto mb-2">
                <Card.Header>Chat App</Card.Header>
                <Card.Body className="overflow-auto" style={{ width: '100%', height: '100%'}} >
                    <div className="d-flex flex-column-reverse">
                        {messages}
                    </div>
                </Card.Body>
                <Card.Footer style={{ paddingBottom: '0' }}>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup className="mb-3" onSubmit={handleSubmit}>
                            <FormControl
                            placeholder="New Message..."
                            aria-label="New Message..."
                            aria-describedby="basic-addon2"
                            type="text"
                            value={message}
                            onChange={handleChange}
                            style={{ backgroundColor: "#343A40", color: "#B0C9D9"}}
                            />
                            <Button variant="primary" type="submit" id="button-addon2">
                                Send
                            </Button>
                        </InputGroup>
                    </Form>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Chatbox