import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import CreateDevicePermission from "../components/DevicePermissions/CreateDevicePermission";
import EditDevicePermission from "../components/DevicePermissions/EditDevicePermission";
import UsageDevicePermission from "../components/DevicePermissions/UsageDevicePermission";
import * as Styled from "../components/PermissionScreen.style";

const propTypes = {
  permissions: PropTypes.object.isRequired,
  setSinglePermission: PropTypes.func,
  setMultiplePermission: PropTypes.func,
  setSingleAllPermission: PropTypes.func,
  setMultipleAllPermission: PropTypes.func,
};
export default function DevicePermissions({
  permissions,
  setSinglePermission,
  setMultiplePermission,
  setSingleAllPermission,
}) {
  const dispatch = useDispatch();

  const handleSingleDeviceChange = (e) => {
    dispatch(setSinglePermission({ event: e, permissionType: "device" }));
  };
  const handleMultiDeviceChange = (e) => {
    dispatch(setMultiplePermission({ event: e, permissionType: "device" }));
  };
  const handleAllChange = (e) => {
    dispatch(setSingleAllPermission({ event: e, permissionType: "device" }));
  };
  // console.log('device permissions rendered');

  return (
    <Styled.TabContainer>
      <Styled.PermissionContainer>
        <CreateDevicePermission permissions={permissions} handleChange={handleSingleDeviceChange} />
      </Styled.PermissionContainer>
      <Styled.PermissionContainer>
        <EditDevicePermission
          permissions={permissions}
          handleChange={handleMultiDeviceChange}
          handleAllChange={handleAllChange}
        />
      </Styled.PermissionContainer>
      <Styled.PermissionContainer>
        <UsageDevicePermission
          permissions={permissions}
          handleChange={handleMultiDeviceChange}
          handleAllChange={handleAllChange}
        />
      </Styled.PermissionContainer>
    </Styled.TabContainer>
  );
}

DevicePermissions.propTypes = propTypes;
