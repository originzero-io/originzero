import { Flow } from "../../flow/types";
import { getIncomers } from "../../nodes/helpers/node-helpers";

export interface KahnsObject {
  id: string;
  enable: boolean;
  degree: number;
  dependsOn: (string | undefined)[];
}
const createKahnsObject = (flowData: Flow): KahnsObject[] =>
  flowData.nodes.map((node) => {
    const nodeIncomers = getIncomers(node, flowData.nodes, flowData.edges);
    return {
      id: node.id,
      type: node.type,
      enable: node.data.enable,
      degree: nodeIncomers.length,
      dependsOn: nodeIncomers.map((incomer) => incomer.id),
    };
  });

const sortByKahnsAlgorithm = (flowData: Flow): KahnsObject[] => {
  const elementsArray = createKahnsObject(flowData);
  const sortedQueue = [];
  const noIncomingQueue = elementsArray.filter(
    (element) => element.degree === 0 && element.enable === true,
  );
  const incomingQueue = elementsArray.filter(
    (element) => element.degree !== 0 && element.enable === true,
  );
  while (noIncomingQueue.length) {
    const currentNode = noIncomingQueue.shift();
    if (!currentNode) {
      noIncomingQueue.length = 0;
    } else {
      sortedQueue.push(currentNode);
      for (let i = 0; i < incomingQueue.length; ++i) {
        const element = incomingQueue[i];
        const hasDependencyOnCurrentNode = element.dependsOn.some(
          (dependency) => dependency === currentNode.id,
        );
        if (hasDependencyOnCurrentNode) {
          element.degree--;
          if (element.degree === 0) {
            noIncomingQueue.push(incomingQueue[i]);
          }
        }
      }
    }
  }
  return sortedQueue;
};

export default sortByKahnsAlgorithm;
