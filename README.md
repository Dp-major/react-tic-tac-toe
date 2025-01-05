# react-tic-tac-toe
This repository is a tic-tac-toe game development using react. In this repo we are going to learn patterns and advanced concepts of react

# Learnings

## 1. Best Practice to Update State Based on Previous State Value

When updating a state variable based on its previous value, it is a best practice to use the updater function pattern in `useState`. This ensures that the update logic correctly works regardless of potential asynchronous updates to state.

### Example

```jsx
function handleSelectSquare(rowIndex, colIndex) {
  setGameTurns((prevTurns) => {
    const curretPlayer = deriveActivePlayer(prevTurns);
    return [
      { square: { row: rowIndex, col: colIndex }, player: curretPlayer },
      ...prevTurns,
    ];
  });
}
```

## Explanation

When updating state based on the previous value, the updater function ensures the most recent state is used, avoiding potential issues with asynchronous state updates. This pattern is especially useful when the state update depends on complex logic or multiple interactions.

## 2. Implemented Two-Way Binding for Editing and Saving Player Names

Two-way binding is implemented using controlled components for the player name input field. This allows real-time updates of state based on user input.

### Example

```jsx
function handleInputChange(event) {
  setPlayerName(event.target.value); // Updates state as user types
}

let playerNameEle = (
  <input
    type="text"
    required
    value={playerName} // Binds state to input value
    onChange={handleInputChange}
  />
);
```

## Explanation

Two-way binding enables seamless synchronization between the state and the UI. As the user types in the input field, the state updates (`onChange` handler), and the input reflects the state (`value` attribute). This is crucial for creating editable forms where UI and state stay consistent.

## 3. Added Click Handler on Grid by Updating State Immutably

The click handler for selecting a square updates the game board state immutably, ensuring clean and predictable updates.

### Example

```jsx
function handleSelectSquare(rowIndex, colIndex) {
  setGameTurns((prevTurns) => {
    const updatedTurns = [
      { square: { row: rowIndex, col: colIndex }, player: deriveActivePlayer(prevTurns) },
      ...prevTurns,
    ];
    return updatedTurns; // Returns a new state array without modifying the original
  });
}
```

## Explanation

Immutability ensures that the state is not directly modified, preserving its original structure. Instead, a new state is created using spread operators or other techniques. This practice simplifies debugging, enables React to optimize rendering, and aligns with the functional programming principles React relies on.

## 4. Implemented Lifting State Concept

The state of game turns is lifted to the parent `App` component so it can be shared among child components (`GameBoard`, `Player`, and `Log`).

### Example

In the `App` component:

```jsx
const [gameTurns, setGameTurns] = useState([]);

<GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
<Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} />
<Log turns={gameTurns} />
```

## Explanation

Lifting state involves moving the shared state to a common ancestor component. This allows child components to access and modify the state via props, ensuring synchronization across components. Here, `gameTurns` is lifted to `App`, enabling `Player`, `GameBoard`, and `Log` to share the same data.

## 5. Avoid Intersecting States

Instead of maintaining multiple intersecting states for the game board and game turns, the logic derives the game board state directly from `gameTurns`, avoiding redundancy.

### Example
```jsx
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let gameBoard = initialGameBoard;
for (const turn of turns) {
  const { square, player } = turn;
  const { row, col } = square;
  gameBoard[row][col] = player;
}
```

## Explanation

Intersecting states occur when multiple states depend on each other to represent the same data. This leads to duplication and potential inconsistencies. By deriving the game board from `gameTurns`, the code avoids managing redundant states, ensuring a single source of truth.

## 6. Deriving State from Props

In the `Player` component, the `isActive` property is derived from the `activePlayer` state passed as a prop from the parent `App` component.

### Example
```jsx
<Player
  initialName="Player 1"
  symbol="X"
  isActive={activePlayer === "X"} // Derived state
/>
```

## Explanation

Derived state uses props to calculate values rather than maintaining separate state variables. This reduces complexity and ensures the component always reflects the most up-to-date parent state. For instance, the `isActive` state in `Player` is derived from the `activePlayer` prop.

## 7. Sharing State Across Components

State is shared among components via props. For example, `gameTurns` is shared with `GameBoard` to display the current board and with `Log` to show the action history.

### Example
```jsx
<GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
<Log turns={gameTurns} />
```

## Explanation

State sharing is achieved by passing state and handlers as props to child components. This approach ensures modularity and clear ownership of state while enabling components to collaborate. Here, `gameTurns` is shared with `GameBoard` for rendering and `Log` for logging moves.

## 8. Reducing State Management

Instead of managing a separate game board state, it is derived dynamically from `gameTurns`, reducing state management complexity.

### Example
```jsx
let gameBoard = initialGameBoard;
for (const turn of turns) {
  const { square, player } = turn;
  gameBoard[square.row][square.col] = player;
}
```

## Explanation

Deriving data dynamically instead of storing redundant state reduces the complexity of managing and updating state. By constructing the game board from `gameTurns`, the need for additional state is eliminated, preventing potential inconsistencies and simplifying updates.

## 9. Disabling Button Conditionally

The buttons in the game grid are conditionally disabled to prevent selecting an already occupied square.

### Example
```jsx
<button
  onClick={() => onSelectSquare(rowIndex, colIndex)}
  disabled={playerSymbol != null} // Disable if square is occupied
>
  {playerSymbol}
</button>
```

## Explanation

Conditional disabling ensures buttons respond appropriately to user actions. By dynamically setting the `disabled` attribute based on the game's current state, the logic prevents invalid moves (e.g., selecting an occupied square), enhancing the user experience and ensuring game rules are enforced.


Note: This README.md is a general template. For more detailed explanations and code examples, please refer to the individual components and commits in the repository.

# Important readings from GPT
[How react reenders components on state and props change](https://chatgpt.com/share/677a3fd9-9f70-800c-abc2-e92e01d5e0a5)
