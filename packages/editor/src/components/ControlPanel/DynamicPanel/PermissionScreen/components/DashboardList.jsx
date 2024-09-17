import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CheckboxGroup from "components/Shared/SwitchInput/CheckboxGroup";
import Checkbox from "components/Shared/SwitchInput/Checkbox";
import { CollapsibleMenuItem } from "./CollapsibleMenu";

const propTypes = {
  project: PropTypes.object.required,
};
function DashboardList({ project }) {
  const [dashboards, setDashboards] = useState([]);
  return (
    <>
      {dashboards.length > 0 ? (
        <>
          <CollapsibleMenuItem>
            <CheckboxGroup label="All">
              <Checkbox name="processorCreate" />
            </CheckboxGroup>
          </CollapsibleMenuItem>
          {dashboards.map((dashboard) => (
            <CollapsibleMenuItem key={dashboard._id}>
              <CheckboxGroup label={dashboard.config.name}>
                <Checkbox name="processorCreate" />
              </CheckboxGroup>
            </CollapsibleMenuItem>
          ))}
        </>
      ) : (
        <div style={{ paddingLeft: "10px", fontSize: "1.3vmin" }}>No dashboard in this project</div>
      )}
    </>
  );
}

DashboardList.propTypes = propTypes;
export default DashboardList;
