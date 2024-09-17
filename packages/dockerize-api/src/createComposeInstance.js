import DockerodeCompose from "dockerode-compose";
import Dockerode from "dockerode";

function createComposeInstance(folderName, projectName) {
  const docker = new Dockerode();
  const compose = new DockerodeCompose(
    docker,
    `./container/${folderName}/docker-compose.yml`,
    projectName,
  );
  return compose;
}

export default createComposeInstance;
