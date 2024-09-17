import { useSelector } from "react-redux";

export default function useNotes() {
  const notes = useSelector((state) => state.notes);
  return notes;
}
