/* eslint-disable no-alert */
import { useEffect, useState } from "react";
import { EditableMathField, addStyles } from "react-mathquill";
import "./MathField.css";
import GlobalButtonStyled from "components/StyledComponents/Button";
import MathKeyboard from "./MathKeyboard";
import MathVariables from "./MathVariables";

addStyles();

export default function CalculateNodeConfigParameters({ node, tabName, groupName, dispatcher }) {
  const [latex, setLatex] = useState("");
  const [mathField, setMathField] = useState("");
  // const [mathField, setMathField] = useState(
  //   node.data.configParameters[0].groups[0].formData[0].defaultValue,
  // );
  const [showKeyboard, setShowKeyboard] = useState(false);

  useEffect(() => {
    // setLatex(node.data.configParameters.formula);
    const { value, defaultValue } = node.data.configParameters[0].groups[0].formData[0];
    console.log("d:", defaultValue);
    value ? setLatex(value) : setLatex(defaultValue);
  }, []);

  const formulaChangeHandler = (mathFieldInstance) => {
    setLatex(mathFieldInstance.latex());
    setMathField(mathFieldInstance);
    const newConfigDispatcher = {
      type: "updateConfigParameters",
      payload: {
        tabName,
        groupName,
        formItemName: "formula",
        formItemValue: mathFieldInstance.latex(),
      },
    };
    dispatcher(newConfigDispatcher);
    // dispatcher({
    //   type: "updateConfigParameters",
    //   payload: {
    //     name: "formula",
    //     value: mathFieldInstance.latex(),
    //   },
    // });
  };
  const showKeyboardHandler = () => {
    setShowKeyboard(!showKeyboard);
  };

  return (
    <div>
      <EditableMathField
        className="math-textbox"
        latex={latex}
        onChange={(mathFieldInstance) => formulaChangeHandler(mathFieldInstance)}
        // value={latex}
      />

      <GlobalButtonStyled style={{ width: "150px" }} onClick={showKeyboardHandler}>
        {showKeyboard ? "Hide Keyboard" : "Show Keyboard"}
      </GlobalButtonStyled>

      {showKeyboard && <MathKeyboard mathField={mathField} />}

      <MathVariables node={node} dispatcher={dispatcher} />

      {/* <div className="math-latex" id="latex" value={latex}>
        {latex}
      </div> */}
    </div>
  );
}
