import PropTypes from "prop-types";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setModal } from "store/reducers/componentSlice";
import { MdDeleteOutline, MdDriveFolderUpload } from "react-icons/md";
import { LuFileEdit } from "react-icons/lu";
import { HiOutlineDuplicate } from "react-icons/hi";
import { GoQuestion } from "react-icons/go";
import { selectFlow } from "store/reducers/controlPanelSlice";
import EditFlow from "../../ControlPanel/DynamicPanel/ProjectsScreen/forms/EditFlowForm";
import MoveFlow from "../../ControlPanel/DynamicPanel/ProjectsScreen/forms/MoveFlowForm";
import { DropdownItem, DropdownWrapper } from "../../StyledComponents/DropdownMenu";
import * as Styled from "./Card.style";

const propTypes = {
  deleteEvent: PropTypes.func,
  data: PropTypes.object,
  getPermission: PropTypes.func,
};
export default function DetailMenu({ deleteEvent, data, getPermission }) {
  const dispatch = useDispatch();
  const moveHandler = (e) => {
    e.stopPropagation();
    dispatch(setModal(<MoveFlow flow={data} />));
  };
  const editHandler = (e) => {
    e.stopPropagation();
    dispatch(setModal(<EditFlow flow={data} />));
  };
  const selectFlowHandler = (e) => {
    // e.stopPropagation();
    dispatch(selectFlow(data));
  };
  return (
    <DropdownWrapper tabIndex="1" style={{ position: "absolute", right: "12px", top: "3px" }}>
      <Styled.CardMoreButton onClick={(e) => e.stopPropagation()}>
        <FiMoreHorizontal />
      </Styled.CardMoreButton>
      <Styled.DetailMenuList onClick={(e) => e.stopPropagation()}>
        {getPermission("CAN_EDIT_FLOW", {
          flowId: data._id,
          projectId: data.project._id,
        }) && (
          <>
            <DropdownItem onClick={moveHandler}>
              <MdDriveFolderUpload />
              <Styled.DetailMenuText>Move</Styled.DetailMenuText>
            </DropdownItem>
            <DropdownItem onClick={editHandler}>
              <LuFileEdit />
              <Styled.DetailMenuText>Edit</Styled.DetailMenuText>
            </DropdownItem>
            <DropdownItem>
              <HiOutlineDuplicate />
              <Styled.DetailMenuText>Duplicate</Styled.DetailMenuText>
            </DropdownItem>
            <DropdownItem onClick={selectFlowHandler}>
              <GoQuestion />
              <Styled.DetailMenuText>Info</Styled.DetailMenuText>
            </DropdownItem>
            <DropdownItem onClick={(e) => deleteEvent(e, data)}>
              <MdDeleteOutline />
              <Styled.DetailMenuText>Delete</Styled.DetailMenuText>
            </DropdownItem>
          </>
        )}
      </Styled.DetailMenuList>
    </DropdownWrapper>
  );
}

DetailMenu.propTypes = propTypes;
