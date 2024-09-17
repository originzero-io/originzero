import React from "react";
import { Label } from "reactstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import Checkbox from "./Checkbox";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //background:${(props) => (props.disabled ? "gray" : "yellow")};
  /* background: 4px solid ${(props) => (props.checked ? "#b7e4c7" : "transparent")}; */
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "auto")};
`;

const propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  labelSize: PropTypes.string,
  checkboxSize: PropTypes.string,
  center: PropTypes.bool,
};
export default function CheckboxGroup({
  id,
  label,
  name,
  disabled,
  checked,
  onChange,
  labelSize,
  checkboxSize,
  center,
  defaultChecked,
}) {
  return (
    <StyledContainer disabled={disabled} checked={checked}>
      <Label style={{ userSelect: "none", fontSize: labelSize, margin: "2px" }} check>
        {label}
      </Label>
      <Checkbox
        id={id}
        name={name}
        size={checkboxSize}
        defaultChecked={defaultChecked}
        center={center}
        onChange={onChange}
        disabled={disabled}
        checked={checked}
      />
    </StyledContainer>
  );
}

CheckboxGroup.propTypes = propTypes;
