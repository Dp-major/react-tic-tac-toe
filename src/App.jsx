import Player from "./components/Player";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="Player 1" symbol="O" />
          <Player name="Player 2" symbol="X" />
        </ol>
        GAME BOARD
      </div>
      LOGS
    </main>
  );
}

export default App;
