import React from "react";
import { useDispatch } from "react-redux";
import { setGroupBarDisplay } from "store/reducers/flow/flowGuiSlice";
import { GroupIcon } from "components/Shared/icons";
import useActiveFlow from "utils/hooks/useActiveFlow";
import { getGroups } from "store/reducers/flow/flowGroupsSlice";
import * as Styled from "./GroupBar.style";

export default function GroupBarIcon({ theme, flowId }) {
  const { flowGui } = useActiveFlow();
  const dispatch = useDispatch();
  const { groupBarDisplay } = flowGui;
  const groupBarDisplayHandle = () => {
    if (groupBarDisplay === "visible") {
      dispatch(setGroupBarDisplay("hidden"));
      dispatch(getGroups(flowId));
    } else {
      dispatch(setGroupBarDisplay("visible"));
    }
  };
  return (
    <Styled.Container onClick={groupBarDisplayHandle}>
      <GroupIcon width="50px" height="50px" theme={theme} color="whitesmoke" />
    </Styled.Container>
  );
}
