import React from "react";
import Switch from "react-switch";
import PropTypes from "prop-types";
import theme from "components/Shared/ThemeReference";

const propTypes = {
  checked: PropTypes.bool.isRequired,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};
export default function SwitchButton({
  checked = false,
  defaultChecked,
  onChange,
  width = 30,
  height = 15,
}) {
  return (
    <Switch
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={onChange}
      onColor="#888888"
      onHandleColor={theme.dark.hoverColor}
      handleDiameter={height}
      uncheckedIcon={false}
      checkedIcon={false}
      height={height}
      width={width}
      className="react-switch"
      id="material-switch"
    />
  );
}

SwitchButton.propTypes = propTypes;
