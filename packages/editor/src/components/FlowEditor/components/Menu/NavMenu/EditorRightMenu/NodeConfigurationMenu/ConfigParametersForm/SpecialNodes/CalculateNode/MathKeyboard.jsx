import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { StaticMathField } from "react-mathquill";

const KeyboardContainer = styled.div`
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
`;
const MathButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 55px;
  background-color: #262626;
  border: 2px solid #3a3a3a;
  margin: 4px;
  border-radius: 6px;
  &:hover {
    background-color: #373737;
  }
`;

const propTypes = {
  mathField: PropTypes.shape({
    write: PropTypes.func.isRequired,
    focus: PropTypes.func.isRequired,
  }).isRequired,
};

// prettier-ignore
const keys = [
  {
    text: "\\left(\\right)^2",
    latex: "\\left(\\right)^2",
  },
  {
    text: "x^{ }",
    latex: "^{ }",
  },
  {
    text: "\\sqrt{ }",
    latex: "\\sqrt{ }",
  },
  {
    text: "\\sqrt[]{}",
    latex: "\\sqrt[]{ }",
  },
  {
    text: "\\left|\\right|",
    latex: "\\left|\\right|",
  },
  {
    text: "\\log _{ }\\left(\\right)",
    latex: "\\log _{ }\\left(\\right)",
  },
  {
    text: "ln",
    latex: "\\ln \\left(\\right)",
  },
  {
    text: "e^{ }",
    latex: "e^{ }",
  },
  {
    text: "\\pi",
    latex: "\\pi",
  },
  {
    text: "\\theta",
    latex: "\\theta",
  },
  {
    text: "\\infty",
    latex: "\\infty",
  },
  {
    text: "sum",
    latex: "\\sum _{n=0}",
  },
  {
    text: "sin",
    latex: "\\sin \\left(\\right)",
  },
  {
    text: "cos",
    latex: "\\cos \\left(\\right)",
  },
  {
    text: "tan",
    latex: "\\tan \\left(\\right)",
  },
  {
    text: "cot",
    latex: "\\cot \\left(\\right)",
  },
  {
    text: "\\int _{ }^{ }",
    latex: "\\int _{ }^{ }",
  },
  {
    text: "lim",
    latex: "\\lim _{x\\to \\infty }\\left(\\right)",
  },
  {
    text: "\\frac{\\partial }{\\partial x}",
    latex: "\\frac{\\partial }{\\partial x}\\left(\\right)",
  },
  {
    text: "\\frac{d}{dx}",
    latex: "\\frac{d}{dx}\\left(\\right)",
  },
  {
    text: "f\\left(x\\right)",
    latex: "f\\left(x\\right)",
  },
];

function MathKeyboard({ mathField }) {
  const handleKeyboardClick = (character) => {
    if (mathField) {
      mathField.write(character);
      mathField.focus();
    }
  };
  return (
    <KeyboardContainer>
      {keys.map((key) => (
        <MathButton key={key.text} onClick={() => handleKeyboardClick(key.latex)}>
          <StaticMathField style={{ cursor: "pointer", padding: "8px", pointerEvents: "none" }}>
            {key.text}
          </StaticMathField>
        </MathButton>
      ))}
    </KeyboardContainer>
  );
}

MathKeyboard.propTypes = propTypes;

export default MathKeyboard;
