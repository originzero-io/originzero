import React, { useContext, useEffect } from "react";
import Checkbox from "components/Shared/SwitchInput/Checkbox";
import CheckboxGroup from "components/Shared/SwitchInput/CheckboxGroup";
import PropTypes from "prop-types";
import * as Styled from "../PermissionScreen.style";
import CollapsibleMenu, { CollapsibleMenuItem } from "../CollapsibleMenu";
import PermissionContext from "../../context/PermissionContext";

const propTypes = {
  permissions: PropTypes.object.isRequired,
  handleAllChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default function EditDevicePermission({ permissions, handleAllChange, handleChange }) {
  const { controllers, processors } = useContext(PermissionContext);
  useEffect(() => {
    if (permissions.CAN_EDIT_CONTROLLER.length === controllers.length) {
      handleAllChange({
        target: {
          name: "CAN_EDIT_CONTROLLER",
          checked: true,
        },
      });
    }
  }, [permissions.CAN_EDIT_CONTROLLER.length]);

  useEffect(() => {
    if (permissions.CAN_EDIT_PROCESSOR.length === processors.length) {
      handleAllChange({
        target: {
          name: "CAN_EDIT_PROCESSOR",
          checked: true,
        },
      });
    }
  }, [permissions.CAN_EDIT_PROCESSOR.length]);
  return (
    <>
      <Styled.PermissionHeader>Edit</Styled.PermissionHeader>
      <Styled.PermissionContent>
        <CollapsibleMenu trigger="Controllers">
          <CollapsibleMenuItem>
            <CheckboxGroup
              label="All"
              name="CAN_EDIT_CONTROLLER"
              onChange={handleAllChange}
              defaultChecked={permissions.CAN_EDIT_CONTROLLER_ALL}
              disabled={permissions.EVERYTHING}
              checked={permissions.EVERYTHING || permissions.CAN_EDIT_CONTROLLER_ALL}
            />
          </CollapsibleMenuItem>
          {controllers.map((controller) => (
            <CollapsibleMenuItem key={controller._id}>
              <CheckboxGroup
                label={controller.name}
                name="CAN_EDIT_CONTROLLER"
                id={controller._id}
                onChange={(e) => handleChange(e)}
                // checked={controller.canEdit}
                defaultChecked={permissions.CAN_EDIT_CONTROLLER.includes(controller._id)}
                disabled={permissions.EVERYTHING}
                checked={
                  permissions.EVERYTHING ||
                  permissions.CAN_EDIT_CONTROLLER_ALL ||
                  permissions.CAN_EDIT_CONTROLLER.includes(controller._id)
                }
              />
            </CollapsibleMenuItem>
          ))}
        </CollapsibleMenu>
        <CollapsibleMenu trigger="Processors">
          <CollapsibleMenuItem>
            <CheckboxGroup
              label="All"
              name="CAN_EDIT_PROCESSOR"
              onChange={(e) => handleAllChange(e, controllers)}
              defaultChecked={permissions.CAN_EDIT_PROCESSOR_ALL}
              disabled={permissions.EVERYTHING}
              checked={permissions.EVERYTHING || permissions.CAN_EDIT_PROCESSOR_ALL}
            />
          </CollapsibleMenuItem>
          {processors.map((processor) => (
            <CollapsibleMenuItem key={processor._id}>
              <CheckboxGroup
                label={processor.name}
                name="CAN_EDIT_PROCESSOR"
                id={processor._id}
                onChange={(e) => handleChange(e)}
                // checked={processor.canEdit}
                defaultChecked={permissions.CAN_EDIT_PROCESSOR.includes(processor._id)}
                disabled={permissions.EVERYTHING}
                checked={
                  permissions.EVERYTHING ||
                  permissions.CAN_EDIT_PROCESSOR_ALL ||
                  permissions.CAN_EDIT_PROCESSOR.includes(processor._id)
                }
              />
            </CollapsibleMenuItem>
          ))}
        </CollapsibleMenu>
      </Styled.PermissionContent>
    </>
  );
}

EditDevicePermission.propTypes = propTypes;
