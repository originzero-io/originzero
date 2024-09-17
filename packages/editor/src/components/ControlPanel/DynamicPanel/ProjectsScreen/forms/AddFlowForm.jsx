import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { setModal } from "store/reducers/componentSlice";
import useAuth from "utils/hooks/useAuth";
import useProject from "utils/hooks/useProject";
import useWorkspace from "utils/hooks/useWorkspace";
import dockerizeServiceHttp from "services/dockerizeService/dockerizeService.http";
import notificationHelper from "utils/ui/notificationHelper";
import flowServiceHttp from "services/entityManagerService/flowService/flowService.http";
import { createFlow } from "store/reducers/flow/flowSlice";
import { getMyPermissionInThisWorkspace } from "store/reducers/authPermissionSlice";
import { useEntityManagerSocket } from "context/EntityManagerSocketProvider";

export default function AddFlowForm() {
  const auth = useAuth();
  const { activeWorkspace } = useWorkspace();
  const { activeProject, projects } = useProject();
  const workspace = activeWorkspace._id;
  const project = activeProject?._id || projects[0];

  const [flowInfo, setFlowInfo] = useState({
    name: "Untitled",
    description: "Created for future",
    company: "Anaks ARGE Ltd.Şti.",
    createdBy: auth._id,
  });
  const dispatch = useDispatch();
  const { flowEvent } = useEntityManagerSocket();

  const onChangeHandler = (e) => {
    setFlowInfo({ ...flowInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    // const { port } = await dockerizeServiceHttp.getAvailablePort();
    // console.log("PORT:", port);
    // const flow = { config: flowInfo, workspace, project, port };
    // flowEvent.createFlow({ flow });

    // await dockerizeServiceHttp.dockerizeFlow(flowId)

    // dockerizeServiceHttp.getAvailablePort()
    // .then(({port})=>{
    //   const flow = { config: flowInfo, workspace, project, port };
    //   return flowServiceHttp.createFlow(flow)
    // })
    // .then((flow)=>{
    //   return dockerizeServiceHttp.dockerizeFlow(flow._id)
    // })
    // .catch(console.log)
    try {
      const { port } = await dockerizeServiceHttp.getAvailablePort();
      console.log("PORT:", port);
      const flow = { ...flowInfo, workspace, project, port };
      const createdFlow = await flowServiceHttp.createFlow(flow);
      await dockerizeServiceHttp.dockerizeFlow(createdFlow._id);
      dispatch(createFlow(createdFlow));
      dispatch(
        getMyPermissionInThisWorkspace({
          workspace: activeWorkspace,
          me: auth,
        }),
      );
      notificationHelper.success("Flow created successfully");
      dispatch(setModal(false));
    } catch (error) {
      console.log(error);
      notificationHelper.error(error.message);
    }
  };

  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Label>Flow Name</Label>
        <Input
          style={{ color: "green" }}
          name="name"
          placeholder="flow name"
          onChange={onChangeHandler}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Company</Label>
        <Input
          style={{ color: "green" }}
          defaultValue={flowInfo.company}
          name="company"
          placeholder="company"
          onChange={onChangeHandler}
        />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Input
          style={{ color: "green" }}
          type="textarea"
          name="description"
          defaultValue={flowInfo.description}
          placeholder="description"
          onChange={onChangeHandler}
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
