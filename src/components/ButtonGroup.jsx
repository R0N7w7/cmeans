import React from 'react';
import { CostFunction } from './CostFunction';

const ButtonGroup = ({ onReset, onIterate, costFunction }) => {
  return (
    <div className="cost-do">
      <div className="button-do">
        <button className="button-13" onClick={onReset}>Reset</button>
      </div>
      <CostFunction costFunction={costFunction} />
      <div className="button-do">
        <button className="button-13" onClick={onIterate}>Run</button>
      </div>
    </div>
  );
};

export default ButtonGroup;
