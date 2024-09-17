import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Checkbox from "components/Shared/SwitchInput/Checkbox";
import CheckboxGroup from "components/Shared/SwitchInput/CheckboxGroup";
import * as Styled from "../PermissionScreen.style";
import CollapsibleMenu, { CollapsibleMenuItem, CollapsibleSubMenu } from "../CollapsibleMenu";
import FlowList from "../FlowList";
import DashboardList from "../DashboardList";

const propTypes = {
  projects: PropTypes.array.isRequired,
  permissions: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleNestedMultiChange: PropTypes.func.isRequired,
  handleSingleAllChange: PropTypes.func.isRequired,
  handleNestedAllChange: PropTypes.func.isRequired,
};
function EditProjectPermission({
  projects,
  permissions,
  handleChange,
  handleNestedMultiChange,
  handleSingleAllChange,
  handleNestedAllChange,
}) {
  useEffect(() => {
    if (projects.length === permissions.CAN_EDIT_PROJECT.length) {
      handleSingleAllChange({
        target: {
          name: "CAN_EDIT_PROJECT",
          checked: true,
        },
      });
    }
  }, [permissions.CAN_EDIT_PROJECT.length]);
  return (
    <>
      <Styled.PermissionHeader>Edit</Styled.PermissionHeader>
      <Styled.PermissionContent>
        <CollapsibleMenu trigger="Projects">
          <CollapsibleMenuItem>
            <CheckboxGroup
              label="All"
              name="CAN_EDIT_PROJECT"
              onChange={handleSingleAllChange}
              defaultChecked={permissions.CAN_EDIT_PROJECT_ALL}
              disabled={permissions.EVERYTHING}
              checked={permissions.EVERYTHING || permissions.CAN_EDIT_PROJECT_ALL}
            />
          </CollapsibleMenuItem>
          {projects.map((project) => (
            <CollapsibleSubMenu key={project._id} trigger={`${project.name}`}>
              <CollapsibleMenuItem>
                <CheckboxGroup
                  label="This project"
                  name="CAN_EDIT_PROJECT"
                  id={project._id}
                  onChange={(e) => handleChange(e)}
                  defaultChecked={permissions.CAN_EDIT_PROJECT.includes(project._id)}
                  disabled={permissions.EVERYTHING}
                  checked={
                    permissions.EVERYTHING ||
                    permissions.CAN_EDIT_PROJECT_ALL ||
                    permissions.CAN_EDIT_PROJECT.includes(project._id)
                  }
                />
              </CollapsibleMenuItem>
              <CollapsibleSubMenu trigger="Flows">
                <FlowList
                  permissions={permissions}
                  project={project}
                  handleMultiChange={handleNestedMultiChange}
                  handleNestedAllChange={handleNestedAllChange}
                  permissionName="EDIT"
                />
              </CollapsibleSubMenu>
              <CollapsibleSubMenu trigger="Dashboards" open={false}>
                <DashboardList project={project} />
              </CollapsibleSubMenu>
            </CollapsibleSubMenu>
          ))}
        </CollapsibleMenu>
      </Styled.PermissionContent>
    </>
  );
}

EditProjectPermission.propTypes = propTypes;

export default EditProjectPermission;
