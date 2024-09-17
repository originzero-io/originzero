import React from "react";
import useFlow from "utils/hooks/useFlow";
import useProject from "utils/hooks/useProject";
import ProjectsScreen from "./ProjectsScreen";

export default function FlowsByProjectPanel() {
  const { activeProject } = useProject();
  const flows = useFlow().filter((flow) => flow.project._id === activeProject._id);
  return <ProjectsScreen flows={flows} />;
}
