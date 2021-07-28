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
    function getRandomColor() {
      const hue = Math.floor(Math.random() * 360)
      const saturation = (Math.floor(Math.random() * 51) + 50) + "%"
      const lightness = (Math.floor(Math.random() * 30) + 50) + "%"
      return "hsl(" + hue + ", " + saturation + ", " + lightness + ")"
    }

    setColor(getRandomColor())

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
