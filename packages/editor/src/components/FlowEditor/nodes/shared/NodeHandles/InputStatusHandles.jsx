import { Handle, Position } from "reactflow";

const InputStatusHandles = ({ trigHandles, statusHandles }) => {
  const inputStatusHandles = Object.entries(statusHandles.inputs);
  return (
    <>
      {Object.entries(trigHandles).map((trigHandle, index) => (
        <div key={index}>
          {trigHandle[1] && (
            <div
              style={{
                display: "flex",
              }}
            >
              <div style={{ color: "gray" }}>{trigHandle[0]}</div>
              <Handle
                key={trigHandle[0]}
                id={`trig_${trigHandle[0]}`}
                type="target"
                position={Position.Left}
                className="node-status-handle horizontal"
                style={{ backgroundColor: "#40916c" }}
              />
            </div>
          )}
        </div>
      ))}
      {inputStatusHandles.map((inputStatusHandle, index) => (
        <div key={index}>
          {inputStatusHandle[1] && (
            <div
              style={{
                display: "flex",
              }}
            >
              <div style={{ color: "gray" }}>{inputStatusHandle[0]}</div>
              <Handle
                key={inputStatusHandle[0]}
                id={`status_${inputStatusHandle[0]}`}
                type="target"
                position={Position.Left}
                className="node-status-handle horizontal"
                style={{ backgroundColor: "#40916c" }}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default InputStatusHandles;
