export const isAllHandlesConnected = () => {};

export const checkIfTriggerNode = (nodes) => {
  return nodes.some((node) => node.type === "TRIGGER");
};
export const getFunctionalNodes = (nodes) => {
  return nodes.filter((node) => node.type !== "CONSTANT" && node.type !== "TRIGGER");
};

// ? nodun value girişlerine yapılmış bağlantıları verir
export const getMyConnectedValueEdges = (node, edges) => {
  const myValueEdges = edges.filter(
    (edge) =>
      edge.target === node.id &&
      !edge.targetHandle.includes("trig_") &&
      !edge.targetHandle.includes("status_"),
  );

  // ? Aynı inputa yapılmış olan bağlantıları temizler. Duplice bağlantıları kaldırır
  const myNonDuplicatedValueEdges = myValueEdges.filter(
    (edge, index) =>
      myValueEdges.findIndex((item) => item.targetHandle === edge.targetHandle) === index,
  );

  return myNonDuplicatedValueEdges;
};

export const getMyTrigEdges = (node, edges) => {
  const myValueEdges = edges.filter(
    (edge) => edge.target === node.id && edge.targetHandle.includes("trig_"),
  );

  // ? Aynı inputa yapılmış olan bağlantıları temizler. Duplice bağlantıları kaldırır
  const myNonDuplicatedTrigEdges = myValueEdges.filter(
    (edge, index) =>
      myValueEdges.findIndex((item) => item.targetHandle === edge.targetHandle) === index,
  );

  return myNonDuplicatedTrigEdges;
};

export const checkUnconnectedNodes = (functionalNodes, edges) => {
  const unConnectedNodes = [];
  functionalNodes.forEach((node) => {
    if (node.data.inputParameters) {
      const inputCount = Object.keys(node.data.inputParameters).length;
      const myValueEdges = getMyConnectedValueEdges(node, edges).length;
      if (inputCount > myValueEdges) {
        unConnectedNodes.push(node);
      }
    }
  });
  const existNotConnectedNodes = unConnectedNodes.length > 0;
  return {
    exist: existNotConnectedNodes,
    nodes: unConnectedNodes,
  };
};
// export const checkUnconnectedNodes = (functionalNodes, edges) => {
//   const unConnectedNodes = [];
//   functionalNodes.forEach((node) => {
//     const inputCount = Object.keys(node.data.inputParameters).length;
//     console.log("inputCount", inputCount);
//     //! inputCount 0 olan nodelar için bir şey yap
//     const myValueEdges = getMyConnectedValueEdges(node, edges).length;
//     if (inputCount > myValueEdges) {
//       unConnectedNodes.push(node);
//     }
//   });
//   const existNotConnectedNodes = unConnectedNodes.length > 0;
//   return {
//     exist: existNotConnectedNodes,
//     nodes: unConnectedNodes,
//   };
// };

export const checkAllConnectedTrigsHandles = (nodes, edges) => {
  //* Trig handle sayısı 1den fazlaysa, bütün handleların bağlanıp bağlanmadığını döndürür
  const unConnectedTrigHandles = [];
  nodes.forEach((node) => {
    const connectedTrigHandles = getMyTrigEdges(node, edges);
    const enableTrigHandles = Object.values(node.data.trigHandles).filter((th) => th === true);

    if (enableTrigHandles.length > 1 && connectedTrigHandles.length < enableTrigHandles.length) {
      unConnectedTrigHandles.push(node);
    }
  });
  const existNotConnectedTrigHandles = unConnectedTrigHandles.length > 0;
  return {
    exist: existNotConnectedTrigHandles,
    nodes: unConnectedTrigHandles,
  };
};
