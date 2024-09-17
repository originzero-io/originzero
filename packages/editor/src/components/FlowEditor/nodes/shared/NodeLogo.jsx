import React from "react";

export default function NodeLogo({ src }) {
  return (
    <img
      src={src}
      width="70px"
      height="70px"
      draggable={false}
      style={{ filter: "grayscale(100%)", opacity: "0.6" }}
    />
  );
}
