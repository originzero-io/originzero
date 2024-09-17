import React from "react";
import NotificationNode from "./SpecialNodes/Notification.node";
import TriggerNode from "./SpecialNodes/Trigger.node";
import NodeGod from "./shared/NodeGod";

const BaseCustomNode = (self) => {
  if (self.type === "TRIGGER") {
    return <TriggerNode self={self} />;
  }
  if (self.type === "NOTIFICATION") {
    return <NotificationNode self={self} />;
  }
  return <NodeGod self={self}></NodeGod>;
};
export default React.memo(BaseCustomNode);
