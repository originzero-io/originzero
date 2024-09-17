import React, { useState } from "react";
import styled from "styled-components";
import { SubmitIcon } from "components/Shared/icons";
import { useDispatch } from "react-redux";
import { changeNodeName } from "store/reducers/flow/flowElementsSlice";
import PropTypes from "prop-types";
import * as Styled from "../../../components/Menu/GroupBar/GroupBar.style";

const StyledForm = styled.form`
  position: relative;
`;
const StyledInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: 1px dotted #636e72;
  border-radius: 2px;
  user-select: none;
  padding-left: 4px;
  color: whitesmoke;
`;

const propTypes = {
  self: PropTypes.object.isRequired,
  setEdit: PropTypes.func.isRequired,
};
export default function EditNameForm({ self, setEdit }) {
  const dispatch = useDispatch();
  const [editedName, setEditedName] = useState(self.data.ui.label);
  const nameEditChangeHandle = (e) => {
    setEditedName(e.target.value);
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    setEdit(false);
    dispatch(changeNodeName({ node: self, name: editedName }));
  };
  return (
    <StyledForm onSubmit={onSubmitHandle}>
      <StyledInput
        onChange={nameEditChangeHandle}
        value={editedName}
        maxLength={15}
        required
        className="nodrag nowheel"
      />
      <Styled.Submit type="submit">
        <SubmitIcon width="15px" height="15px" color="whitesmoke" />
      </Styled.Submit>
    </StyledForm>
  );
}

EditNameForm.propTypes = propTypes;
