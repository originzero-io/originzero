import React from "react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const style = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    fontSize: "32px",
  };
  return (
    <div style={style}>
      Coming soon...
      <button>
        <Link to="/">Go back</Link>
      </button>
    </div>
  );
}
