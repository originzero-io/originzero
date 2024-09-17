import styled from "styled-components";
import { BiUndo, BiRedo } from "react-icons/bi";

const Container = styled.div`
  position: absolute;
  color: #c1c1c1;
  font-size: 3vmin;
  left: 10px;
`;

export default function UndoRedoButtons() {
  return (
    <Container>
      <BiUndo />
      <BiRedo />
    </Container>
  );
}
