import store from "index";
import BaseCustomNode from "../nodes/BaseCustomNode.jsx";

// return {"node_type": NodeComponent}
export const createCustomNodeObject = (systemNodes) => {
  const customNodeObject = {};
  Object.keys(systemNodes).forEach((nodeType) => {
    customNodeObject[nodeType] = BaseCustomNode;
  });
  return customNodeObject;
};

export const createPanelNodeList = (systemNodes) => {
  const entries = Object.entries(systemNodes);

  return entries.map((entry, index) => ({
    id: index,
    type: entry[0],
    label: entry[1].ui.label,
    category: entry[1].ui.category,
    icon: entry[1].ui.icon,
    fav: false,
  }));
};

export const getNodeData = (type) => {
  const { systemNodes } = store.getState();
  return systemNodes[type];
};
