import { Tooltip } from "antd";
import { Handle, Position } from "reactflow";

const OutputValueHandles = ({ outputValues, handleColor }) => {
  const values = Object.entries(outputValues);

  const isValid = (connection) => {
    const sourceType = connection.sourceHandle.split("_")[0];
    const targetType = connection.targetHandle.split("_")[0];

    const isSameDataType =
      sourceType === targetType || sourceType === "any" || targetType === "any";

    const isNotStatusHandle = targetType !== "trig" && targetType !== "status";

    return isSameDataType && isNotStatusHandle;
  };
  return (
    <>
      {values.map((value, index) => (
        <div key={index} style={{ display: "flex" }}>
          <Tooltip placement="right" color="#3a3a3a" title={value[0]}>
            <Handle
              key={value[0]}
              type="source"
              position={Position.Right}
              id={`${value[1]}_${value[0]}`}
              isValidConnection={isValid}
              className="node-handle horizontal"
              style={{ backgroundColor: handleColor[value[1]] }}
            />
          </Tooltip>
        </div>
      ))}
    </>
  );
};

export default OutputValueHandles;
