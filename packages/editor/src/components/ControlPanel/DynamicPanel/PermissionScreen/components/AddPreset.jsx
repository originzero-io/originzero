import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import PermissionService from "services/entityManagerService/permissionService/permissionService.http";
import notification from "utils/ui/notificationHelper";

const propTypes = {
  permissions: PropTypes.object.isRequired,
};
export default function AddPreset({ permissions }) {
  const dispatch = useDispatch();
  const [presetName, setPresetName] = useState("");
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const preset = {
      name: presetName,
      preset: permissions,
    };
    try {
      await PermissionService.createPreset(preset);
      notification.success(`Preferences has been saved as ${preset.name}`);
    } catch (error) {
      notification.error(error.message);
    }
  };
  const onChangeHandler = (e) => {
    setPresetName(e.target.value);
  };
  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Label>Assign name for this permission preferences</Label>
        <Input name="presetName" placeholder="name" onChange={onChangeHandler} />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

AddPreset.propTypes = propTypes;
