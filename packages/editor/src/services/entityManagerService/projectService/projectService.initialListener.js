import store from "index";
import {
  createProject,
  deleteProject,
  setActiveProject,
  updateProject,
} from "store/reducers/projectSlice";
import notificationHelper from "utils/ui/notificationHelper";

const projectInitialListener = (projectEvent) => {
  projectEvent.onCreateProject((data) => {
    store.dispatch(createProject(data.project));
    notificationHelper.success("Project created successfully");
  });
  projectEvent.onUpdateProject((data) => {
    store.dispatch(updateProject(data.project));
    notificationHelper.success("Project updated successfully");
  });
  projectEvent.onDeleteProject((data) => {
    store.dispatch(deleteProject(data.projectId));
    const { projects } = store.getState().projects;
    store.dispatch(setActiveProject(projects[0]));
    notificationHelper.success("Project deleted successfully");
  });
};

export default projectInitialListener;
