import React from "react";
import { Avatar as AntdAvatar } from "antd";
import { FaUserCircle } from "react-icons/fa";

export default function Avatar({ avatar, size, ...rest }) {
  return (
    <AntdAvatar
      size={size || 42}
      // src={`${
      //   import.meta.env.VITE_HOST_ENV === "development"
      //     ? import.meta.env.VITE_GATEWAY_LOCAL_URL
      //     : import.meta.env.VITE_GATEWAY_CLOUD_URL
      // }/uploads/${avatar}`}
      src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2"
      icon={<FaUserCircle style={{ width: "100%", height: "100%" }} />}
      {...rest}
    />
  );
}
