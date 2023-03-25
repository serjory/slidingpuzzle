// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import puzzleImage from "./images/puzzle-image.jpg";
import Tile from "./Tile";

const gridSize = 4;
const tileWidth = 400;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateTiles() {
  const tiles = Array(gridSize * gridSize - 1)
    .fill(0)
    .map((_, i) => i + 1);
  shuffleArray(tiles);
  tiles.push(0);
  return tiles;
}

function App() {
  const [tiles, setTiles] = useState(generateTiles());

  const getTilePosition = (index) => ({
    x: (index % gridSize) * tileWidth,
    y: Math.floor(index / gridSize) * tileWidth,
  });

  const moveTile = (index) => {
    const emptyTileIndex = tiles.indexOf(0);
    const clickedTileRow = Math.floor(index / gridSize);
    const clickedTileCol = index % gridSize;
    const emptyTileRow = Math.floor(emptyTileIndex / gridSize);
    const emptyTileCol = emptyTileIndex % gridSize;

    if (
      (Math.abs(clickedTileRow - emptyTileRow) === 1 &&
        clickedTileCol === emptyTileCol) ||
      (Math.abs(clickedTileCol - emptyTileCol) === 1 &&
        clickedTileRow === emptyTileRow)
    ) {
      const newTiles = tiles.slice();
      [newTiles[index], newTiles[emptyTileIndex]] = [
        newTiles[emptyTileIndex],
        newTiles[index],
      ];
      setTiles(newTiles);
    }
  };

  return (
    <div className="App">
      <div className="grid">
        {tiles.map((tile, index) => (
          <PuzzleTile
            key={index}
            value={tile}
            position={getTilePosition(index)}
            onClick={() => moveTile(index)}
          />
        ))}
      </div>
    </div>
  );

}

const PuzzleTile = ({ value, position, onClick }) => {
  if (!value) {
    return null;
  }

  const imagePosition = {
    x: ((value - 1) % gridSize) * tileWidth,
    y: Math.floor((value - 1) / gridSize) * tileWidth,
  };

  const style = {
    width: tileWidth,
    height: tileWidth,
    backgroundImage: `url(${puzzleImage})`,
    backgroundPosition: `-${imagePosition.x}px -${imagePosition.y}px`,
    transform: `translate(${position.x}px, ${position.y}px)`,
  };

  return (
    <div
      className="tile"
      style={style}
      onClick={onClick}
    />
  );
};




export default App;
