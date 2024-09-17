import React from "react";
import { LikeNodeIcon, DislikeNodeIcon } from "./Icons/index";

export default function FavIconManager({ node, favClick }) {
  return (
    <>
      {node.fav ? (
        <DislikeNodeIcon favClick={favClick} node={node} color="rgb(218,168,0)" />
      ) : (
        <LikeNodeIcon favClick={favClick} node={node} color="rgb(20,20,20)" />
      )}
    </>
  );
}
