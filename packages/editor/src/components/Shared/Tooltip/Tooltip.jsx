import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import useActiveFlow from "utils/hooks/useActiveFlow";

const propTypes = {
  id: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  others: PropTypes.any,
};
export default function Tooltip({ id, place, ...others }) {
  const { flowGui } = useActiveFlow();
  return (
    <ReactTooltip
      id={id}
      place={place}
      type={flowGui.theme === "dark" ? "light" : "dark"}
      effect="solid"
      delayHide={30}
      delayShow={30}
      className="custom-tooltip"
      {...others}
    />
  );
}

Tooltip.propTypes = propTypes;
