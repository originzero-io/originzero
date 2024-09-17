import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.label``;
export const Input = styled.input`
  display: none;
`;

const propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.node,
};
export function FileInput({ onChange, label }) {
  return (
    <Container>
      <Input type="file" onChange={onChange} />
      {label}
    </Container>
  );
}

FileInput.propTypes = propTypes;
