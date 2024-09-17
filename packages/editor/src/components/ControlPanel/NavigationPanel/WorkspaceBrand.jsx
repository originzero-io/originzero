import React from "react";
import { useDispatch } from "react-redux";
import { setModal } from "store/reducers/componentSlice";
import { setActiveWorkspace } from "store/reducers/workspaceSlice";
import { VscTrash } from "react-icons/vsc";
import { BiEdit } from "react-icons/bi";
import PropTypes from "prop-types";
import useAuth from "utils/hooks/useAuth";
import useWorkspace from "utils/hooks/useWorkspace";
import styled from "styled-components";
import { useEntityManagerSocket } from "context/EntityManagerSocketProvider";
import EditWorkspaceForm from "../WorkspacePanel/EditWorkspaceForm";

const WorkspaceBrandWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 2px;
  cursor: pointer;
  color: #43b104;
  height: 5vh;
  user-select: none;
  position: relative;
`;
const propTypes = {
  workspace: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const WorkspaceBrand = ({ workspace }) => {
  const { role } = useAuth();
  const dispatch = useDispatch();
  const { workspaces } = useWorkspace();
  const { workspaceEvent } = useEntityManagerSocket();

  const deleteWorkspaceHandler = () => {
    if (confirm(`Would you like to delete ${workspace.name} workspace?`)) {
      workspaceEvent.deleteWorkspace({ workspace });
      dispatch(setActiveWorkspace(workspaces[0]));
    }
  };
  const editWorkspaceHandler = () => {
    dispatch(setModal(<EditWorkspaceForm workspace={workspace} />));
  };

  return (
    <WorkspaceBrandWrapper>
      {workspace && (
        <>
          <span style={{ fontSize: "2vmin" }}>{workspace.name}</span>
          {role === "admin" && (
            <div>
              <span onClick={editWorkspaceHandler} style={{ marginRight: "5px" }}>
                <BiEdit style={{ fontSize: "2.5vmin" }} />
              </span>
              <span onClick={deleteWorkspaceHandler}>
                <VscTrash style={{ fontSize: "2.5vmin" }} />
              </span>
            </div>
          )}
        </>
      )}
    </WorkspaceBrandWrapper>
  );
};

WorkspaceBrand.propTypes = propTypes;

export default React.memo(WorkspaceBrand);
