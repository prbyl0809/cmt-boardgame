import React from "react";

const ResetButton = ({ onReset }) => {
  return (
    <button onClick={onReset}>
      Reset Game
    </button>
  );
};

export default ResetButton;
