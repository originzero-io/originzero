import { useSelector } from "react-redux";

export default function useUser() {
  const users = useSelector((state) => state.users);
  return users;
}
