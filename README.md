# 5x5 CMT Board Game

## Description
The **5x5 CMT Board Game** is a simple game where players click on cells of a 5x5 grid to fill them with characters (`C`, `M`, or `T`) in a round-robin order. The goal is to create lines of three or more identical characters, either horizontally, vertically, or diagonally. The game highlights these lines with colors to indicate successful matches and calculates the total number of lines formed at the end of the game.

## Features
1. **Cell Selection**:
   - Clicking on a cell sets its value to `C`, `M`, or `T` in a round-robin order.
   - Once a cell value is set, it cannot be changed.

2. **Font Colors**:
   - The original font color of all cells is black.
   - When a line of three or more identical characters (`C`, `M`, or `T`) is formed, the cells in that line are highlighted with specific colors:
     - `C` lines: **Green**
     - `M` lines: **Blue**
     - `T` lines: **Red**

3. **Round-Robin Order**:
   - The first clicked cell is set to `C`, the second to `M`, the third to `T`, and the cycle repeats (`C`, `M`, `T`, `C`, ...).

4. **Line Detection**:
   - The program detects lines of three or more identical characters:
     - **Horizontally**
     - **Vertically**
     - **Diagonally**

5. **Score Display**:
   - When the table is full, the game displays the score with a message:
     - Example 1: *"Congratulations, you have 3 lines!"*
     - Example 2: *"You have no lines, try again!"*
   - Note: Longer lines do not give extra points; only the number of lines is counted.

6. **Reset Button**:
   - Players can press the reset button at any time to clear the board and restart the game.

## How to Run the Game
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/prbyl0809/cmt-boardgame.git
   cd cmt-boardgame folder
   ```

2. **Install Dependencies**:
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the Application**:
   Run the following command to start the development server:
   ```bash
   npm start
   ```

4. **Open the Game**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

5. **Play the Game**:
   - Click on cells to fill them with `C`, `M`, or `T`.
   - Try to form lines of three or more identical characters.
   - Check your score when the grid is full, or reset the game anytime using the reset button.

## Example Gameplay
### Example 1: Formed Lines
- **Grid State**:
  ```
  C  C  C  C  C
  M  M  M  M  M
  T  T  T  T  T
  C  C  C  T  T
  M  M  M  T  C
  ```
- **Score Display**:
  "Congratulations, you have 6 lines!"

### Example 2: No Lines
- **Grid State**:
  ```
  C  M  T  C  M
  M  T  C  M  T
  T  C  M  T  C
  C  M  T  C  M
  M  T  C  M  T
  ```
- **Score Display**:
  "You have no lines, try again!"

## Technology Used
- React.js


