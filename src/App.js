import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

import Chatbox from './components/Chatbox'

let socket = null

function App() {
  const [username, setUsername] = useState("")

  useEffect(() => {
    const name = prompt('Please enter your initials')
    setUsername(name)

    socket = io(`${process.env.REACT_APP_SERVER_URL}`, {
      query: {
        username: name
      }
    })

    return () => socket.disconnect()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Chatbox socket={socket} username={username} />
      </header>
    </div>
  );
}

export default App;
