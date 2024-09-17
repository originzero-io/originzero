import { Flow } from "../../flow/types";
import { Edge, Node } from "../../nodes/types";
import Element from "../models/Element";

type ElementType = {
  nodes: Node[];
  edges: Edge[];
};

class ElementRepository {
  static async get() {
    const element = await Element.findOne({});
    if (element) {
      return { nodes: element.nodes, edges: element.edges };
    }
    return { nodes: [], edges: [] };
  }

  static async save(newElements: ElementType) {
    const element = await Element.findOne({});
    if (element) {
      element.nodes = newElements.nodes;
      element.edges = newElements.edges;
      await element.save();
    } else {
      await Element.create(newElements);
    }
  }
}

export default ElementRepository;
