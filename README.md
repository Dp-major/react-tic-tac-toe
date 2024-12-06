# react-tic-tac-toe
This repository is a tic-tac-toe game development using react. In this repo we are going to learn patterns and advanced concepts of react

# Learnings

## 1. Best Practice to Update State Based on Previous State Value

When updating state in React, it is crucial to ensure that the new state is derived correctly from the previous state. This avoids potential bugs caused by asynchronous state updates.

### Example

```jsx
import React, { useState } from 'react';

function Counter() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <div>
      <p>Counter Value: {counter}</p>
      <button onClick={incrementCounter}>Increment</button>
    </div>
  );
}

export default Counter;
```

### Explanation

1. The setCounter function uses the callback pattern to update the state based on the previous state value.
2. This is crucial for avoiding bugs when multiple state updates occur asynchronously.


## 2. Implemented Two-Way Binding for Editing and Saving Player Names

Two-way binding ensures that changes in an input field directly update the component state and reflect back in the UI.

### Example

```jsx
import React, { useState } from 'react';

function PlayerNameInput() {
  const [playerName, setPlayerName] = useState('Player 1');

  const handleNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  return (
    <div>
      <label htmlFor="player-name">Player Name:</label>
      <input
        id="player-name"
        type="text"
        value={playerName}
        onChange={handleNameChange}
      />
      <p>Welcome, {playerName}!</p>
    </div>
  );
}

export default PlayerNameInput;
```

### Explanation

1. The value attribute ensures the input field always reflects the current state (playerName).
2. The onChange handler updates the state whenever the input value changes.


## 3. Added Click Handler on Grid by Updating State Immutably

Immutable updates ensure React can efficiently track state changes for rendering and maintain application stability.

### Example

```jsx
import React, { useState } from 'react';

function GameBoard() {
  const [grid, setGrid] = useState(Array(9).fill(null));

  const handleCellClick = (index) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      if (!newGrid[index]) {
        newGrid[index] = 'X'; // Example: Mark the clicked cell as 'X'
      }
      return newGrid;
    });
  };

  return (
    <div className="grid">
      {grid.map((cell, index) => (
        <button key={index} onClick={() => handleCellClick(index)}>
          {cell}
        </button>
      ))}
    </div>
  );
}

export default GameBoard;
```

### Explanation

1. Why use ...prevGrid? The spread operator creates a shallow copy of the grid to maintain immutability.
2. React detects the change in the grid array and re-renders the component.


## 4. Implemented Lifting State Concept

Lifting state to a common parent component allows shared state to be accessible to multiple child components.

### Example

```jsx
import React, { useState } from 'react';
import Player from './Player';
import GameBoard from './GameBoard';

function App() {
  const [playerName, setPlayerName] = useState('Player 1');
  const [grid, setGrid] = useState(Array(9).fill(null));

  return (
    <div>
      <h1>React Tic-Tac-Toe</h1>
      <Player playerName={playerName} setPlayerName={setPlayerName} />
      <GameBoard grid={grid} setGrid={setGrid} />
    </div>
  );
}

function Player({ playerName, setPlayerName }) {
  return (
    <div>
      <label htmlFor="player-name">Player Name:</label>
      <input
        id="player-name"
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
    </div>
  );
}

function GameBoard({ grid, setGrid }) {
  const handleCellClick = (index) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      if (!newGrid[index]) {
        newGrid[index] = 'X';
      }
      return newGrid;
    });
  };

  return (
    <div className="grid">
      {grid.map((cell, index) => (
        <button key={index} onClick={() => handleCellClick(index)}>
          {cell}
        </button>
      ))}
    </div>
  );
}

export default App;
```

### Explanation

1. The App component manages the playerName and grid states and passes them as props to Player and GameBoard respectively.
2. This ensures that the state is centralized, promoting reusability and separation of concerns.

Note: This README.md is a general template. For more detailed explanations and code examples, please refer to the individual components and commits in the repository.
