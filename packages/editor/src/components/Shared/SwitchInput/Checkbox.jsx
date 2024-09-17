import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  size: PropTypes.string,
  type: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  center: PropTypes.bool,
  disabled: PropTypes.bool,
};
export default function Checkbox({
  id,
  name,
  onChange,
  onClick,
  size = "25px",
  type,
  checked,
  defaultChecked,
  center = false,
  disabled,
  ...rest
}) {
  const checkbox_size = type === "main" ? "30px" : size;
  const centeredStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  const checkbox = () => (
    <input
      id={id}
      name={name}
      type="checkbox"
      onChange={onChange}
      onClick={onClick}
      style={{ width: checkbox_size, height: checkbox_size, cursor: "pointer" }}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      {...rest}
    />
    // <div className="form-check form-switch">
    //   <input
    //     className="form-check-input"
    //     type="checkbox"
    //     name={name}
    //     onChange={onChange}
    //     onClick={onClick}
    //     style={{
    //       width: "40px",
    //       height: "20px",
    //       cursor: "pointer",
    //     }}
    //     checked={checked}
    //     defaultChecked={defaultChecked}
    //     disabled={disabled}
    //     {...rest}
    //   />
    // </div>
  );
  return <>{center ? <div style={centeredStyle}>{checkbox()}</div> : checkbox()}</>;
}
Checkbox.propTypes = propTypes;
