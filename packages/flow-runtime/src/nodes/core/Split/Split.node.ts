import BaseNode from "../../BaseNode";

export default class Split extends BaseNode {
  async execute() {
    // some implementations
    const splitCharacter = this.getNodeConfig("split_character");
    const splitted = this.getParameter("value").split(splitCharacter);

    this.returnOutput({
      result: splitted,
    });
  }
}
