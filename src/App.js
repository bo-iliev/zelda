import React, { useEffect, useRef, useState } from 'react';
import './App.css';

export default function App() {
  const canvasRef = useRef(null);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  // Set the height and width of canvas
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;

    context.fillRect(x, y, 100, 100);
  }, []);

  //Move the box if x or y changes
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillRect(x, y, 100, 100);
  }, [x, y]);
  // Add event listener to window to listen for arrow keys
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(e) {
      if (e.key === 'ArrowUp') move('up');
      if (e.key === 'ArrowDown') move('down');
      if (e.key === 'ArrowLeft') move('left');
      if (e.key === 'ArrowRight') move('right');
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function move(direction) {
    if (direction === 'up') setY((y) => y - 20);
    if (direction === 'down') setY((y) => y + 20);
    if (direction === 'left') setX((x) => x - 20);
    if (direction === 'right') setX((x) => x + 20);
  }

  return (
    <div className="app">
      <canvas ref={canvasRef} />

      <div className="arrows">
        <button onClick={() => move('up')}>Up</button>
        <button onClick={() => move('left')}>Left</button>
        <button onClick={() => move('down')}>Down</button>
        <button onClick={() => move('right')}>Right</button>
      </div>

      <div className="images">
        <img src="https://i.imgur.com/JYUB0m3.png" alt="Down" />
        <img src="https://i.imgur.com/GEXD7bk.gif" alt="Right" />
        <img src="https://i.imgur.com/XSA2Oom.gif" alt="Up" />
        <img src="https://i.imgur.com/4LGAZ8t.gif" alt="Left" />
      </div>
    </div>
  );
}