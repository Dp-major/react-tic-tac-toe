import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEditAndSave() {
    // To update state using previous state value use arrow function like below
    // as react will provide the latest previous value of the state
    setIsEditing((editing) => !editing);
  }

  let playerName = <span className="player-name">{name}</span>;
  let buttonText = "Edit";

  if (isEditing) {
    playerName = <input type="text" required value={name} />;
    buttonText = "Save";
  }

  return (
    <li>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditAndSave}>{buttonText}</button>
    </li>
  );
}
