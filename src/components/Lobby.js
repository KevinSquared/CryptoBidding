export default function StartScreen({
  players,
  start,
}) {
  return (
    <>
      <h1>lobby</h1>
      {players.map((player) => player.nickname)}
      <button onClick={start}>
        Start
      </button>
    </>
  )
}
