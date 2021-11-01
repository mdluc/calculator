import React from "react";
import data from "./data.js";

const KeyPad = ({pressedKey}) => {

  const handleOnClick = (e) =>{
    e.preventDefault();
    pressedKey(e.target.name);
  }
  return (
      <div className="calculator col-4">
        {data.map((item) => {
          const {id, symbol} = item;
          return (
              <button
                name={symbol}
                className={`key-btn ${parseInt(symbol) || parseInt(symbol) === 0 ?"number": "symbol"}`}
                onClick={handleOnClick}
                key={id}
              >
                {symbol === "*"? "x" : symbol === "/" ? "÷" : symbol}
              </button>
          );
        })}
      </div>
  );
};

export default KeyPad;
