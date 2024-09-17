/* eslint-disable import/prefer-default-export */
import portfinder from "portfinder";

export async function findAvailablePort() {
  const port = portfinder.getPortPromise();
  return port;
}
