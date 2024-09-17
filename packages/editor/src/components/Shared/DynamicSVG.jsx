import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const testSvg =
  '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 8v4m0 0-2-2m2 2 2-2M3 5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5H3ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/></svg>';
export default function DynamicSVG({ svgContent, color, size }) {
  const modifiedSVG = svgContent
    .replace(/(fill|stroke)="(?:[^"]*[^none"])"/g, `$1="${color || "red"}"`)
    .replace(/<svg[^>]*\s(?:width|height)=["'][^"']*["'][^>]*>/, (match) =>
      match.replace(/(width|height)=["'][^"']*["']/g, `$1="${size || 24}"`),
    );

  const svgIcon = React.cloneElement(
    <RenderableSVG svgText={modifiedSVG} color={color} size={size} />,
  );
  // return <div dangerouslySetInnerHTML={{ __html: modifiedSVG }} />;
  return <div>{svgIcon}</div>;
}

DynamicSVG.propTypes = {
  svgContent: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

const RenderableSVG = ({ svgText, color, size }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.innerHTML = svgText;
    }
  }, [svgText]);

  return <svg ref={svgRef} stroke={color || "red"} width={size || 24} height={size || 24} />;
};
