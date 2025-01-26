import { useState } from "react";
import ResetButton from "./ResetButton";
import ScoreDisplay from "./ScoreDisplay";

const GameBoard = () => {
  const initialGrid = Array(5).fill(null).map(() => Array(5).fill(null));

  const [grid, setGrid] = useState(initialGrid);
  const [currentChar, setCurrentChar] = useState("C");
  const [linesCount, setLinesCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highlightedCells, setHighlightedCells] = useState([]);

  const handleCellClick = (row, col) => {
    if (grid[row][col] || gameOver) return;

    const newGrid = grid.map((rowArr, rowIndex) =>
      rowArr.map((cell, colIndex) => (rowIndex === row && colIndex === col ? currentChar : cell))
    );

    setGrid(newGrid);
    checkAndHighlightMatches(newGrid);

    setCurrentChar(currentChar === "C" ? "M" : currentChar === "M" ? "T" : "C");

    if (!newGrid.flat().includes(null)) {
      setGameOver(true);
    }
  };

  const checkAndHighlightMatches = (grid) => {
    const rowCount = grid.length;
    const colCount = grid[0].length;
    let matchedCells = [];
    let totalLines = 0;

    const addCellsToHighlight = (cells) => {
      matchedCells.push(...cells);
      totalLines++;
    };

    const checkLine = (line, isRow, index) => {
      let current = null;
      let streak = 0;
      let cells = [];

      for (let i = 0; i < line.length; i++) {
        const value = line[i];
        if (value === current && value !== null) {
          streak++;
          cells.push(isRow ? { row: index, col: i } : { row: i, col: index });
        } else {
          if (streak >= 3) {
            addCellsToHighlight(cells);
          }
          current = value;
          streak = 1;
          cells = [isRow ? { row: index, col: i } : { row: i, col: index }];
        }
      }
      if (streak >= 3) {
        addCellsToHighlight(cells);
      }
    };

    const checkDiagonal = (startRow, startCol, rowStep, colStep) => {
      let current = null;
      let streak = 0;
      let cells = [];
      let row = startRow;
      let col = startCol;

      while (row >= 0 && row < rowCount && col >= 0 && col < colCount) {
        const value = grid[row][col];
        if (value === current && value !== null) {
          streak++;
          cells.push({ row, col });
        } else {
          if (streak >= 3) {
            addCellsToHighlight(cells);
          }
          current = value;
          streak = 1;
          cells = [{ row, col }];
        }

        row += rowStep;
        col += colStep;
      }
      if (streak >= 3) {
        addCellsToHighlight(cells);
      }
    };

    for (let i = 0; i < rowCount; i++) {
      checkLine(grid[i], true, i);
    }

    for (let j = 0; j < colCount; j++) {
      const column = grid.map((row) => row[j]);
      checkLine(column, false, j);
    }

    for (let row = 0; row < rowCount; row++) {
      checkDiagonal(row, 0, 1, 1);
    }
    for (let col = 1; col < colCount; col++) {
      checkDiagonal(0, col, 1, 1);
    }

    for (let row = 0; row < rowCount; row++) {
      checkDiagonal(row, 0, -1, 1);
    }
    for (let col = 1; col < colCount; col++) {
      checkDiagonal(rowCount - 1, col, -1, 1);
    }

    const uniqueCells = matchedCells.filter(
      (cell, index, self) =>
        index ===
        self.findIndex(
          (c) => c.row === cell.row && c.col === cell.col
        )
    );

    setHighlightedCells(uniqueCells);
    setLinesCount(totalLines);
  };

  const resetGame = () => {
    setGrid(initialGrid);
    setCurrentChar("C");
    setGameOver(false);
    setHighlightedCells([]);
    setLinesCount(0);
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
                  className={
                    highlightedCells.some(
                      (highlight) =>
                        highlight.row === rowIndex && highlight.col === colIndex
                    )
                    ? `highlight-${cell}`
                    : ""
                  }
                >
                  {cell || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ScoreDisplay linesCount={linesCount} gameOver={gameOver} />
      <ResetButton onReset={resetGame} />
    </div>
  );
};

export default GameBoard;
