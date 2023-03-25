// src/components/Tile.js
import React from "react";

const Tile = ({ value, position, onClick }) => {
  if (!value) {
    return null;
  }

  const style = {
    width: 400,
    height: 400,
    backgroundImage: `url(${position.backgroundImage})`,
    backgroundPosition: `-${position.x}px -${position.y}px`,
  };

  return (
    <div
      className="tile"
      style={style}
      onClick={onClick}
    />
  );
};

export default Tile;
