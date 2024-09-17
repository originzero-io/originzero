import { useSelector } from "react-redux";

export default function useAuthPermission(permissionType) {
  const permissionState = useSelector((state) => state.authPermissions);
  const selectedPermissionCategory = permissionState[permissionType];

  // return true/false
  return (permissionName, entity) => {
    // console.log("permission_name: ", permissionName);
    // console.log("entity: ", entity);
    const permissionRecord = selectedPermissionCategory[permissionName];
    // console.log("permission-record: ", permissionRecord);
    if (permissionRecord === "undefined") {
      return "Invalid permission name - available now => 'device', 'project', 'team'";
    }
    if (permissionState.CAN_DO_EVERYTHING) {
      return true;
    }
    if (Array.isArray(permissionRecord)) {
      const FLOW_NESTED_ARRAY = ["CAN_VIEW_FLOW", "CAN_USAGE_FLOW", "CAN_EDIT_FLOW"];

      const permissionAllState = selectedPermissionCategory[`${permissionName}_ALL`];
      // permissionAllState = project.CAN_VIEW_FLOW_ALL

      if (FLOW_NESTED_ARRAY.includes(permissionName)) {
        const projectAllName = `CAN_${permissionName.split("_")[1]}_PROJECT_ALL`;
        // projectAllName = CAN_VIEW_PROJECT_ALL

        const projectAllState = selectedPermissionCategory[projectAllName];
        // projectAllState = project.CAN_VIEW_PROJECT_ALL

        const thisProjectAllName = `CAN_${permissionName.split("_")[1]}_PROJECT`;
        // thisProjectAllName = CAN_VIEW_PROJECT

        const thisProjectAllArray = selectedPermissionCategory[thisProjectAllName];
        // thisProjectAllArray = project.CAN_VIEW_PROJECT

        const flowAllState = permissionAllState.includes(entity.projectId);
        const thisProjectAllState = thisProjectAllArray.includes(entity.projectId);

        if (projectAllState) {
          return true;
        }
        if (thisProjectAllState) {
          return true;
        }
        if (flowAllState) {
          return true;
        }
        if (permissionRecord.some((p) => p.flowId === entity.flowId)) {
          return true;
        }
        return false;
      }

      if (permissionAllState) {
        return true;
      }
      return permissionRecord.includes(entity);
    }

    return permissionRecord;
  };
}
