import React from "react";
import { Redirect, useParams } from "react-router-dom";

export default function TabRedirector() {
  const { flowId } = useParams();
  return <Redirect to={`/flow/${flowId}`} />;
}
