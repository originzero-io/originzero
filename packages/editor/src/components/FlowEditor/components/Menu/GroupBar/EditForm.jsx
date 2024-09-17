import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateGroup } from "store/reducers/flow/flowGroupsSlice";
import { SubmitIcon } from "components/Shared/icons";
import themeColor from "components/Shared/ThemeReference";
import PropTypes from "prop-types";
import * as Styled from "./GroupBar.style";

// const Form = styled.form`
//   position: relative;
//   width: 78%;
// `;
// const Input = styled.input`
//   width: 100%;
//   height: 23px;
//   font-size: 16px;
//   //padding-left: 25px;
//   padding: 12px 10px 12px 30px;
//   background-color: transparent;
//   border: 1px solid #636e72;
//   border-radius: 2px;
//   user-select: none;
//   color: ${(props) => props.theme.iconColor};
// `;

const propTypes = {
  editableItem: PropTypes.object.isRequired,
  setEditableItem: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};
export default function EditForm({ editableItem, setEditableItem, theme }) {
  const dispatch = useDispatch();
  const onSubmitHandle = async (event) => {
    event.preventDefault();
    dispatch(updateGroup(editableItem.group));
    setEditableItem({ state: false, group: {} });
  };
  const updateChangeHandle = (event) => {
    const { name, value } = event.target;
    setEditableItem({
      ...editableItem,
      group: {
        ...editableItem.group,
        [name]: value,
      },
    });
  };
  return (
    <Styled.Form onSubmit={onSubmitHandle}>
      <Styled.Input
        placeholder="edit name"
        required
        onChange={updateChangeHandle}
        name="name"
        value={editableItem.group.name}
        maxLength={12}
      />
      <Styled.ColorFlag
        type="color"
        onChange={updateChangeHandle}
        name="color"
        value={editableItem.group.color}
      />
      <Styled.Submit type="submit">
        <SubmitIcon width="22px" height="22px" color={themeColor[theme].iconColor} />
      </Styled.Submit>
    </Styled.Form>
  );
}

EditForm.propTypes = propTypes;
