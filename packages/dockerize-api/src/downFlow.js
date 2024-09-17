// ? https://github.com/apocas/dockerode-compose/blob/main/examples/down.jsimport

import createDockerComposeFile from "./createComposeInstance.js";
import { deleteFolder } from "./utils/fileUtils.js";

export async function composeDown(compose, flowId) {
  const state = await compose.down({ volumes: true });
  await deleteFolder(flowId);
  console.log("Proje başarıyla silindi... ", state);
}

async function downDockerCompose(flowId) {
  console.log(flowId, "isimli proje dockerdan siliniyor...");
  const projectName = flowId.toLowerCase();
  const compose = createDockerComposeFile(flowId, projectName);
  try {
    await composeDown(compose, flowId);
  } catch (error) {
    console.log("docker-error: ", error.json);
    throw new Error(error.json.message);
  }
}

async function deleteDockerizing(flowId) {
  await downDockerCompose(flowId);
}

export default deleteDockerizing;
