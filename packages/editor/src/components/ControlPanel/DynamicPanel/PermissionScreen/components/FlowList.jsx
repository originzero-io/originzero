import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FlowService from "services/entityManagerService/flowService/flowService.http";
import CheckboxGroup from "components/Shared/SwitchInput/CheckboxGroup";
import useDidMountEffect from "utils/hooks/useDidMountEffect";
import { CollapsibleMenuItem } from "./CollapsibleMenu";

const propTypes = {
  permissions: PropTypes.object.isRequired,
  project: PropTypes.object.required,
  handleMultiChange: PropTypes.func,
  handleNestedAllChange: PropTypes.func,
  permissionName: PropTypes.string,
};
function FlowList({
  permissions,
  project,
  handleMultiChange,
  handleNestedAllChange,
  permissionName,
}) {
  const [flows, setFlows] = useState([]);
  const CAN_X_PROJECT = `CAN_${permissionName}_PROJECT`;
  const CAN_X_PROJECT_ALL = `CAN_${permissionName}_PROJECT_ALL`;
  const CAN_X_FLOW = `CAN_${permissionName}_FLOW`;
  const CAN_X_FLOW_ALL = `CAN_${permissionName}_FLOW_ALL`;

  useEffect(() => {
    async function fetch() {
      const flowsInThisProject = await FlowService.getFlowsByProject(project);
      setFlows(flowsInThisProject);
    }
    fetch();
  }, []);

  const flowInThisProject = permissions[CAN_X_FLOW].filter(
    (flow) => flow.projectId === project._id,
  );

  useDidMountEffect(() => {
    console.log(`${CAN_X_FLOW} - ${project.name} flows :`, flows);
    console.log(`${project.name} selected flows: `, flowInThisProject);
    if (
      flowInThisProject.length === flows.length &&
      !permissions[CAN_X_FLOW_ALL].includes(project._id)
    ) {
      handleNestedAllChange({
        target: {
          name: CAN_X_FLOW,
          checked: true,
          id: project._id,
        },
      });
    }
  }, [flowInThisProject.length]);
  return (
    <>
      {flows.length > 0 ? (
        <>
          <CollapsibleMenuItem>
            <CheckboxGroup
              label="All"
              name={CAN_X_FLOW}
              id={project._id}
              onChange={handleNestedAllChange}
              defaultChecked={permissions[CAN_X_FLOW_ALL]}
              disabled={
                permissions.EVERYTHING ||
                permissions[CAN_X_PROJECT_ALL] ||
                permissions[CAN_X_PROJECT].includes(project._id) ||
                ((permissionName === "VIEW" || permissionName === "USAGE") &&
                  (permissions[CAN_X_PROJECT_ALL] ||
                    // permissions.CAN_USAGE_FLOW_ALL.includes(project._id) ||
                    permissions.CAN_EDIT_FLOW_ALL.includes(project._id)))
              }
              checked={
                permissions.EVERYTHING ||
                permissions[CAN_X_PROJECT_ALL] ||
                permissions[CAN_X_FLOW_ALL].includes(project._id) ||
                permissions[CAN_X_PROJECT].includes(project._id)
              }
            />
          </CollapsibleMenuItem>
          {flows.map((flow) => (
            <CollapsibleMenuItem key={flow._id}>
              <CheckboxGroup
                label={flow.name}
                name={CAN_X_FLOW}
                id={flow._id}
                onChange={(e) => handleMultiChange(e, flow)}
                disabled={
                  permissions.EVERYTHING ||
                  permissions[CAN_X_PROJECT_ALL] ||
                  permissions[CAN_X_PROJECT].includes(flow.project._id) ||
                  ((permissionName === "VIEW" || permissionName === "USAGE") &&
                    (permissions.CAN_EDIT_FLOW.some((f) => f.flowId === flow._id) ||
                      // permissions.CAN_USAGE_FLOW.some(f=>f.id === flow._id) ||

                      // permissions.CAN_USAGE_FLOW_ALL.includes(project._id) ||
                      permissions.CAN_EDIT_FLOW_ALL.includes(project._id)))
                }
                checked={
                  permissions.EVERYTHING ||
                  permissions[CAN_X_PROJECT_ALL] ||
                  permissions[CAN_X_PROJECT].includes(project._id) ||
                  permissions[CAN_X_FLOW_ALL].includes(project._id) ||
                  permissions[CAN_X_FLOW].some((f) => f.flowId === flow._id) ||
                  ((permissionName === "VIEW" || permissionName === "USAGE") &&
                    // permissions.CAN_USAGE_FLOW.some(f=>f.flowId === flow._id) ||
                    permissions.CAN_EDIT_FLOW.some((f) => f.flowId === flow._id))
                }
              />
            </CollapsibleMenuItem>
          ))}
        </>
      ) : (
        <div style={{ paddingLeft: "10px", fontSize: "1.3vmin" }}>No flow in this project</div>
      )}
    </>
  );
}
FlowList.propTypes = propTypes;

export default FlowList;
