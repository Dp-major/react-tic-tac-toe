import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEditAndSave() {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  }

  let playerName = <span className="player-name">{name}</span>;
  let buttonText = "Edit";

  if (isEditing) {
    playerName = <input type="text" required />;
    buttonText = "Save";
  }

  return (
    <li>
      <span className="payer">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditAndSave}>{buttonText}</button>
    </li>
  );
}
