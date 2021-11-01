import React, {useEffect, useState} from "react"
import KeyPad from "./KeyPad";
import Result from "./Result";


const Parser = require("expr-eval").Parser;

function App() {
  const [result, setResult] = useState("");
  const [alert, setAlert] = useState(false);


  useEffect(()=>{
    let timeOut = setTimeout(()=>setAlert(true),1000);

    return () => {
      clearTimeout(timeOut)
    };

  },[alert]);

  const reset = () => {
    setResult("");
  };

  const backspace = () => {
    const newValue = result.slice(0, -1);
    if (result === "error") {
      setResult("");
    } else {
      setResult(newValue);
    }
  };

  const calculate = () => {
    let checkResult = "";
    if (result.includes("--")) {
      checkResult = result.replace("--", "+");
    } else {
      checkResult = result;
    }

    try {
      const parser = new Parser();
      let expr = parser.parse(checkResult);
      let resultOp = expr.evaluate();
      setResult(resultOp.toString());
    } catch (e) {
      setResult("ERROR");
    }
  };

  const getResults = (button) => {
    if (button === "=") {
      calculate();
    } else if (button === "C") {
      reset();
    } else if (button === "CE") {
      backspace();
    } else {
        const calculate = result + button;
        if(alert && calculate.length > 15){
          setResult("digit limit met");
      }
        else{
          setResult(calculate);
        }
    }
  };

  return (
    <section className="calculator-center">
      <Result result={result} />
      <KeyPad pressedKey={getResults} />
    </section>
  );
}

export default App;
