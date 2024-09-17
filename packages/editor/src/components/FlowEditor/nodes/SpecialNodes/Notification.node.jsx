import React, { useEffect } from "react";
import NodeGod from "../shared/NodeGod";
import notificationHelper from "utils/ui/notificationHelper";
import { useFlowExecutorSocket } from "context/FlowExecutorSocketProvider";

const NotificationNode = ({ self }) => {
  const { flowExecutorSocket } = useFlowExecutorSocket();

  useEffect(() => {
    flowExecutorSocket.socket.on(`LOG-${self.id}`, (data) => {
      const log = JSON.stringify(data.value);
      notificationHelper.warn(`${self.id} \n ${log}`);
    });
  }, []);

  return <NodeGod self={self} />;
};

export default React.memo(NotificationNode);
