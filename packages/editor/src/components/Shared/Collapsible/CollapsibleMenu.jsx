/* eslint-disable react/prop-types */
import React from "react";
import Collapsible from "react-collapsible";
import * as Styled from "./CollapsibleMenu.style";

export function CollapsibleMenu({ trigger, open, children, style, ...props }) {
  return (
    <Collapsible
      trigger={trigger}
      open={open || true}
      transitionTime={150}
      transitionCloseTime={150}
      style={style}
      overflowWhenOpen="visible"
      {...props}
    >
      <div>{children}</div>
    </Collapsible>
  );
}
export function CollapsibleMenuItem({ children, onClick, active }) {
  return (
    <Styled.CollapsableItem active={active} onClick={onClick}>
      {children}
    </Styled.CollapsableItem>
  );
}
export function CollapsibleTrigger({ children, label, icon, onClick, style }) {
  return (
    <Styled.TriggerWrapper onClick={onClick} style={style}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {icon}
        <div style={{ paddingLeft: "5px", fontSize: "1.5vmin" }}>{label}</div>
      </div>
      {children}
    </Styled.TriggerWrapper>
  );
}
