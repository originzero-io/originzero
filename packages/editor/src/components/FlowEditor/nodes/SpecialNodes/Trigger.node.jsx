import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { useFlowExecutorSocket } from "context/FlowExecutorSocketProvider";
import NodeGod from "../shared/NodeGod";

const Trigger = ({ self }) => {
  const { flowExecutorEvent } = useFlowExecutorSocket();

  const startTrig = () => {
    flowExecutorEvent.startByTrigger(self);
  };
  return (
    <NodeGod self={self}>
      <AiFillPlayCircle onClick={startTrig} style={{ color: "#65cd1a", fontSize: "40px" }} />
    </NodeGod>
  );
};
export default React.memo(Trigger);
