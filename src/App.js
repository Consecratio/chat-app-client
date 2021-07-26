import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

import Chatbox from './components/Chatbox'

let socket = null

function App() {
  const [username, setUsername] = useState("")
  const [color, setColor] = useState("")

  useEffect(() => {
    const name = prompt('Please enter your initials')
    setColor(`#${Math.floor(Math.random()*16777215).toString(16)}`)
    setUsername(name)

    socket = io(`${process.env.REACT_APP_SERVER_URL}`, {
      query: {
        username: name,
        color: color 
      }
    })

    return () => socket.disconnect()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Chatbox socket={socket} username={username} color={color} />
      </header>
    </div>
  );
}

export default App;
