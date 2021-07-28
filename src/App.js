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
      var letters = ['A', 'B', 'C', 'D', 'E', 'F']
      var newColor = '#';
      for (var i = 0; i < 6; i++ ) {
          newColor += letters[Math.floor(Math.random() * letters.length)];
      }
      return newColor;
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
