import useAuthPermission from "utils/hooks/useAuthPermission.js";
import React from "react";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { setModal } from "store/reducers/componentSlice";
import ManageMembers from "./components/ManageMembers.jsx";
import MemberList from "./MemberList.jsx";

export default function TeamScreen() {
  const dispatch = useDispatch();
  const getPermission = useAuthPermission("team");
  const addMemberToTeamHandle = () => {
    dispatch(setModal(<ManageMembers />));
  };
  return (
    <>
      {getPermission("CAN_REMOVE_MEMBER") && getPermission("CAN_INVITE_MEMBER") && (
        <Button color="success" onClick={addMemberToTeamHandle} style={{ marginBottom: "5px" }}>
          <MdOutlineManageAccounts style={{ fontSize: "2.5vmin", marginRight: "5px" }} />
          Manage Members
        </Button>
      )}
      <MemberList />
    </>
  );
}
