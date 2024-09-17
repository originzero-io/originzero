import { useSelector } from "react-redux";

export default function useUserPermission() {
  const permissions = useSelector((state) => state.userPermissions);
  return permissions;
}
