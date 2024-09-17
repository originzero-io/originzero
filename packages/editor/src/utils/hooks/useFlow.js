import { useSelector } from "react-redux";

export default function useFlow() {
  const flows = useSelector((state) => state.flows);
  return flows;
}
