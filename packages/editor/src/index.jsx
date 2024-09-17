import { createRoot } from "react-dom/client";
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/index.js";
import "reactflow/dist/style.css";

import "@fortawesome/fontawesome-free/js/brands.js";
import "@fortawesome/fontawesome-free/js/solid.js";
import "@fortawesome/fontawesome-free";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-tabs/style/react-tabs.css";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ConfigProvider } from "antd";
import configureAppStore from "store/configureAppStore.js";
import ErrorFallback from "./components/Shared/ErrorFallback.jsx";
import App from "./app/App.jsx";

const store = configureAppStore();
export default store;

const persistor = persistStore(store);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => store.dispatch({ type: "RESET" })}
      >
        <ConfigProvider
          theme={{
            token: {
              // **  global styles
              colorBgContainer: "#262626",
              colorBorder: "#3a3a3a",
              colorText: "#c1c1c1",
              colorPrimary: "green", // color when input clicked
              // colorPrimaryActive: "#43b104", // color when input clicked
              colorTextPlaceholder: "#757474", // input placeholder
              colorPrimaryHover: "#43b104", // hover input
              colorBgElevated: "#262626", // extra panel background color
              colorIcon: "#c1c1c1", // icon colors of extra components
              controlOutline: "none", // outline colors of elements when clicked
            },
            components: {
              Collapse: {
                contentBg: "transparent",
                colorBorder: "#383838ce",
                headerPadding: "6px 8px",
                borderRadiusLG: "4px",
                colorTextHeading: "#c1c1c1",
              },
              Form: {
                labelColor: "#c1c1c1",
              },
              Input: {
                activeBorderColor: "#43b104",
              },
              InputNumber: {
                handleBg: "#9a9a9a",
              },
              Slider: {
                trackBg: "green",
                trackHoverBg: "#43b104",
                handleColor: "#43b104",
                handleActiveColor: "#2f7c03",
                railBg: "rgba(0, 0, 0, 0.1)",
                railHoverBg: "rgba(0, 0, 0, 0.3)",
              },
              Switch: {
                handleBg: "#43b104",
                colorPrimary: "rgb(0,0,0,0.25)",
                colorPrimaryHover: "#3a3a3a",
                colorText: "#43b104", // outline color when click
              },
              Select: {
                optionSelectedBg: "green", // selected option background color
                optionActiveBg: "#2e2e2e",
              },
              DatePicker: {
                cellHoverBg: "#3d3d3d",
                cellActiveWithRangeBg: "purple",
                controlItemBgActive: "green",
              },
              Checkbox: {
                controlInteractiveSize: 20, // default 16
              },
              Radio: {
                radioSize: 20, // default 16
                dotSize: 8, // default 8
              },
              Tabs: {
                colorBorderSecondary: "rgb(89, 89, 89)",
                lineWidth: 1,
                colorBgContainer: "rgb(64, 64, 64)",
                itemSelectedColor: "#c1c1c1",
                itemHoverColor: "#939393",
                borderRadiusLG: 5,
              },
            },
          }}
        >
          <App />
        </ConfigProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>,
);
// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate persistor={persistor}>
//       <BrowserRouter>
//         <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>store.dispatch({type:'RESET'})}>
//           <App />
//         </ErrorBoundary>
//       </BrowserRouter>
//     </PersistGate>
//   </Provider>,
//   rootElement
// );

// reportWebVitals(console.log);
