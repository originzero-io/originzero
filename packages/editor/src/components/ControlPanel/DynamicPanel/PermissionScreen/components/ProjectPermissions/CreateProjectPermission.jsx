import React from "react";
import PropTypes from "prop-types";
import Checkbox from "components/Shared/SwitchInput/Checkbox";
import * as Styled from "../PermissionScreen.style";

const propTypes = {
  permissions: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
function CreateProjectPermission({ permissions, handleChange }) {
  return (
    <>
      <Styled.PermissionHeader>Project Create</Styled.PermissionHeader>
      <Styled.PermissionContent>
        <Checkbox
          name="CAN_CREATE_PROJECT"
          size="30px"
          center
          defaultChecked={permissions.CAN_CREATE_PROJECT}
          disabled={permissions.EVERYTHING}
          checked={permissions.EVERYTHING || permissions.CAN_CREATE_PROJECT}
          onChange={(e) => handleChange(e)}
        />
      </Styled.PermissionContent>
    </>
  );
}

CreateProjectPermission.propTypes = propTypes;

export default CreateProjectPermission;
