import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client'

function App() {
  const socket = io(process.env.REACT_APP_SERVER_URL)

  socket.on('connection', () => {
    console.log('Im connected with the backend')
  })


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
