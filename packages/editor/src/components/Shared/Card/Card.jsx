import useAuthPermission from "utils/hooks/useAuthPermission";
import PropTypes from "prop-types";
import flowServiceHttp from "services/entityManagerService/flowService/flowService.http";
import dockerizeServiceHttp from "services/dockerizeService/dockerizeService.http";
import { deleteFlow } from "store/reducers/flow/flowSlice";
import { useDispatch } from "react-redux";
import notificationHelper from "utils/ui/notificationHelper";
import styled from "styled-components";
import { selectFlow } from "store/reducers/controlPanelSlice";
import DetailMenu from "./DetailMenu";
import FlowStatusSwitch from "./FlowStatusSwitch";

const propTypes = {
  data: PropTypes.object.isRequired,
};

const CardContainer = styled.div`
  margin: 8px;
  width: 180px;
  height: 110px;
  border-radius: 4px;
  user-select: none;
  background-color: #393939;
  cursor: pointer;
  color: #43b104;
  &:hover {
    background-color: #434343;
  }
  display: flex;
  flex-direction: column;
  position: relative;
  text-overflow: ellipsis;
`;
const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #2d2d2d;
`;
const CardName = styled.div`
  font-size: 18px;
`;

const CardFeet = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #c1c1c1;
  padding: 12px;
`;

const Card = ({ data }) => {
  const getPermission = useAuthPermission("project");
  const dispatch = useDispatch();
  const deleteCardHandler = async (e, flow) => {
    e.stopPropagation();
    if (confirm("Sure?")) {
      await flowServiceHttp.deleteFlow(flow._id);
      dispatch(deleteFlow(flow._id));
      notificationHelper.success("Flow deleted successfully");
      await dockerizeServiceHttp.deleteFlowContainer(flow._id);
    }
  };
  const onClickCardHandler = async (e, flow) => {
    dispatch(selectFlow(flow));
  };
  return (
    <CardContainer
      onContextMenu={(e) => e.preventDefault()}
      onClick={(e) => onClickCardHandler(e, data)}
    >
      <DetailMenu deleteEvent={deleteCardHandler} data={data} getPermission={getPermission} />
      <CardHeader>
        <CardName>{data.name || ""}</CardName>
        <FlowStatusSwitch />
      </CardHeader>
      <CardFeet>
        <div>Akın-PC</div>
        <svg
          width="19"
          height="16"
          viewBox="0 0 19 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1 1.89805C1 1.40207 1.40207 1 1.89805 1H16.1019C16.5979 1 17 1.40207 17 1.89805V5.50001C17 5.77615 17.2239 6.00001 17.5 6.00001C17.7761 6.00001 18 5.77615 18 5.50001V1V0.898051C18 0.402071 17.5979 0 17.1019 0H17H1H0.898051C0.402071 0 0 0.402071 0 0.898051V1V11V11.1019C0 11.5979 0.402071 12 0.898051 12H1H6.91178C7.18792 12 7.41178 11.7761 7.41178 11.5C7.41178 11.2239 7.18792 11 6.91178 11H1.89805C1.40207 11 1 10.5979 1 10.1019V1.89805Z"
            fill="#43B104"
          />
          <rect x="2.11765" y="12.9999" width="5.29412" height="1" rx="0.5" fill="#43B104" />
          <ellipse cx="0.529412" cy="13.4999" rx="0.529412" ry="0.5" fill="#43B104" />
          <path
            d="M15.2663 10.1681L13.275 12.104L12.5962 11.4441M13.8 6.99988C11.4804 6.99988 9.60001 8.82805 9.60001 11.0832C9.60001 13.3384 11.4804 15.1665 13.8 15.1665C16.1196 15.1665 18 13.3384 18 11.0832C18 8.82805 16.1196 6.99988 13.8 6.99988Z"
            stroke="#43B104"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </CardFeet>
      {/* <div style={{ position: "absolute", bottom: 0, left: "40%" }}>{data.port}</div> */}
    </CardContainer>
  );
};

Card.propTypes = propTypes;

export default Card;
