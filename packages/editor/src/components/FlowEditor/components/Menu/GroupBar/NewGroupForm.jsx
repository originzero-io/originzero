import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import themeColor from "components/Shared/ThemeReference";
import { createGroup } from "store/reducers/flow/flowGroupsSlice";
import useActiveFlow from "utils/hooks/useActiveFlow";
import useAuth from "utils/hooks/useAuth";
import { AddIcon, CancelIcon, NonGroupIcon, SubmitIcon } from "components/Shared/icons";
import { selectElements } from "store/reducers/flow/flowElementsSlice";
import { HorizontalDivider } from "components/StyledComponents/Divider";
import * as Styled from "./GroupBar.style";

const NewGroupForm = ({ theme }) => {
  const [formOpen, setFormOpen] = useState(false);
  const { flowElements } = useActiveFlow();
  const auth = useAuth();
  const { flowId } = useParams();

  const dispatch = useDispatch();
  const [groupInfo, setGroupInfo] = useState({
    name: "",
    color: "",
    createdBy: auth._id,
    flow: flowId,
  });
  const groupHandle = (event) => {
    const { name, value } = event.target;
    setGroupInfo({
      ...groupInfo,
      [name]: value,
    });
  };
  const addNewGroup = async (event) => {
    event.preventDefault();
    dispatch(createGroup({ flowId, group: groupInfo }));
  };
  const selectNonGroupsHandle = () => {
    const nonGroups = flowElements.nodes.filter((node) => node.data.ui.group._id === 0);
    dispatch(selectElements(nonGroups));
  };
  return (
    <Styled.AddGroupWrapper onSubmit={addNewGroup}>
      <Styled.Header>
        <Styled.IconWrapper onClick={() => setFormOpen(!formOpen)}>
          {formOpen === true ? (
            <CancelIcon width="25px" height="25px" color={themeColor[theme].iconColor} />
          ) : (
            <AddIcon width="25px" height="25px" color={themeColor[theme].iconColor} />
          )}
        </Styled.IconWrapper>
        <Styled.Title>Groups</Styled.Title>
        <NonGroupIcon width="40px" height="40px" onClick={selectNonGroupsHandle} theme={theme} />
      </Styled.Header>

      {formOpen && (
        <Styled.InputWrapper>
          <Styled.Input
            placeholder="Add Group Name"
            required
            onChange={groupHandle}
            name="name"
            value={groupInfo.name}
            maxLength={18}
          />
          <Styled.ColorInput
            type="color"
            onChange={groupHandle}
            name="color"
            inForm
            defaultValue="#2ecc71"
            value={groupInfo.color}
          />
          <Styled.Submit type="submit">
            <SubmitIcon width="22px" height="22px" color={themeColor[theme].iconColor} />
          </Styled.Submit>
        </Styled.InputWrapper>
      )}
      <HorizontalDivider />
    </Styled.AddGroupWrapper>
  );
};
export default React.memo(NewGroupForm);
