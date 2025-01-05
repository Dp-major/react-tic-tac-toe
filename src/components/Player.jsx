import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditAndSave() {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
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
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerNameEle}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditAndSave}>{buttonText}</button>
    </li>
  );
}
