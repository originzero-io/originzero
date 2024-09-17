// import { Flow } from "../types";

// export function backendFlowDataBuilder(flow: Flow) {
//   const { id, nodes, edges } = flow;
//   const flowBackendData = {
//     id,
//     nodes: nodes.map((node) => {
//       const { id, type, data } = node;
//       const { ui, ...rest } = data;
//       return {
//         id,
//         type,
//         data: {
//           ...rest,
//         },
//       };
//     }),
//     edges: edges.map((edge) => {
//       const { group, style, type, ...rest } = edge;
//       return {
//         ...rest,
//       };
//     }),
//   };
//   return flowBackendData;
// }
