import fs from "fs";
import createComposeInstance from "./createComposeInstance.js";
import { composeDown } from "./downFlow.js";

const fsPromises = fs.promises;

async function composeUp(compose) {
  const state = await compose.up();
  console.log("Proje başarıyla oluşturuldu...", state);
}

async function createContainerFolder(folderName) {
  await fsPromises.mkdir(`./container/${folderName}`);
  console.log(`Klasör "${folderName}" başarıyla oluşturuldu.`);
}

async function createDockerComposeFile(folderName, servicePort) {
  const dockerComposeConfig = `
version: "3"
services:
    mongodb_service:
        image: mongo:latest
        restart: unless-stopped
        volumes:
          - executor_service-data:/data/db
    executor_service:
        image: flow_executor_service
        ports:
          - ${servicePort}:5003
        depends_on: 
          - mongodb_service
        restart: unless-stopped
        environment:
          NODE_ENV: production
volumes:
  executor_service-data:
`;

  await fsPromises.writeFile(
    `./container/${folderName}/docker-compose.yml`,
    dockerComposeConfig,
  );
  console.log("docker-compose.yml dosyası başarıyla oluşturuldu");
}

async function upDockerCompose(flowId) {
  console.log(flowId, "isimli proje yaratılıyor...");
  const projectName = flowId.toLowerCase();
  const compose = createComposeInstance(flowId, projectName);
  try {
    await composeUp(compose);
  } catch (error) {
    await composeDown(compose, flowId);
    console.log("docker-error: ", error.json);
    throw new Error(error.json.message);
  }
}

async function startDockerizing(flowId, servicePort) {
  console.log("flowId: ", flowId);
  console.log("servicePort: ", servicePort);
  try {
    await createContainerFolder(flowId);
    await createDockerComposeFile(flowId, servicePort);
    await upDockerCompose(flowId);
    return servicePort;
  } catch (error) {
    console.log("ERROR: ", error);
    throw new Error(error);
  }
}

export default startDockerizing;
