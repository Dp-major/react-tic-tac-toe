import { useState } from "react";

export default function Player({ initialName, symbol }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditAndSave() {
    setIsEditing((editing) => !editing);
  }

  function handleInputChange(event) {
    setPlayerName(event.target.value);
  }

  let playerNameEle = <span className="player-name">{playerName}</span>;
  let buttonText = "Edit";

  if (isEditing) {
    playerNameEle = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleInputChange}
      />
    );
    buttonText = "Save";
  }

  return (
    <li>
      <span className="player">
        {playerNameEle}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditAndSave}>{buttonText}</button>
    </li>
  );
}
