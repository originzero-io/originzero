import { Route, Switch } from "react-router-dom";
import { EntityManagerSocketProvider } from "context/EntityManagerSocketProvider.jsx";
import { FlowExecutorSocketProvider } from "context/FlowExecutorSocketProvider.jsx";
import { FlowDataProvider } from "context/FlowDataProvider.jsx";
import LoadingBar from "../components/Shared/LoadingBar/LoadingBar.jsx";
import Modal from "../components/Shared/Modal/Modal.jsx";
import ToastNotification from "../components/Shared/Notification/ToastNotification.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import ControlPanelPage from "../pages/ControlPanelPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import FlowPage from "../pages/FlowPage.jsx";
import NotFound from "../routes/NotFound.jsx";
import PrivateRoute from "../routes/PrivateRoute.jsx";
import AppWrapper from "./App.style.js";

const App = () => (
  <EntityManagerSocketProvider>
    <AppWrapper>
      <LoadingBar />
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <PrivateRoute path="/panel" component={ControlPanelPage} />
        <PrivateRoute exact path="/flow/:flowId/">
          <FlowExecutorSocketProvider>
            <FlowDataProvider>
              <FlowPage />
            </FlowDataProvider>
          </FlowExecutorSocketProvider>
        </PrivateRoute>
        <PrivateRoute exact path="/dashboard/:dashboardId" component={DashboardPage} />
        <Route path="*" component={NotFound} />
      </Switch>
      <ToastNotification />
      <Modal />
    </AppWrapper>
  </EntityManagerSocketProvider>
);

export default App;
