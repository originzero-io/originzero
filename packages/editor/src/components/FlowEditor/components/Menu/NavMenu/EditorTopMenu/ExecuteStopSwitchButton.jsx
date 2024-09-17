/* eslint-disable no-nested-ternary */
import React from "react";
import Switch from "react-switch";
import { BsFillPlayFill } from "react-icons/bs";
import { GiPauseButton } from "react-icons/gi";
import { IoIosInformation } from "react-icons/io";
import PropTypes from "prop-types";
import { useFlowContext } from "context/FlowDataProvider";

const propTypes = {
  executeFlowHandler: PropTypes.func.isRequired,
  stopFlowHandler: PropTypes.func.isRequired,
};
export default function ExecuteStopSwitchButton({ executeFlowHandler, stopFlowHandler }) {
  const { executionStatus } = useFlowContext();
  const handleExecuteChange = (nextChecked) => {
    if (nextChecked === true) {
      executeFlowHandler();
    } else {
      stopFlowHandler();
    }
  };
  return (
    <Switch
      checked={executionStatus === "executing"}
      onChange={handleExecuteChange}
      // handleDiameter={35}
      offColor="#202020"
      onColor="#202020"
      offHandleColor={executionStatus === "error" ? "#FF9494" : "#C1C1C1"}
      onHandleColor="#65CD1A"
      height={34}
      width={84}
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
            color: "#65CD1A",
            paddingRight: 2,
          }}
        >
          Execute
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
            color: "#C1C1C1",
            paddingRight: 2,
          }}
          onClick={stopFlowHandler}
        >
          Pause
        </div>
      }
      uncheckedHandleIcon={
        executionStatus === "error" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "#F51C1C",
              fontSize: "50px",
              border: "2px solid #F51C1C",
              borderRadius: "100%",
            }}
          >
            <IoIosInformation />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "#262626",
              fontSize: "16px",
              border: "2px solid #393939",
              borderRadius: "100%",
            }}
          >
            <GiPauseButton />
          </div>
        )
      }
      checkedHandleIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "#262626",
            fontSize: "22px",
            border: "2px solid #288818",
            borderRadius: "100%",
          }}
        >
          <BsFillPlayFill />
        </div>
      }
      className="react-switch"
      id="small-radius-switch"
    />
  );
}

ExecuteStopSwitchButton.propTypes = propTypes;
