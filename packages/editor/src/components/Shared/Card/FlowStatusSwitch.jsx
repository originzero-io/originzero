import React, { useState } from "react";
import { BsCameraVideo } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import Switch from "react-switch";
import { FaPlay } from "react-icons/fa6";
import { GiPauseButton } from "react-icons/gi";

export default function FlowStatusSwitch() {
  const [checked, setChecked] = useState(true);
  const handleChange = (nextChecked, event) => {
    event.stopPropagation();
    setChecked(nextChecked);
  };
  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      offColor="#202020"
      onColor="#202020"
      offHandleColor="#757575"
      onHandleColor="#43B104"
      height={23}
      width={40}
      activeBoxShadow="none" // the color that appears when the button is focused
      uncheckedIcon={<div></div>}
      checkedIcon={<div></div>}
      uncheckedHandleIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "#393939",
            fontSize: "10px",
            borderRadius: "100%",
          }}
        >
          <GiPauseButton />
        </div>
      }
      checkedHandleIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "#393939",
            fontSize: "10px",
            borderRadius: "100%",
          }}
        >
          <FaPlay />
        </div>
      }
      className="react-switch"
      id="small-radius-switch"
    />
  );
}
