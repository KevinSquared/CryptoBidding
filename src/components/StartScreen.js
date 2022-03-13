export default function StartScreen({
  roomCode,
  setRoomCode,
  nickname,
  setNickname,
  startGame
}) {
  return (
    <>
      <label>Room code:</label>
      <input value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
      <label>Nickname:</label>
      <input value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <button onClick={startGame}>
        Start/join game
      </button>
    </>
  )
}
