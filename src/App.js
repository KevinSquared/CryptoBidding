import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Drawing from './components/Drawing'
import Lobby from './components/Lobby'
import StartScreen from './components/StartScreen'
import SubmitWaiting from './components/SubmitWaiting'
import './App.css';

function App() {
  const [socket, setSocket] = useState(null)
  const [roomCode, setRoomCode] = useState('')
  const [nickname, setNickname] = useState('')
  const [players, setPlayers] = useState([])

  // Game state
  const [state, setState] = useState('startScreen')

  // Initialize socket and event listeners
  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`)
    newSocket.on('newPlayer', (players) => {
      setPlayers(players)
    })
    newSocket.on('started', () => {
      setState('drawing')
    })
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  // Start/join game
  const startGame = () => {
    socket.emit('startGame', { roomCode, nickname })
    setState('lobby')
  }

  // Start game from lobby
  const start = () => {
    socket.emit('start', { roomCode })
  }

  if (state === 'startScreen') {
    return (
      <StartScreen
        roomCode={roomCode}
        setRoomCode={setRoomCode}
        nickname={nickname}
        setNickname={setNickname}
        startGame={startGame}
      />
    )
  }

  if (state === 'lobby') {
    return (
      <Lobby
        players={players}
        start={start}
      />
    )
  }

  if (state === 'drawing') {
    return <Drawing setState={setState} />
  }

  if (state === 'submitWaiting') {
    return <SubmitWaiting />
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>uh oh</p>
      </header>
    </div>
  );
}

export default App;
