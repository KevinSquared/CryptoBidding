import { useEffect, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import './App.css';

function App() {
  let canvasRef = useRef()
  const [save, setSave] = useState()

  useEffect(() => {
    console.log(save)
  }, [save])

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => canvasRef.eraseAll()}>
          Erase
        </button>
        <button onClick={() => canvasRef.undo()}>
          Undo
        </button>
        <button onClick={() => setSave(canvasRef.getSaveData())}>
          Save
        </button>
        <button onClick={() => canvasRef.loadSaveData(save)}>
          Load
        </button>
        <CanvasDraw
          ref={canvasDraw => (canvasRef = canvasDraw)}
          canvasWidth={400}
          canvasHeight={600}
          lazyRadius={0}
          brushRadius={4}
          hideGrid
        />
      </header>
    </div>
  );
}

export default App;
