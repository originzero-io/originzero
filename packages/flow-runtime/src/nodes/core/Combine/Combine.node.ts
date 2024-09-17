import BaseNode from "../../BaseNode";

export default class Combine extends BaseNode {
  async execute() {
    let combined = "";
    const spaceCharacter = this.getNodeConfig("space_character");

    Object.values(this.getAllParameters()).forEach((param: string) => {
      combined = `${combined}${spaceCharacter}${param}`;
    });
    this.returnOutput({
      result: combined,
    });
  }
}
