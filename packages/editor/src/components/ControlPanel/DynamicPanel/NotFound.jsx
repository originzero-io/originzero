import { Empty } from "antd";
import React from "react";
import { Badge } from "reactstrap";

export default function NotFound() {
  return (
    <div>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        description={
          <span color="success" style={{ fontSize: "2vmin" }}>
            No menu selection
          </span>
        }
      />
    </div>
  );
}
