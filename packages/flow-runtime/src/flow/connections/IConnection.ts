import BaseNode from "../../nodes/BaseNode";
import { Node } from "../../nodes/types";

interface IConnection {
  establishConnectionByNodes(nodes: Node[]): void;
  createConnection(url: string, options: any): any;
  getConnection(url: string): any;
  deleteConnection(url: string): void;
  deleteAllConnections(): void;
}

export default IConnection;
