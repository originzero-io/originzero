import { useSelector } from "react-redux";

export default function useProject() {
  const projects = useSelector((state) => state.projects);
  return projects;
}
