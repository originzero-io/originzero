import { useSelector } from "react-redux";

export default function useWorkspace() {
  const workspaces = useSelector((state) => state.workspaces);
  return workspaces;
}
