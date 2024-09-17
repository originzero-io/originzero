import CompanyLogo from "components/Shared/CompanyLogo";
import { useFlowContext } from "context/FlowDataProvider";
import { toPng } from "html-to-image";
import React from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { RiScreenshot2Line } from "react-icons/ri";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addSubFlow } from "store/reducers/flow/flowElementsSlice";
import styled from "styled-components";
import * as Styled from "../NavMenu.style";

const StyledMenu = styled.div`
  // background: ${(props) => props.theme.menuBackground};
  background: transparent;
  display: flex;
  flex-direction: row;
  // justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
`;

const EditorTopLeftMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { syncedFlow } = useFlowContext();

  function downloadImage(dataUrl) {
    const a = document.createElement("a");

    a.setAttribute("download", "reactflow.png");
    a.setAttribute("href", dataUrl);
    a.click();
  }
  const downloadPageAsImage = () => {
    toPng(document.querySelector(".react-flow"), {
      filter: (node) => {
        // we don't want to add the minimap and the controls to the image
        if (
          node?.classList?.contains("react-flow__minimap") ||
          node?.classList?.contains("react-flow__controls")
        ) {
          return false;
        }

        return true;
      },
    }).then(downloadImage);
  };
  const goToHomePage = () => {
    if (!syncedFlow) {
      if (
        confirm(
          "There are unsynchronized changes in Flow. Unsaved changes will be lost. Do you approve?",
        )
      ) {
        history.push("/panel/projects");
      }
    } else {
      history.push("/panel/projects");
    }
  };
  return (
    <StyledMenu>
      {/* <Logo theme={theme} /> */}
      <CompanyLogo size={50} />
      <div onClick={goToHomePage}>
        <Styled.MenuItem>
          <BiHomeAlt2 style={{ color: "#c1c1c1", fontSize: "2.5vmin" }} />
        </Styled.MenuItem>
      </div>

      <Styled.MenuItem onClick={() => dispatch(addSubFlow())}>
        <VscTypeHierarchySub fontSize={"2.5vmin"} />
      </Styled.MenuItem>
      <Styled.MenuItem onClick={downloadPageAsImage}>
        <RiScreenshot2Line fontSize={"2.5vmin"} />
      </Styled.MenuItem>
    </StyledMenu>
  );
};

export default React.memo(EditorTopLeftMenu);
