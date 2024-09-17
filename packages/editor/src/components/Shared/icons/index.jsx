/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// test
import themeColor from "components/Shared/ThemeReference";
// import React from "react-redux";

export function Logo({ theme, width = "26px", height = "30px" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 156.74 220.09"
      width={width}
      height={height}
      fill={themeColor[theme].iconColor}
    >
      <polygon
        points="22.18 1.52 1.09 149.46 10.18 154.33 35.21 80.46 75.34 80.27 58.65 140.83 100.09 141.02 56.68 18.96 22.18 1.52"
        stroke="#000"
        strokeMiterlimit={10}
        strokeWidth="2px"
      />
      <polygon
        points="113.73 48.63 143.82 144.4 155.64 70.15 113.73 48.63"
        stroke="#000"
        strokeMiterlimit={10}
        strokeWidth="2px"
      />
      <polygon
        points="59.49 179.83 132.9 218.55 139.09 179.83 59.49 179.83"
        stroke="#000"
        strokeMiterlimit={10}
        strokeWidth="2px"
      />
    </svg>
  );
}
export function AddIcon({ width, height, color }) {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width="25px"
      height="25px"
    >
      {" "}
      <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M20,16h-4v4 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-4h-4c-0.552,0-1-0.447-1-1s0.448-1,1-1h4v-4c0-0.553,0.448-1,1-1s1,0.447,1,1v4h4 c0.552,0,1,0.447,1,1S20.552,16,20,16z" />
    </svg>
  );
}
export function SubmitIcon({ width, height, color }) {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width={width}
      height={height}
    >
      {" "}
      <path d="M15,3C8.373,3,3,8.373,3,15s5.373,12,12,12s12-5.373,12-12S21.627,3,15,3z M20.707,15.707l-4,4 C16.512,19.902,16.256,20,16,20s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L17.586,16H10c-0.552,0-1-0.447-1-1 s0.448-1,1-1h7.586l-2.293-2.293c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l4,4 C21.098,14.684,21.098,15.316,20.707,15.707z" />
    </svg>
  );
}
export function CancelIcon({ width, height, color }) {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width={width || "25px"}
      height={height || "25px"}
    >
      {" "}
      <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16.414,15 c0,0,3.139,3.139,3.293,3.293c0.391,0.391,0.391,1.024,0,1.414c-0.391,0.391-1.024,0.391-1.414,0C18.139,19.554,15,16.414,15,16.414 s-3.139,3.139-3.293,3.293c-0.391,0.391-1.024,0.391-1.414,0c-0.391-0.391-0.391-1.024,0-1.414C10.446,18.139,13.586,15,13.586,15 s-3.139-3.139-3.293-3.293c-0.391-0.391-0.391-1.024,0-1.414c0.391-0.391,1.024-0.391,1.414,0C11.861,10.446,15,13.586,15,13.586 s3.139-3.139,3.293-3.293c0.391-0.391,1.024-0.391,1.414,0c0.391,0.391,0.391,1.024,0,1.414C19.554,11.861,16.414,15,16.414,15z" />
    </svg>
  );
}
export function NameEditIcon({ width, height, onClick, theme }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      width={width}
      height={height}
      onClick={onClick}
    >
      <g id="surface3197349">
        <path
          fillRule="nonzero"
          fill="rgb(89.803922%,45.09804%,45.09804%)"
          fillOpacity="1"
          strokeWidth="3"
          strokeLinecap="butt"
          strokeLinejoin="round"
          stroke="rgb(80.000001%,80.000001%,80.000001%)"
          strokeOpacity="1"
          strokeMiterlimit="10"
          d="M 151.702175 32.301909 C 153.681279 34.289507 153.681279 37.500242 151.702175 39.482177 L 145.575164 45.603525 L 125.396233 25.424594 L 131.517581 19.297583 C 133.496685 17.31848 136.718746 17.31848 138.695018 19.297583 L 151.702175 32.301909 "
          transform="matrix(1.379649,0,0,1.379649,2.051888,2.051888)"
        />
        <path
          fillRule="nonzero"
          fill="rgb(100%,59.607846%,0%)"
          fillOpacity="1"
          strokeWidth="3"
          strokeLinecap="butt"
          strokeLinejoin="round"
          stroke="rgb(80.000001%,80.000001%,80.000001%)"
          strokeOpacity="1"
          strokeMiterlimit="10"
          d="M 135.489946 55.688744 L 44.7881 146.39342 L 24.606338 126.214489 L 115.308184 35.506981 Z M 135.489946 55.688744 "
          transform="matrix(1.379649,0,0,1.379649,2.051888,2.051888)"
        />
        <path
          fillRule="nonzero"
          fill="rgb(69.01961%,74.509805%,77.254903%)"
          fillOpacity="1"
          strokeWidth="3"
          strokeLinecap="butt"
          strokeLinejoin="round"
          stroke="rgb(80.000001%,80.000001%,80.000001%)"
          strokeOpacity="1"
          strokeMiterlimit="10"
          d="M 115.291195 35.509813 L 125.379245 25.4161 L 145.572333 45.595031 L 135.484283 55.688744 Z M 115.291195 35.509813 "
          transform="matrix(1.379649,0,0,1.379649,2.051888,2.051888)"
        />
        <path
          fillRule="nonzero"
          fill="rgb(100%,75.686276%,2.745098%)"
          fillOpacity="1"
          strokeWidth="3"
          strokeLinecap="butt"
          strokeLinejoin="round"
          stroke="rgb(80.000001%,80.000001%,80.000001%)"
          strokeOpacity="1"
          strokeMiterlimit="10"
          d="M 44.785269 146.396252 L 17.811132 153.188626 L 24.597844 126.220152 Z M 44.785269 146.396252 "
          transform="matrix(1.379649,0,0,1.379649,2.051888,2.051888)"
        />
        <path
          fillRule="nonzero"
          fill="rgb(21.568628%,27.843139%,30.980393%)"
          fillOpacity="1"
          strokeWidth="3"
          strokeLinecap="butt"
          strokeLinejoin="round"
          stroke="rgb(80.000001%,80.000001%,80.000001%)"
          strokeOpacity="1"
          strokeMiterlimit="10"
          d="M 31.446846 149.748553 L 17.811132 153.188626 L 21.251205 139.550081 Z M 31.446846 149.748553 "
          transform="matrix(1.379649,0,0,1.379649,2.051888,2.051888)"
        />
        <path
          fillRule="nonzero"
          fill="rgb(80.000001%,80.000001%,80.000001%)"
          fillOpacity="1"
          d="M 211.347656 46.617188 L 193.402344 28.675781 C 190.675781 25.945312 186.230469 25.945312 183.5 28.675781 L 175.054688 37.128906 L 202.894531 64.96875 L 211.347656 56.523438 C 214.078125 53.789062 214.078125 49.359375 211.347656 46.617188 "
        />
        <path
          fillRule="nonzero"
          fill={themeColor[theme].iconColor}
          fillOpacity="1"
          d="M 188.980469 78.882812 L 63.84375 204.023438 L 36 176.183594 L 161.136719 51.039062 Z M 188.980469 78.882812 "
        />
        <path
          fillRule="nonzero"
          fill="rgb(40.000001%,40.000001%,40.000001%)"
          fillOpacity="1"
          d="M 161.113281 51.042969 L 175.03125 37.117188 L 202.890625 64.957031 L 188.972656 78.882812 Z M 161.113281 51.042969 "
        />
        <path
          fillRule="nonzero"
          fill="rgb(40.000001%,40.000001%,40.000001%)"
          fillOpacity="1"
          d="M 35.988281 176.191406 L 26.625 213.398438 L 63.839844 204.027344 Z M 35.988281 176.191406 "
        />
        <path
          fillRule="nonzero"
          fill="rgba(255,255,255)"
          fillOpacity="1"
          d="M 31.371094 194.582031 L 26.625 213.398438 L 45.4375 208.652344 Z M 31.371094 194.582031 "
        />
      </g>
    </svg>
  );
}
export function GroupIcon({ width, height, color, theme }) {
  return (
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 244 228"
      width={width}
      height={height}
      className="GroupBar-icon"
    >
      <circle cx="54.69" cy="124.92" r="23" fill={themeColor[theme].iconColor} />
      <circle cx="153.26" cy="170.92" r="23" fill={themeColor[theme].iconColor} />
      <circle cx="153.26" cy="59.2" r="23" fill={themeColor[theme].iconColor} />
      <circle
        cx="76.04"
        cy="64.13"
        r="23"
        fill="none"
        stroke={themeColor[theme].iconColor}
        strokeMiterlimit="10"
        strokeWidth="7px"
      />
      <circle
        cx="187.76"
        cy="123.27"
        r="23"
        fill="none"
        stroke={themeColor[theme].iconColor}
        strokeMiterlimit="10"
        strokeWidth="7px"
      />
      <circle
        cx="85.9"
        cy="172.56"
        r="23"
        fill="none"
        stroke={themeColor[theme].iconColor}
        strokeMiterlimit="10"
        strokeWidth="7px"
      />
      <line
        x1="131.99"
        y1="95.3"
        x2="141.58"
        y2="79.02"
        fill="none"
        stroke={themeColor[theme].iconColor}
        strokeMiterlimit="10"
        strokeWidth="7px"
      />
      <line
        x1="91.15"
        y1="81.47"
        x2="105.3"
        y2="97.72"
        fill="none"
        stroke={themeColor[theme].iconColor}
        strokeMiterlimit="10"
        strokeWidth="7px"
      />
      <line
        x1="142.63"
        y1="117.75"
        x2="164.93"
        y2="120.48"
        fill="none"
        stroke={themeColor[theme].iconColor}
        strokeMiterlimit="10"
        strokeWidth="7px"
      />
      <line
        x1="141.59"
        y1="151.09"
        x2="131.99"
        y2="134.78"
        fill="none"
        stroke={themeColor[theme].iconColor}
        strokeMiterlimit="10"
        strokeWidth="7px"
      />
      <line
        x1="97.66"
        y1="118.47"
        x2="77.43"
        y2="121.5"
        fill="none"
        stroke={themeColor[theme].iconColor}
        strokeMiterlimit="10"
        strokeWidth="7px"
      />
      <circle cx="120.4" cy="115.06" r="23" fill={themeColor[theme].iconColor} />
      <line
        x1="97.4"
        y1="153.39"
        x2="108.57"
        y2="134.78"
        fill="none"
        stroke={themeColor[theme].iconColor}
        strokeMiterlimit="10"
        strokeWidth="7px"
      />
    </svg>
  );
}
export function NonGroupIcon({ width, height, color, onClick, theme }) {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 234 234"
      width={width}
      height={height}
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <circle cx="180.83" cy="102.87" r="26.72" fill={themeColor[theme].iconColor} />
      <circle cx="66.33" cy="49.44" r="26.72" fill={themeColor[theme].iconColor} />
      <circle cx="66.33" cy="179.21" r="26.72" fill={themeColor[theme].iconColor} />
      <line
        x1="91.03"
        y1="137.28"
        x2="79.89"
        y2="156.19"
        fill="none"
        stroke={themeColor[theme].iconColor}
        strokeMiterlimit="10"
        strokeWidth="7px"
      />
      <line
        x1="79.88"
        y1="72.47"
        x2="91.03"
        y2="91.42"
        fill="none"
        stroke={themeColor[theme].iconColor}
        strokeMiterlimit="10"
        strokeWidth="7px"
      />
      <line
        x1="130.92"
        y1="110.36"
        x2="154.42"
        y2="106.84"
        fill="none"
        stroke={themeColor[theme].iconColor}
        strokeMiterlimit="10"
        strokeWidth="7px"
      />
      <circle cx="104.5" cy="114.32" r="26.72" fill={themeColor[theme].iconColor} />
      <path
        d="M201,176.62a33.11,33.11,0,1,1-33.11-33.1A33.11,33.11,0,0,1,201,176.62Z"
        transform="translate(-8 -7)"
        fill="none"
        stroke="#ed1c24"
        strokeMiterlimit="10"
        strokeWidth="7px"
      />
      <line
        x1="137.98"
        y1="147.68"
        x2="183.28"
        y2="192.98"
        fill="none"
        stroke="#ed1c24"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7px"
      />
    </svg>
  );
}
