import React from "react";
import { AiOutlineFundProjectionScreen, AiOutlineTeam, AiOutlineSave } from "react-icons/ai";
import { MdDevicesOther, MdOutlineAssignmentInd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useUser from "utils/hooks/useUser";
import useUserPermission from "utils/hooks/useUserPermission";
import useWorkspace from "utils/hooks/useWorkspace";
import CheckboxGroup from "components/Shared/SwitchInput/CheckboxGroup";
import {
  setCanDoEverythingPermission,
  setSinglePermission,
  setMultiplePermission,
  setNestedMultiplePermission,
  setSingleAllPermission,
  setNestedAllPermission,
  getUserPermissionInThisWorkspace,
} from "store/reducers/userPermissionSlice";
import { Button } from "reactstrap";

import PermissionService from "services/entityManagerService/permissionService/permissionService.http";
import notification from "utils/ui/notificationHelper";
import { setModal } from "store/reducers/componentSlice";
import useComponentWillMount from "utils/hooks/useComponentWillMount";
import { getMyPermissionInThisWorkspace } from "store/reducers/authPermissionSlice";
import useAuth from "utils/hooks/useAuth";
import { PermissionProvider } from "./context/PermissionContext";
import TeamPermissions from "./containers/TeamPermissions";
import ProjectPermissions from "./containers/ProjectPermissions";
import DevicePermissions from "./containers/DevicePermissions";
import UserHeader from "./components/UserHeader";
import * as Styled from "./components/PermissionScreen.style";
import PresetList from "./components/PresetList";
import AddPreset from "./components/AddPreset";

export default function PermissionScreen() {
  const dispatch = useDispatch();
  const { activeWorkspace } = useWorkspace();
  const params = useParams();
  const auth = useAuth();
  const users = useUser();
  const member = users.find((user) => user._id === params.member_id);

  const handleEverythingPermission = (e) => {
    dispatch(setCanDoEverythingPermission(e));
  };
  const permissions = useUserPermission();

  useComponentWillMount(async () => {
    dispatch(
      getUserPermissionInThisWorkspace({
        workspace: activeWorkspace,
        user: member,
      }),
    );
  }, [activeWorkspace._id, member._id]);

  const handleSavePermissions = async () => {
    const data = {
      userId: member._id,
      workspaceId: activeWorkspace._id,
      permissions,
    };
    await PermissionService.savePermission(data);

    if (data.userId === auth._id) {
      dispatch(
        getMyPermissionInThisWorkspace({
          workspace: activeWorkspace,
          me: auth,
        }),
      );
    }
    notification.success("Permissions saved");
  };
  const handleSavePreset = () => {
    dispatch(setModal(<AddPreset permissions={permissions} />));
  };
  const handleLoadPreset = () => {
    dispatch(setModal(<PresetList />));
  };
  return (
    <PermissionProvider>
      <div style={{ height: "90vh" }}>
        <UserHeader member={member} />
        <Styled.AllPermissionsContainer>
          <CheckboxGroup
            label="This user can do everything"
            labelSize="1.6vmin"
            name="CAN_DO_EVERYTHING"
            onChange={(e) => handleEverythingPermission(e)}
            defaultChecked={permissions.CAN_DO_EVERYTHING}
            checked={permissions.CAN_DO_EVERYTHING}
          />
        </Styled.AllPermissionsContainer>
        <Tabs selectedTabClassName="selected-tab" style={{ height: "80%" }} forceRenderTabPanel>
          <TabList
            style={{
              marginBottom: "0px",
              borderBottom: "none",
            }}
          >
            <Tab>
              <AiOutlineFundProjectionScreen style={{ fontSize: "2vmin" }} />
              <span style={{ marginLeft: "5px" }}>Project</span>
            </Tab>
            <Tab>
              <AiOutlineTeam style={{ fontSize: "2vmin" }} />
              <span style={{ marginLeft: "5px" }}>Team</span>
            </Tab>
            <Tab>
              <MdDevicesOther style={{ fontSize: "2vmin" }} />
              <span style={{ marginLeft: "5px" }}>Device</span>
            </Tab>
          </TabList>
          <TabPanel style={{ height: "100%" }}>
            <ProjectPermissions
              permissions={{
                ...permissions.project,
                EVERYTHING: permissions.CAN_DO_EVERYTHING,
              }}
              setSingleAllPermission={setSingleAllPermission}
              setMultiplePermission={setMultiplePermission}
              setNestedMultiplePermission={setNestedMultiplePermission}
              setSinglePermission={setSinglePermission}
              setNestedAllPermission={setNestedAllPermission}
            />
          </TabPanel>
          <TabPanel style={{ height: "100%" }}>
            <TeamPermissions
              permissions={{
                ...permissions.team,
                EVERYTHING: permissions.CAN_DO_EVERYTHING,
              }}
              setSinglePermission={setSinglePermission}
            />
          </TabPanel>
          <TabPanel style={{ height: "100%" }}>
            <DevicePermissions
              permissions={{
                ...permissions.device,
                EVERYTHING: permissions.CAN_DO_EVERYTHING,
              }}
              setSinglePermission={setSinglePermission}
              setMultiplePermission={setMultiplePermission}
              setSingleAllPermission={setSingleAllPermission}
            />
          </TabPanel>
        </Tabs>
        <Button color="success" onClick={handleSavePermissions}>
          <AiOutlineSave style={{ fontSize: "24px" }} /> Assign this to {member.username}
        </Button>
        <Button outline style={{ marginLeft: "15px" }} onClick={handleSavePreset}>
          <MdOutlineAssignmentInd style={{ fontSize: "24px" }} /> Save as preset
        </Button>
        <Button outline color="warning" style={{ marginLeft: "15px" }} onClick={handleLoadPreset}>
          <MdOutlineAssignmentInd style={{ fontSize: "24px" }} /> Load Preset
        </Button>
      </div>
    </PermissionProvider>
  );
}
