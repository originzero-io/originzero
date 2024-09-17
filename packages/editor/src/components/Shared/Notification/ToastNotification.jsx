import React from "react";
import { Toaster } from "react-hot-toast";

function ToastNotification() {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{ top: 50 }}
      toastOptions={{
        className: "",
        duration: 3000,
        style: {
          background: "#2d2d2d",
          color: "#fff",
          border: "1px solid #5f5f5f",
        },
      }}
    />
  );
}

export default ToastNotification;
