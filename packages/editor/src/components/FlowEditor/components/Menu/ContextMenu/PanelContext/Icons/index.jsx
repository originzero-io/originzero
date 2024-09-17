import React from "react";

export function LikeNodeIcon({ color, favClick, node }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="25px"
      height="25px"
      onClick={() => favClick(node)}
      fill={color}
    >
      <path d="M50,19.3c-0.1-0.4-0.5-0.7-0.9-0.7l-17-1l-6.2-16C25.8,1.3,25.4,1,25,1c-0.4,0-0.8,0.3-0.9,0.6l-6.2,16l-17,1 c-0.4,0-0.8,0.3-0.9,0.7s0,0.8,0.3,1.1l13.2,10.8L9,47.7c-0.1,0.4,0,0.8,0.4,1.1c0.3,0.2,0.8,0.3,1.1,0L25,39.5l14.5,9.3 c0.2,0.1,0.4,0.2,0.5,0.2c0.2,0,0.4-0.1,0.6-0.2c0.3-0.2,0.5-0.7,0.4-1.1l-4.5-16.6l13.2-10.8C50,20.1,50.1,19.7,50,19.3z M32,28h-6 v6h-2v-6h-6v-2h6v-6h2v6h6V28z" />
    </svg>
  );
}
export function DislikeNodeIcon({ color, favClick, node }) {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500.75 480"
      width="25px"
      height="25px"
      onClick={() => favClick(node)}
    >
      <path
        d="M500,193a9.61,9.61,0,0,0-9-7L321,176,259,16c-1-3-5-6-9-6s-8,3-9,6L179,176,9,186a9.61,9.61,0,0,0-9,7,11.28,11.28,0,0,0,3,11L135,312,90,477a10,10,0,0,0,4,11c3,2,8,3,11,0l145-93,145,93c2,1,4,2,5,2,2,0,4-1,6-2,3-2,5-7,4-11L365,311,497,203C500,201,501,197,500,193ZM260,280H240m-60,0V260H320v20Z"
        transform="translate(0.37 -10)"
      />
    </svg>
  );
}
