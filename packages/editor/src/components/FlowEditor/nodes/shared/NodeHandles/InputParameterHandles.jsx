import { Tooltip } from "antd";
import { Handle, Position } from "reactflow";

const InputParameterHandles = ({ nodeId, inputParameters, handleColor }) => {
  const parameters = Object.entries(inputParameters);
  return (
    <>
      {parameters.map((parameter, index) => (
        <Tooltip key={parameter[0]} placement="left" color="#3a3a3a" title={parameter[0]}>
          <Handle
            key={parameter[0]}
            type="target"
            position={Position.Left}
            className="node-handle horizontal"
            id={`${parameter[1]}_${parameter[0]}`}
            style={{ backgroundColor: handleColor[parameter[1]] }}
          />
        </Tooltip>
      ))}
    </>
  );
};

export default InputParameterHandles;
