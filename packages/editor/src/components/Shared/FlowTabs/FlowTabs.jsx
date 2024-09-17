import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useActiveFlow from "utils/useActiveFlow";
import useFlow from "utils/useFlow";
import { Container, TabItem } from "./style";

const FlowTabs = () => {
  const flows = useFlow();
  const dispatch = useDispatch();
  const [openedFlows, setOpenedFlows] = useState([]);
  const { flowGui, flowConfig, flowGroups } = useActiveFlow();
  const { reactFlowInstance } = flowGui;

  const history = useHistory();
  const onClickHandle = (id) => {
    const { position, zoom, elements } = reactFlowInstance.toObject();
    const flow = {
      workspace: { ...flowGui, position, zoom },
      elements,
      groups: flowGroups,
    };
    // dispatch(mergeFlow(flow));
    history.push(`/change-tab/${id}`);
  };
  useEffect(() => {
    const opened = flows.filter((flow) => flow.opened === true);
    setOpenedFlows(opened);
  }, [flows]);
  // const closeFlowHandle = (event, flow) => {
  //   event.stopPropagation();
  //   dispatch(closeFlow(flow));
  //   if (flowConfig.id === flow.id) {
  //     const { position, zoom, elements } = reactFlowInstance.toObject();
  //     const flowx = {
  //       config: flowConfig,
  //       workspace: { ...flowGui, position, zoom },
  //       elements: elements,
  //       groups: flowGroups,
  //     };
  //     dispatch(mergeFlow(flowx));
  //     history.push("/");
  //   }
  // }
  return (
    <Container>
      {openedFlows.map((flow) => (
        <div key={flow.id} onClick={() => onClickHandle(flow.id)}>
          <TabItem
            disabled={flowConfig.id === flow.id}
            selected={flowConfig.id === flow.id}
            key={flow.id}
          >
            <div style={{ paddingRight: "20px" }}>{flow.name}</div>
          </TabItem>
        </div>
      ))}
    </Container>
  );
};
export default React.memo(FlowTabs);
