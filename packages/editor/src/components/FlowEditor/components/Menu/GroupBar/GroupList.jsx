import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroup } from "store/reducers/flow/flowGroupsSlice";
import { selectElements } from "store/reducers/flow/flowElementsSlice";
import { NameEditIcon } from "components/Shared/icons";
import PropTypes from "prop-types";
import useActiveFlow from "utils/hooks/useActiveFlow";
import * as Styled from "./GroupBar.style";
import { DeleteIcon } from "../NavMenu/Icons";
import EditForm from "./EditForm";

const propTypes = {
  theme: PropTypes.string.isRequired,
  flowId: PropTypes.string,
};

const GroupList = ({ theme, flowId }) => {
  const { flowGroups, flowElements } = useActiveFlow();
  const dispatch = useDispatch();
  const [hover, setHover] = useState(null);
  const [editableItem, setEditableItem] = useState({ state: false, group: {} });

  const deleteIconClickHandle = (group) => {
    if (confirm("Are you sure?")) {
      dispatch(deleteGroup(group));
    }
  };
  const groupItemClickHandle = (group) => {
    const nodesByGroup = flowElements.nodes.filter((node) => node.data.ui.group._id === group._id);
    dispatch(selectElements(nodesByGroup));
  };
  const editIconClickHandle = (group) => {
    if (group._id !== editableItem.group._id) {
      setEditableItem({ state: true, group: { ...group } });
    } else if (editableItem.state === true) {
      setEditableItem({ state: false, group: { ...group } });
    } else setEditableItem({ state: true, group: { ...group } });
  };
  const labelClickHandle = () => {
    setEditableItem({ state: false, group: {} });
  };
  return (
    <>
      {flowGroups.length > 0
        ? flowGroups.map((group) => (
            <Styled.GroupItem
              key={group._id}
              onMouseEnter={() => setHover(group._id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => groupItemClickHandle(group)}
            >
              {editableItem.state && editableItem.group._id === group._id ? (
                <EditForm editableItem={editableItem} setEditableItem={setEditableItem} />
              ) : (
                <>
                  <Styled.GroupColor width="22px" height="22px" value={group.color} />
                  <Styled.Label onClick={labelClickHandle}>{group.name}</Styled.Label>
                </>
              )}

              {hover === group._id && (
                <>
                  <NameEditIcon
                    width="25px"
                    height="25px"
                    onClick={() => editIconClickHandle(group)}
                    theme={theme}
                  />
                  <DeleteIcon onClick={() => deleteIconClickHandle(group)} theme={theme} />
                </>
              )}
            </Styled.GroupItem>
          ))
        : "There is no group"}
    </>
  );
};

GroupList.propTypes = propTypes;
export default React.memo(GroupList);
