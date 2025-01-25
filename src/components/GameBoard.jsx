import { useState } from "react";
import ResetButton from "./ResetButton";

const GameBoard = () => {
  const initialGrid = Array(3).fill(null).map(() => Array(3).fill(null));

  const [grid, setGrid] = useState(initialGrid);
  const [currentChar, setCurrentChar] = useState("C");

  const [gameOver, setGameOver] = useState(false);

  const handleCellClick = (row, col) => {
    if (grid[row][col] || gameOver) return;

    const newGrid = [...grid];
    newGrid[row][col] = currentChar;
    setGrid(newGrid);

    setCurrentChar(currentChar === "C" ? "M" : currentChar === "M" ? "T" : "C");

    if (!newGrid.flat().includes(null)) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setGrid(initialGrid);
    setCurrentChar("C");
    setGameOver(false);
  };

  return (
    <div>
      <table>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell ? cell : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ResetButton onReset={resetGame} />
    </div>
  );
};

export default GameBoard;
