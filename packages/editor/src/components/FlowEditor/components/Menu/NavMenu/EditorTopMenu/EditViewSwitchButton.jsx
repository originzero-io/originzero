import React, { useState } from "react";
import { BsCameraVideo } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import Switch from "react-switch";

export default function EditViewSwitchButton() {
  const [checked, setChecked] = useState(true);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };
  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      // handleDiameter={35}
      offColor="#202020"
      onColor="#202020"
      offHandleColor={"#34374B"}
      onHandleColor="#48113B"
      height={34}
      width={70}
      // borderRadius={18}
      activeBoxShadow="none" // the color that appears when the button is focused
      // boxShadow="0px 0px 1px 2px red"
      uncheckedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 10,
            color: "#A6B3E8",
            paddingRight: 2,
          }}
        >
          View
        </div>
      }
      checkedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 10,
            color: "#E838BF",
            paddingRight: 2,
          }}
        >
          Live
        </div>
      }
      uncheckedHandleIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "#A6B3E8",
            fontSize: "18px",
            border: "2px solid #A6B3E8",
            borderRadius: "100%",
          }}
        >
          <AiOutlineEye />
        </div>
      }
      checkedHandleIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "#E838BF",
            fontSize: "18px",
            border: "2px solid #E838BF",
            borderRadius: "100%",
          }}
        >
          <BsCameraVideo />
        </div>
      }
      className="react-switch"
      id="small-radius-switch"
    />
  );
}
