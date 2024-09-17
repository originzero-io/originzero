import React from "react";
import { Button } from "reactstrap";
import useActiveFlow from "utils/hooks/useActiveFlow";
import { getIncomers, getOutgoers } from "reactflow";

export default function IncomersOutgoers({ node }) {
  const { flowElements } = useActiveFlow();
  const onGetIncomersHandler = () => {
    const { nodes, edges } = flowElements;
    const incomers = getIncomers(node, nodes, edges);
    console.log("incomers: ", incomers);
  };
  const onGetOutgoersHandler = () => {
    const { nodes, edges } = flowElements;
    const outgoers = getOutgoers(node, nodes, edges);
    console.log("outgoers: ", outgoers);
  };
  return (
    <div
      style={{
        width: "65%",
        marginBottom: "5px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Button color="warning" onClick={onGetIncomersHandler}>
        Get Incomers
      </Button>
      <Button color="warning" onClick={onGetOutgoersHandler}>
        Get Outgoers
      </Button>
    </div>
  );
}
