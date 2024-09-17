import Card from "components/Shared/Card/Card";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useAuthPermission from "utils/hooks/useAuthPermission";

import { getFlowsByProject } from "store/reducers/flow/flowSlice";
import { setActiveFlowConfig } from "store/reducers/flow/flowConfigSlice";
import useProject from "utils/hooks/useProject";

const propTypes = {
  flows: PropTypes.oneOfType([PropTypes.array, null]),
};

const FlowList = ({ flows }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { activeProject } = useProject();

  const getPermission = useAuthPermission("project");
  const openPageHandler = async (flow) => {
    dispatch(setActiveFlowConfig(flow));
    history.push(`/flow/${flow._id}`);
  };
  useEffect(() => {
    dispatch(getFlowsByProject(activeProject));
  }, []);

  return (
    <>
      {flows &&
        flows.map((flow) => {
          if (
            getPermission("CAN_VIEW_FLOW", {
              flowId: flow._id,
              projectId: flow.project._id,
            })
          ) {
            return (
              <div key={flow._id} onDoubleClick={() => openPageHandler(flow)}>
                <Card key={flow._id} data={flow} />
              </div>
            );
          }
          return null;
        })}
    </>
  );
};
FlowList.propTypes = propTypes;

export default React.memo(FlowList);
