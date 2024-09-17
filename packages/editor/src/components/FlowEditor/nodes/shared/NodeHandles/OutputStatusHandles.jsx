import { Handle, Position } from "reactflow";

const OutputStatusHandles = ({ statusHandles, handleColor }) => {
  const outputStatusHandles = Object.entries(statusHandles.outputs);

  const isValid = (connection) => {
    const [targetType] = connection.targetHandle.split("_");
    const [sourceType, sourceName] = connection.sourceHandle.split("_");
    const isStatusConnection =
      (sourceType === "trig" || sourceType === "status") &&
      (targetType === "trig" || targetType === "status");

    const isErrorValConnection = sourceName === "errorVal" && targetType !== "trig";
    return isStatusConnection || isErrorValConnection;
  };

  return (
    <>
      {outputStatusHandles.map((outputStatusHandle, index) => (
        <div key={index}>
          {outputStatusHandle[1] && (
            <div style={{ display: "flex" }}>
              <Handle
                key={outputStatusHandle[0]}
                id={
                  outputStatusHandle[0] === "errorVal"
                    ? "string_errorVal"
                    : `status_${outputStatusHandle[0]}`
                }
                type="source"
                position={Position.Right}
                isValidConnection={isValid}
                className="node-status-handle horizontal"
                style={{
                  backgroundColor:
                    outputStatusHandle[0] === "errorVal" ? handleColor.string : "#40916c",
                }}
              />
              <div style={{ color: "gray", marginLeft: "2px" }}>{outputStatusHandle[0]}</div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default OutputStatusHandles;
