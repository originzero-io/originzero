import { useEffect, useRef, useState } from "react";

// const deepEqual = (obj1, obj2) => {
//   if (obj1 === obj2) return true;

//   if (obj1 == null || obj2 == null) return obj1 == null && obj2 == null;

//   if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;

//   const keys1 = Object.keys(obj1);
//   const keys2 = Object.keys(obj2);

//   if (keys1.length !== keys2.length) return false;

//   for (const key of keys1) {
//     if (!deepEqual(obj1[key], obj2[key])) return false;
//   }

//   return true;
// };

// const useDetectChanges = (data) => {
//   const previousDataRef = useRef(data);

//   useEffect(() => {
//     previousDataRef.current = data;
//   }, [data]);

//   const findChanges = () => {
//     const previousData = previousDataRef.current;
//     const changes = [];

//     const findItemChanges = (currentArray, previousArray, type) => {
//       // console.log("previousArray: ", previousArray);

//       if (currentArray.length > 0 && previousArray.length > 0) {
//         currentArray.forEach((currentItem, currentIndex) => {
//           const previousItem = previousArray.find((item) => item.id === currentItem.id);

//           if (!previousItem || !deepEqual(previousItem, currentItem)) {
//             if (!(currentItem.selected !== previousItem?.selected)) {
//               changes.push({ action: "updated", type, index: currentIndex, item: currentItem });
//             }
//           }
//         });

//         previousArray.forEach((previousItem, previousIndex) => {
//           const currentItem = currentArray.find((item) => item.id === previousItem.id);

//           if (!currentItem) {
//             changes.push({ action: "deleted", type, index: previousIndex, item: previousItem });
//           }
//         });
//       }
//     };

//     findItemChanges(data.nodes, previousData.nodes, "node");
//     findItemChanges(data.edges, previousData.edges, "edge");

//     return changes;
//   };

//   const changes = findChanges();

//   return changes;
// };

// export default useDetectChanges;

const useDetectLengthChanges = (data) => {
  const previousDataRef = useRef(data);

  useEffect(() => {
    previousDataRef.current = data;
  }, [data]);

  const hasLengthChanged = () => {
    const previousData = previousDataRef.current;
    if (
      data.nodes.length > previousData.nodes.length ||
      data.edges.length > previousData.edges.length
    ) {
      return true;
    }

    return null;
  };

  const lengthChanged = hasLengthChanged();

  return lengthChanged;
};

export default useDetectLengthChanges;
