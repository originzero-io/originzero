import React from "react";
import { getBezierPath, getEdgeCenter, getMarkerEnd } from "reactflow";
import styled from "styled-components";

const Body = styled.body`
  //background:red;
`;
const foreignObjectSize = 40;
const onEdgeClick = (evt, id) => {
  evt.stopPropagation();
  alert(`remove ${id}`);
};

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  label,
  arrowHeadType,
  markerEndId,
}) {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        minWidth="200px"
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        requiredExtensions="http://www.w3.org/1999/xhtml"
        style={{
          display: "flex",
          minWidth: "200px",
          height: "30px",
          background: "red",
        }}
      >
        <Body>
          <text>{label}</text>
          <button>A</button>
        </Body>
      </foreignObject>
    </>
  );
}
