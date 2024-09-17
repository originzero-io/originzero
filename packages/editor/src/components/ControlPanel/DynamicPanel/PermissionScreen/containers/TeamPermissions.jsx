import React from "react";
import { useDispatch } from "react-redux";
import Checkbox from "components/Shared/SwitchInput/Checkbox";
import PropTypes from "prop-types";
import * as Styled from "../components/PermissionScreen.style";

const propTypes = {
  permissions: PropTypes.object.isRequired,
  setSinglePermission: PropTypes.func,
};

export default function TeamPermissions({ permissions, setSinglePermission }) {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setSinglePermission({ event: e, permissionType: "team" }));
  };
  return (
    <Styled.TabContainer>
      <Styled.PermissionContainer>
        <Styled.PermissionHeader>Invite Member</Styled.PermissionHeader>
        <Styled.PermissionContent>
          <Checkbox
            name="CAN_INVITE_MEMBER"
            size="30px"
            defaultChecked={permissions.CAN_INVITE_MEMBER}
            center
            onChange={(e) => handleChange(e)}
            disabled={permissions.EVERYTHING}
            checked={permissions.EVERYTHING || permissions.CAN_INVITE_MEMBER}
          />
        </Styled.PermissionContent>
      </Styled.PermissionContainer>
      <Styled.PermissionContainer>
        <Styled.PermissionHeader>Remove Member</Styled.PermissionHeader>
        <Styled.PermissionContent>
          <Checkbox
            name="CAN_REMOVE_MEMBER"
            size="30px"
            defaultChecked={permissions.CAN_REMOVE_MEMBER}
            center
            onChange={(e) => handleChange(e)}
            disabled={permissions.EVERYTHING}
            checked={permissions.EVERYTHING || permissions.CAN_REMOVE_MEMBER}
          />
        </Styled.PermissionContent>
      </Styled.PermissionContainer>
      <Styled.PermissionContainer>
        <Styled.PermissionHeader>Assign Permission</Styled.PermissionHeader>
        <Styled.PermissionContent>
          <Checkbox
            name="CAN_ASSIGN_PERMISSION"
            size="30px"
            defaultChecked={permissions.CAN_ASSIGN_PERMISSION}
            center
            onChange={(e) => handleChange(e)}
            disabled={permissions.EVERYTHING}
            checked={permissions.EVERYTHING || permissions.CAN_ASSIGN_PERMISSION}
          />
        </Styled.PermissionContent>
      </Styled.PermissionContainer>
    </Styled.TabContainer>
  );
}

TeamPermissions.propTypes = propTypes;
