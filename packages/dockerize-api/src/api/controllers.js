import deleteDockerizing from "../downFlow.js";
import startDockerizing from "../upFlow.js";
import { findAvailablePort } from "../utils/networkUtils.js";

class Controller {
  async getFreePort(req, res) {
    const port = await findAvailablePort();
    console.log("free-port: ", port);
    res.json({
      port,
    });
  }

  async createContainer(req, res) {
    const { id } = req.params;
    console.log("id: ", id);
    try {
      console.log("*******************");
      const port = await findAvailablePort();
      const servicePort = await startDockerizing(id, port);
      res.send(`${id} created on port: ${servicePort}!`);
    } catch (error) {
      console.log("ERROR:", error.message);
      res.status(400).send(error.message);
    }
  }

  async deleteContainer(req, res) {
    const { id } = req.params;
    try {
      await deleteDockerizing(id);
      res.send(`${id} deleted!`);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new Controller();
