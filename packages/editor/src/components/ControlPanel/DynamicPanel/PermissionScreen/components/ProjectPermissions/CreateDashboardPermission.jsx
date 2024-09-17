import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Checkbox from "components/Shared/SwitchInput/Checkbox";
import CheckboxGroup from "components/Shared/SwitchInput/CheckboxGroup";
import * as Styled from "../PermissionScreen.style";
import CollapsibleMenu, { CollapsibleMenuItem } from "../CollapsibleMenu";

const propTypes = {
  projects: PropTypes.object.isRequired,
  permissions: PropTypes.object.isRequired,
  handleSingleAllChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
function CreateDashboardPermission({ projects, permissions, handleSingleAllChange, handleChange }) {
  useEffect(() => {
    if (permissions.CAN_CREATE_DASHBOARD.length === projects.length) {
      handleSingleAllChange({
        target: {
          name: "CAN_CREATE_DASHBOARD",
          checked: true,
        },
      });
    }
  }, [permissions.CAN_CREATE_DASHBOARD.length]);
  return (
    <>
      <Styled.PermissionHeader>Dashboard Create</Styled.PermissionHeader>
      <Styled.PermissionContent>
        <CollapsibleMenu trigger="Projects">
          <CollapsibleMenuItem>
            <CheckboxGroup
              label="All"
              name="CAN_CREATE_DASHBOARD"
              onChange={handleSingleAllChange}
              defaultChecked={permissions.CAN_CREATE_DASHBOARD_ALL}
              disabled={permissions.EVERYTHING}
              checked={permissions.EVERYTHING || permissions.CAN_CREATE_DASHBOARD_ALL}
            />
          </CollapsibleMenuItem>
          {projects.map((project) => (
            <CollapsibleMenuItem key={project._id}>
              <CheckboxGroup
                label={project.name}
                name="CAN_CREATE_DASHBOARD"
                id={project._id}
                onChange={(e) => handleChange(e)}
                defaultChecked={permissions.CAN_CREATE_DASHBOARD.includes(project._id)}
                disabled={permissions.EVERYTHING}
                checked={
                  permissions.EVERYTHING ||
                  permissions.CAN_CREATE_DASHBOARD_ALL ||
                  permissions.CAN_CREATE_DASHBOARD.includes(project._id)
                }
              />
            </CollapsibleMenuItem>
          ))}
        </CollapsibleMenu>
      </Styled.PermissionContent>
    </>
  );
}

CreateDashboardPermission.propTypes = propTypes;

export default CreateDashboardPermission;
