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
        <div className="container mt-4">
            <Card bg="dark" text="white" style={{ minWidth: '50vw', height: '90vh' }} className="mx-auto mb-2">
                <Card.Header>Chat App</Card.Header>
                <Card.Body className="overflow-auto" style={{ width: '100%', height: '100%'}} >
                    <Card.Text className="d-flex flex-column-reverse">
                        {msgHistory.map((msg, idx) => <p key={idx}>{msg.username} says: {msg.content}</p>)}
                    </Card.Text>
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