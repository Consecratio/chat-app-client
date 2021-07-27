import { useState } from 'react'

import { Modal, Button, Form, InputGroup, FormControl } from "react-bootstrap"

const NameModal = (props) => {
    const [userInput, setUserInput] = useState("")

    const handleChange = (e) => {
        setUserInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.setUserName(userInput)
        props.onHide()
    }

    return (
      <Modal
        show = {props.show}
        size="med"
        aria-labelledby="contained-modal-title-vcenter"
        onHide = {props.onHide}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Please type in a username
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <p>This name will be how others see you in the chat.</p>
                <InputGroup className="mb-3" onSubmit={handleSubmit}>
                    <FormControl
                    placeholder="New Message..."
                    aria-label="New Message..."
                    aria-describedby="basic-addon2"
                    type="text"
                    value={userInput}
                    onChange={handleChange}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
            <Button type="submit">Submit</Button>
            </Modal.Footer>
        </Form>
      </Modal>
    );
}

export default NameModal