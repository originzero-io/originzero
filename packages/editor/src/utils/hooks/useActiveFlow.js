import { useSelector } from "react-redux";

export default function useActiveFlow() {
  const activeFlow = useSelector((state) => state.activeFlow);
  return activeFlow;
}
