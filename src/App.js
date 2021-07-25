import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client'
import Chat from './chat/Chat'

function App() {
  const socket = io(process.env.REACT_APP_SERVER_URL)

  socket.on('connection', () => {
    console.log('Im connected with the backend')
  })


  return (
    <div className="App">
      <header className="App-header">
        <Chat />
      </header>
    </div>
  );
}

export default App;
