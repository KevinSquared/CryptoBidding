import { useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import '../App.css'

export default function Drawing({
  setState,
}) {
  const [firstDrawing, setFirstDrawing] = useState()
  const [secondDrawing, setSecondDrawing] = useState()
  let canvasRef = useRef()

  const submitDrawing = (drawingNumber) => { 
    if (!canvasRef) {
      return
    }
    if (drawingNumber === 1) {
      setFirstDrawing(canvasRef.getSaveData())
    } else if (drawingNumber === 2) {
      setSecondDrawing(canvasRef.getSaveData())
      setState('submitWaiting')
    }
    // Clear canvas
    canvasRef.eraseAll()
  }

  return (
    <div className="App-header">
      <button onClick={() => canvasRef.eraseAll()}>
        Erase
      </button>
      <button onClick={() => canvasRef.undo()}>
        Undo
      </button>
      <button onClick={() => submitDrawing(firstDrawing ? 2 : 1)}>
        Submit drawing
      </button>
      <button onClick={() => canvasRef.loadSaveData(firstDrawing)}>
        Load drawing 1
      </button>
      <button onClick={() => canvasRef.loadSaveData(secondDrawing)}>
        Load drawing 2
      </button>
      <CanvasDraw
        ref={canvasDraw => (canvasRef = canvasDraw)}
        canvasWidth={400}
        canvasHeight={600}
        lazyRadius={0}
        brushRadius={4}
        hideGrid
      />
    </div>
  )
}
