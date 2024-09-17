import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input } from "reactstrap";
import PermissionService from "services/entityManagerService/permissionService/permissionService.http";
import { setModal } from "store/reducers/componentSlice";
import { loadUserPermission } from "store/reducers/userPermissionSlice";

export default function PresetList() {
  const [presets, setPresets] = useState([]);
  const [selectedPreset, setSelectedPreset] = useState([]);
  const dispatch = useDispatch();
  useEffect(async () => {
    async function fetch() {
      const presets = await PermissionService.getPresets();
      setPresets(presets);
    }
    fetch();
  }, []);
  const onSubmitHandle = () => {
    dispatch(loadUserPermission(selectedPreset));
    dispatch(setModal(false));
  };
  const handlePresetChange = (e) => {
    console.log("submitt", e.target.value);
    const selected = presets.find((preset) => preset.name === e.target.value).preset;
    setSelectedPreset(selected);
  };
  return (
    <>
      <Input type="select" onChange={handlePresetChange}>
        {presets.map((preset) => (
          <option key={preset._id}>{preset.name}</option>
        ))}
      </Input>
      <Button onClick={onSubmitHandle}>Submit</Button>
    </>
  );
}
