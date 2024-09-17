import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { VscTrash } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { setModal } from "store/reducers/componentSlice";
import { setActiveProject } from "store/reducers/projectSlice";
import useAuthPermission from "utils/hooks/useAuthPermission";
import useProject from "utils/hooks/useProject";
import useWorkspace from "utils/hooks/useWorkspace";
import { CollapsibleMenuItem } from "components/Shared/Collapsible/CollapsibleMenu";
import { getFlowsByProject } from "store/reducers/flow/flowSlice";
import { useEntityManagerSocket } from "context/EntityManagerSocketProvider";
import EditProjectForm from "./EditProjectForm";

const propTypes = {
  projects: PropTypes.array.isRequired,
};
export default function ProjectList({ projects }) {
  const dispatch = useDispatch();
  const getPermission = useAuthPermission("project");
  const { activeProject } = useProject();
  const { activeWorkspace } = useWorkspace();
  const { projectEvent } = useEntityManagerSocket();

  // console.log("PROJECT_LIST RENDERED");

  const clickProjectHandle = (project) => {
    dispatch(setActiveProject(project));
    dispatch(getFlowsByProject(project));
  };
  const deleteProjectHandle = (project) => {
    if (confirm("Sure?")) {
      projectEvent.deleteProject({ project });
    }
  };
  const editProjectHandle = (project) => {
    dispatch(setModal(<EditProjectForm project={project} />));
  };
  useEffect(() => {
    if (projects.length > 0 && activeProject === "") {
      dispatch(setActiveProject(projects[0]));
    }
  }, [activeWorkspace, projects]);

  return (
    <>
      {projects.length > 0 ? (
        projects.map((project) => (
          <CollapsibleMenuItem
            key={project._id}
            onClick={() => clickProjectHandle(project)}
            active={project._id === activeProject._id}
          >
            <div>{project.name}</div>
            <div>
              {getPermission("CAN_EDIT_PROJECT", project._id) && (
                <>
                  <span onClick={() => editProjectHandle(project)}>
                    <BiEdit style={{ fontSize: "2vmin" }} />
                  </span>
                  <span onClick={() => deleteProjectHandle(project)}>
                    <VscTrash style={{ fontSize: "2vmin" }} />
                  </span>
                </>
              )}
            </div>
          </CollapsibleMenuItem>
        ))
      ) : (
        <span style={{ color: "white", fontSize: "1.5vmin", paddingLeft: "10%" }}>
          No projects found
        </span>
      )}
    </>
  );
}

ProjectList.propTypes = propTypes;
