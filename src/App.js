import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

import Chatbox from './components/Chatbox'
import NameModal from './components/NameModal'

let socket = null

function App() {
  const [username, setUserName] = useState("")
  const [color, setColor] = useState("")
  const [modalShow, setModalShow] = useState(true)

  useEffect(() => {
    setColor(`#${Math.floor(Math.random()*16777215).toString(16)}`)

    if(username !== ""){
      socket = io(`${process.env.REACT_APP_SERVER_URL}`, {
        query: {
          username: username,
          color: color 
        }
      })
    }

    return () => username !== "" ? socket.disconnect():null
  }, [username])

  return (
    <div className="App">
      <header className="App-header">
        <Chatbox socket={socket} username={username} color={color} />
        <NameModal show={modalShow} onHide={() => setModalShow(false)} setUserName={setUserName} />
      </header>
    </div>
  );
}

export default App;
