# react-tic-tac-toe
This repository is a tic-tac-toe game development using react. In this repo we are going to learn patterns and advanced concepts of react

# Learnings

## 1. Best Practice to Update State Based on Previous State Value

When updating state in React, it is crucial to ensure that the new state is derived correctly from the previous state. This avoids potential bugs caused by asynchronous state updates.

### Example

```javascript
const [counter, setCounter] = React.useState(0);

// Correct way to update state based on previous value
const incrementCounter = () => {
  setCounter((prevCounter) => prevCounter + 1);
};
